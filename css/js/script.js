// FIREBASE CONFIG (aggiorna con la tua config reale)
const firebaseConfig = {
  apiKey: "AIzaSyBGgjzIMmW1YxBXTeatlf9gMHzADvER_8A",
  authDomain: "jobby-f704a.firebaseapp.com",
  projectId: "jobby-f704a",
  storageBucket: "jobby-f704a.appspot.com",
  messagingSenderId: "320047348",
  appId: "1:320047348:web:f4fab4bb3fa8b865b9f6a1",
  measurementId: "G-ZV8WTDJL5F"
};

// Inizializza Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ELEMENTI FORM
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// LOGIN
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const stayLoggedIn = document.getElementById("stayLoggedIn").checked;

  auth.setPersistence(
    stayLoggedIn ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION
  ).then(() => {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = "home.html"; // vai a Home dopo login
      })
      .catch((err) => alert("Errore login: " + err.message));
  });
});

// REGISTRAZIONE
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("registerName").value;
  const surname = document.getElementById("registerSurname").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // salva nome e cognome nel profilo
      return userCredential.user.updateProfile({ displayName: name + " " + surname });
    })
    .then(() => {
      alert("Registrazione completata! Ora puoi fare login.");
      registerForm.reset();
    })
    .catch((err) => alert("Errore registrazione: " + err.message));
});
const logoutBtn = document.getElementById("logoutBtn");
const annunciContainer = document.getElementById("annunci");

// LOGOUT
logoutBtn.addEventListener("click", () => {
  firebase.auth().signOut().then(() => {
    window.location.href = "index.html"; // ritorna a login/registrazione
  });
});

// Esempio: aggiunta annunci dinamici
const annunci = [
  { titolo: "Sviluppatore Frontend", descrizione: "Cerchiamo un frontend developer con esperienza in HTML, CSS e JS." },
  { titolo: "Project Manager", descrizione: "Cerchiamo un PM con esperienza nella gestione di progetti IT." },
  { titolo: "Designer", descrizione: "Designer grafico per progetti web e app." }
];

function mostraAnnunci() {
  annunciContainer.innerHTML = ""; // pulisce prima
  annunci.forEach(a => {
    const card = document.createElement("div");
    card.className = "card mb-3";
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${a.titolo}</h5>
        <p class="card-text">${a.descrizione}</p>
      </div>
    `;
    annunciContainer.appendChild(card);
  });
}

// Mostra annunci quando apri Home
mostraAnnunci();