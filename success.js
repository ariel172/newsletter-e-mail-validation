document.addEventListener("DOMContentLoaded", function() {
    const emailDisplay = document.querySelector(".containerSuccess__email");
    const dismissButton = document.getElementById("containerSuccess__button");
    const userEmail = localStorage.getItem("userEmail");

    // Afficher l'email stocké s'il existe
    if (emailDisplay && userEmail) {
        emailDisplay.textContent = userEmail;
    }

    // Gestion du bouton "Dismiss message"
    if (dismissButton) {
        dismissButton.addEventListener("click", function() {
            localStorage.removeItem("userEmail"); // Supprime l'email stocké
            window.location.href = "index.html"; // Redirige vers la page d'accueil
        });
    }
});
