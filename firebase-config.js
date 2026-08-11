// Configuración de Firebase para la maqueta BID.
// 1) Crea un proyecto en Firebase.
// 2) Crea una Web App.
// 3) Activa Realtime Database.
// 4) Pega aquí el objeto firebaseConfig que entrega Firebase.
//
// Importante: estos datos de configuración web son públicos por diseño.
// La seguridad real se controla con las reglas de Realtime Database.

window.BID_FIREBASE = {
  apiKey: "AIzaSyAd32fjHVssRxIzHijkeWd37MamHWzCajM",
  authDomain: "f1-sap.firebaseapp.com",
  databaseURL: "https://f1-sap-default-rtdb.firebaseio.com",
  projectId: "f1-sap",
  storageBucket: "f1-sap.appspot.com",
  messagingSenderId: "1043864334257",
  appId: "1:1043864334257:web:bcc854d01f1c12fa415790",

  // Usa el mismo sessionId en mesa y tablet para sincronizarlas.
  // Puedes cambiarlo para tener otra instalación independiente.
  sessionId: "maqueta-1-bid-pruebas",
};
