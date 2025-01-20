const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(tab => tab.classList.remove('tab-active'));
        contents.forEach(content => content.classList.remove('active'));

        tab.classList.add('tab-active');
        const targetContent = document.querySelector(`.content-${tab.classList[1].split('-')[1]}`);
        targetContent.classList.add('active');
    });
});

const darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '<img src="lightmode.png" alt="Light Mode" class="darkmode-image">';
    } else {
        darkModeToggle.innerHTML = '<img src="darkmode.png" alt="Dark Mode" class="darkmode-image">';
    }
});

document.getElementById('addcardform').addEventListener('submit', function (event) {
    event.preventDefault();

    const pokemonname = document.getElementById('pokemonname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const formvalider = document.getElementById('form-valider');
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => (msg.style.display = 'none'));
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.classList.remove('error'));

    let isValid = true;

    function showError(input, message) {
        const errorMessage = input.nextElementSibling;
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        input.classList.add('error');
    }

    if (pokemonname.value.length < 3) {
        showError(pokemonname, 'Aucun Pokémon ne possède un nom de moins de 3 lettres.');
        isValid = false;
    }

    if (!email.value.includes('@') || email.value.length < 5) {
        showError(email, 'Veuillez entrer une adresse email valide.');
        isValid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).{8,}$/;
    if (!passwordRegex.test(password.value)) {
        showError(
            password,
            'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.'
        );
        isValid = false;
    }

    if (confirmPassword.value !== password.value) {
        showError(confirmPassword, 'Les mots de passe ne correspondent pas.');
        isValid = false;
    }

    if (isValid) {
        formvalider.style.color = 'green';
        formvalider.textContent = 'Carte ajoutée !';
    } else {
        formvalider.style.color = 'red';
        formvalider.textContent = 'Veuillez corriger les erreurs ci-dessus.';
    }
});
