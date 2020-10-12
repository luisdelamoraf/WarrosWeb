// Inicializar firebase/firestore
const firebaseConfig = {
    apiKey: "AIzaSyBjocp24M1HVFlS43U1UlpcydpqqKfldN4",
    authDomain: "warrosweb.firebaseapp.com",
    databaseURL: "https://warrosweb.firebaseio.com",
    projectId: "warrosweb",
    storageBucket: "warrosweb.appspot.com",
    messagingSenderId: "12491717497",
    appId: "1:12491717497:web:5c3ea7168e1da80e684da8",
    measurementId: "G-1N2WZD9LP0"
};
firebase.initializeApp(firebaseConfig)
var firestore = firebase.firestore()
// ./Inicializar firebase/firestore

localStorage = window.localStorage;
let matchData = firestore.doc(`ligas/${localStorage.getItem("Liga")}/partidos/${localStorage.getItem("ID")}`)


matchData.collection("jugadores").get().then(function(querySnapshot) {
    console.log(querySnapshot);
    querySnapshot.forEach(function(doc) {
        $("#tabla-estadisticas").append(`
        <tr class="fila-estadistica">
            <td>No.</td>
            <td>Jugador</td>
            <td>${doc.data().Q1.fgM}</td>
            <td>${doc.data().Q1.fgA}</td>
            <td>${doc.data().Q1.thrM}</td>
            <td>${doc.data().Q1.thrA}</td>
            <td>${doc.data().Q1.ftM}</td>
            <td>${doc.data().Q1.ftA}</td>
            <td>${doc.data().Q1.rDf}</td>
            <td>${doc.data().Q1.rOf}</td>
            <td>${doc.data().Q1.As}</td>
            <td>${doc.data().Q1.St}</td>
            <td>${doc.data().Q1.Bl}</td>
            <td>${doc.data().Q1.TO}</td>
            <td>${doc.data().Q1.Fo}</td>
        </tr>
        `)
    });
});