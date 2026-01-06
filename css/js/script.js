document.addEventListener("DOMContentLoaded", () => {
    console.log("JS collegato correttamente");

    // Scroll smooth per la navbar
    const links = document.querySelectorAll('a.nav-link');
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Hover sulle card
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const accept = document.getElementById("accept").checked;
      const errorMsg = document.getElementById("errorMsg");

      if (!accept) {
        errorMsg.textContent = "Devi accettare i termini";
        return;
      }

      // 👤 UTENTI SIMULATI
      if (email === "admin@test.com" && password === "admin123") {
        localStorage.setItem("logged", "true");
        localStorage.setItem("role", "admin");
        window.location.href = "index.html";
      } 
      else if (email === "user@test.com" && password === "user123") {
        localStorage.setItem("logged", "true");
        localStorage.setItem("role", "user");
        window.location.href = "index.html";
      } 
      else {
        errorMsg.textContent = "Credenziali errate";
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    document.querySelectorAll(".admin-only").forEach(el => {
      el.style.display = "none";
    });
  }
});
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}