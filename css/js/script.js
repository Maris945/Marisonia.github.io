function logout(){
  localStorage.removeItem("loggedUser");
  window.location.href="login.html";
}

function checkLogin(){
  return localStorage.getItem("loggedUser")!==null;
}

function getLoggedUser(){
  return JSON.parse(localStorage.getItem("loggedUser") || "null");
}

function updateNavbar(){
  const navAuth = document.getElementById("nav-auth");
  if(!navAuth) return;
  navAuth.innerHTML="";
  if(checkLogin()){
    const user = getLoggedUser();
    navAuth.innerHTML = `
      <li class="nav-item"><span class="nav-link text-success">Ciao ${user.name}!</span></li>
      <li class="nav-item"><a href="#" class="nav-link text-danger" onclick="logout()">Logout</a></li>
    `;
  }
  document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.getElementById("btnLogin");

  btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    // Controlliamo se ci sono utenti registrati
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if(users.length === 0){
      alert("Devi prima registrarti!");
    } else {
      window.location.href = "login.html";
    }
  });
});
}
if (!localStorage.getItem("loggedUser")) {
  window.location.href = "index.html";
}
const firebaseConfig = {
  apiKey: "TUO_API_KEY",
  authDomain: "TUO_PROJECT_ID.firebaseapp.com",
  projectId: "TUO_PROJECT_ID",
  appId: "TUO_APP_ID"
};
// Reset password
document.getElementById("resetPasswordLink").addEventListener("click", function(e){
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  if(!email) {
    document.getElementById("resetError").innerText = "Inserisci prima la tua email";
    document.getElementById("resetMsg").innerText = "";
    return;
  }
  auth.sendPasswordResetEmail(email)
    .then(() => {
      document.getElementById("resetMsg").innerText = "Email di reset inviata!";
      document.getElementById("resetError").innerText = "";
    })
    .catch(err => {
      document.getElementById("resetError").innerText = err.message;
      document.getElementById("resetMsg").innerText = "";
    });
});
document.getElementById("logoutBtn").addEventListener("click", () => {
  auth.signOut().then(() => {
    // Pulisco i campi login e registrazione
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
  });
});