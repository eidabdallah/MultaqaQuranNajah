function register() {
    try {
        const NameInput = document.querySelector('#floatingName');
        const passwordInput = document.querySelector('#floatingPassword');
        const emailInput = document.querySelector('#floatingInput');
        const PhoneInput = document.querySelector('#floatingPhone');
        const floatingGender = document.querySelector('#floatingGender');
        const floatingCollege = document.querySelector('#floatingCollege');
        const floatingSpecialization = document.querySelector('#floatingSpecialization');
        const floatingPlan = document.querySelector('#floatingPlan');
        const submitButton = document.querySelector('.RegisterForm .btn');

        submitButton.disabled = true;
        addInputEventListener(NameInput, emailInput, passwordInput, PhoneInput, floatingGender, floatingCollege, floatingSpecialization, floatingPlan, submitButton);
        submitButton.onclick = function (e) {
            e.preventDefault();
            handleSubmit(passwordInput);
        };
    } catch (error) {
        handleError(error);
    }
}

function addInputEventListener(NameInput, emailInput, passwordInput, PhoneInput, floatingGender, floatingCollege, floatingSpecialization, floatingPlan, submitButton) {
    NameInput.addEventListener('input', () => toggleButton(emailInput, passwordInput, NameInput, PhoneInput, floatingGender, floatingCollege, floatingSpecialization, floatingPlan, submitButton));
    passwordInput.addEventListener('input', () => toggleButton(emailInput, passwordInput, NameInput, PhoneInput, floatingGender, floatingCollege, floatingSpecialization, floatingPlan, submitButton));
    emailInput.addEventListener('input', () => toggleButton(emailInput, passwordInput, NameInput, PhoneInput, floatingGender, floatingCollege, floatingSpecialization, floatingPlan, submitButton));
    PhoneInput.addEventListener('input', () => toggleButton(emailInput, passwordInput, NameInput, PhoneInput, floatingGender, floatingCollege, floatingSpecialization, floatingPlan, submitButton));
    floatingGender.addEventListener('input', () => toggleButton(emailInput, passwordInput, NameInput, PhoneInput, floatingGender, floatingCollege, floatingSpecialization, floatingPlan, submitButton));
    floatingCollege.addEventListener('input', () => toggleButton(emailInput, passwordInput, NameInput, PhoneInput, floatingGender, floatingCollege, floatingSpecialization, floatingPlan, submitButton));
    floatingSpecialization.addEventListener('input', () => toggleButton(emailInput, passwordInput, NameInput, PhoneInput, floatingGender, floatingCollege, floatingSpecialization, floatingPlan, submitButton));
    floatingPlan.addEventListener('input', () => toggleButton(emailInput, passwordInput, NameInput, PhoneInput, floatingGender, floatingCollege, floatingSpecialization, floatingPlan, submitButton));
}

function handleSubmit(passwordInput) {
    if (passwordInput.value.length <= 9) {
        Swal.fire({
            icon: 'warning',
            title: 'تحذير',
            text: 'كلمة المرور يجب أن تكون على الأقل 10 حروف.',
        });
        return;
    }
    Swal.fire({
        icon: 'success',
        title: 'تم التسجيل بنجاح!',
        text: 'تم التسجيل بنجاح. يمكنك الآن تسجيل الدخول.',
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

function toggleButton(emailInput, passwordInput, NameInput, PhoneInput, floatingGender, floatingCollege, floatingSpecialization, floatingPlan, submitButton) {
    if (
        emailInput.value.trim() === '' ||
        passwordInput.value.trim() === '' ||
        NameInput.value.trim() === '' ||
        floatingGender.value.trim() === '' ||
        floatingCollege.value.trim() === '' ||
        floatingSpecialization.value.trim() === '' ||
        floatingPlan.value.trim() === '' ||
        PhoneInput.value.trim() === ''
    ) {
        submitButton.disabled = true;
    } else {
        submitButton.disabled = false;
    }
}

register();
