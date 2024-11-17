async function login() {
    try {
        const loginForm = document.querySelector('.loginForm');
        const passwordInput = document.querySelector('#floatingPassword');
        const emailInput = document.querySelector('#floatingInput');
        const submitButton = document.querySelector('.loginForm .btn');

        submitButton.disabled = true;
        addInputEventListener(emailInput , passwordInput , submitButton);

        const {data} = await axios.get("assets/login/data/loginData.json");
        const usersData = data.login;

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
        window.location.href = "../../../admin.html";
    } else if (user.role === "student") {
        window.location.href = "../../../student.html";
    } else if (user.role === "collegeAdmin") {
        window.location.href = "../../../collegeAdmin.html";
    } else if (user.role === "supervisor") {
        window.location.href = "../../../supervisor.html";
    } else if (user.role === "doctor") {
        window.location.href = "../../../doctor.html";
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
