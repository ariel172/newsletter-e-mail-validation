document.addEventListener("DOMContentLoaded", () => {
    // Sélection des éléments du DOM
    const form = document.getElementById("form");
    const emailInput = document.getElementById("email");
    const emailError = document.querySelector(".emailValid");
    const dismissButton = document.getElementById("containerSuccess__button");

    // Fonction de validation de l'email
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Gestion de la soumission du formulaire
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Empêche le rechargement de la page
            
            const emailValue = emailInput.value.trim(); // Récupère l'email
            
            if (!emailValue || !isValidEmail(emailValue)) {
                showError("Valid email required");
            } else {
                // Stocker l'email et rediriger vers success.html
                localStorage.setItem("userEmail", emailValue);
                window.location.href = `success.html?email=${encodeURIComponent(emailValue)}`;
            }
        });
    }

    // Gestion de l'affichage de l'email sur la page success.html
    if (window.location.pathname.includes("success.html")) {
        const emailDisplay = document.querySelector(".containerSuccess__email");
        const params = new URLSearchParams(window.location.search);
        const storedEmail = localStorage.getItem("userEmail") || params.get("email");

        if (emailDisplay && storedEmail) {
            emailDisplay.textContent = storedEmail;
        } else {
            emailDisplay.textContent = "Email non disponible";
        }
    }

    // Gestion du bouton "Dismiss message"
    if (dismissButton) {
        dismissButton.addEventListener("click", () => {
            localStorage.removeItem("userEmail"); // Supprime l'email stocké
            window.location.href = "index.html"; // Retour à la page principale
        });
    }

    // Gestion de l'affichage des erreurs
    const showError = (message) => {
        emailError.innerText = message;
        emailError.style.display = "inline";
        emailInput.classList.add("input-error");
    };

    // Suppression de l'erreur quand l'utilisateur commence à taper
    if (emailInput) {
        emailInput.addEventListener("input", () => {
            emailInput.classList.remove("input-error");
            emailError.style.display = "none";
        });
    }
});
