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