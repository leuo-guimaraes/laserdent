// Configuração centralizada do Firebase para a clínica LASERdent
const firebaseConfig = {
    apiKey: "AIzaSyCl2_erylqp-EPie5_GRm7c6Lcy-6360F0",
    authDomain: "laserdent-b6af0.firebaseapp.com",
    projectId: "laserdent-b6af0",
    storageBucket: "laserdent-b6af0.firebasestorage.app",
    messagingSenderId: "436907039033",
    appId: "1:436907039033:web:a90658152608129b6cf0e8"
};

// Inicializa o Firebase (no modo compat, sem módulos, ideal para hospedagem estática direta)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Inicializa o banco de dados do Firestore
const db = firebase.firestore();
