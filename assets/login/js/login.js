async function login() {
    try {
        const loginForm = document.querySelector('.loginForm');
        const passwordInput = document.querySelector('#floatingPassword');
        const emailInput = document.querySelector('#floatingInput');
        const submitButton = document.querySelector('.loginForm .btn');

        submitButton.disabled = true;
        addInputEventListener(emailInput , passwordInput , submitButton);

        const {data} = await axios.get(`https://67326f262a1b1a4ae10ff12e.mockapi.io/multaqa/users`);
        const usersData = data;

        loginForm.onsubmit = async function (e) {
            e.preventDefault();
            const user = await validateUser(emailInput.value, passwordInput.value, usersData);
            if (user) {
                redirectToPage(user);
            } else {
                showErrorMessage();
            }
        };
    } catch (error) {
        handleError(error);
    }
}
function addInputEventListener(emailInput, passwordInput, submitButton) {
    passwordInput.addEventListener('input', () => toggleButton(emailInput, passwordInput, submitButton));
    emailInput.addEventListener('input', () => toggleButton(emailInput, passwordInput, submitButton));
}
function toggleButton(emailInput, passwordInput, submitButton) {
    if (emailInput.value.trim() === '' || passwordInput.value.trim() === '') {
        submitButton.disabled = true;
    } else {
        submitButton.disabled = false;
    }
}

function validateUser(email, password, usersData) {
    for (let i = 0; i < usersData.length; i++) {
        if (usersData[i].email === email && usersData[i].password === password) {
            return usersData[i]; 
        }
    }
    return null; 
}

function redirectToPage(user) {
    if (user.role === "admin") {
        window.location.href = "../../../admin/admin.html";
    } else if (user.role === "student") {
        window.location.href = "../../../student/student.html";
    } else if (user.role === "collegeAdmin") {
        window.location.href = "../../../collegeAdmin/collegeAdmin.html";
    } else if (user.role === "supervisor") {
        window.location.href = "../../../supervisor/supervisor.html";
    } else if (user.role === "doctor") {
        window.location.href = "../../../doctor/doctor.html";
    }
}

function showErrorMessage() {
    Swal.fire({
        icon: 'error',
        title: 'خطأ في تسجيل الدخول',
        text: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
        confirmButtonText: 'حاول مرة أخرى',
        confirmButtonColor: '#3085d6',
        timer: 5000
    });
}
function handleError(error) {
    console.error(error);
    Swal.fire({
        icon: 'error',
        title: 'خطأ في التسجيل',
        text: 'حدث خطأ ما. الرجاء المحاولة مرة أخرى.',
        confirmButtonText: 'حاول مرة أخرى',
        confirmButtonColor: '#3085d6',
    });
}

login();