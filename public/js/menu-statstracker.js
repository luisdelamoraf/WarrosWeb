localStorage = window.localStorage;
let partidoLiga = document.querySelector("#partidoLiga");
let partidoEquipo = document.querySelector("#partidoEquipo");
let partidoRival = document.querySelector("#partidoRival");
let partidoFecha = document.querySelector("#partidoFecha");
let docPartido
let equipo
let jugadores

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




  $("#btn-nuevo-partido").click(function(){
    let idPartido = partidoLiga.value +"_"+ partidoFecha.value +"_"+ Date.now()
    docPartido = firestore.doc(`ligas/all/${partidoLiga.value}/${idPartido}`)
    localStorage.setItem("Liga", partidoLiga.value)
    localStorage.setItem("ID", idPartido)
    docPartido.set({
        Equipo: partidoEquipo.value, 
        Rival: partidoRival.value, 
        Fecha: partidoFecha.value,
    }).then(function(){
        console.log("Partido creado: "+ idPartido);
        idPartido++
        $('#modal-nuevo-partido').modal('hide');
        $('#modal-seleccion-jugadores').modal('show');
        equipo = firestore.collection("equipos").doc(`${partidoEquipo.value}`).collection("jugadores")
        equipo.get().then(function(docs) {
            docs.forEach(function(doc){
                    $("#equipo-seleccionado").append(`<label><input type="checkbox" id="${doc.id}" value="${doc.id}"> ${doc.data().nombre} ${doc.data().numero}</label><hr>`)
            })
        });
    }).catch(function(error){
        console.log("Error: ", error);
    })
})

$("#go-to-match").click(function(){
    $("input[type=checkbox]").each(function(){
        if(this.checked){
            console.log(this.value);
                docPartido.collection("jugadores").doc(this.value).set({
                    "Q1":{
                        "fgM":0,"fgA":0,"thrM":0,"thrA":0,"ftM":0,"ftA":0,"rDf":0,"rOf":0,"As":0,"St":0,"Bl":0,"Fo":0,"TO":0
                    },
                    "Q2":{
                        "fgM":0,"fgA":0,"thrM":0,"thrA":0,"ftM":0,"ftA":0,"rDf":0,"rOf":0,"As":0,"St":0,"Bl":0,"Fo":0,"TO":0
                    },
                    "Q3":{
                        "fgM":0,"fgA":0,"thrM":0,"thrA":0,"ftM":0,"ftA":0,"rDf":0,"rOf":0,"As":0,"St":0,"Bl":0,"Fo":0,"TO":0
                    },
                    "Q4":{
                        "fgM":0,"fgA":0,"thrM":0,"thrA":0,"ftM":0,"ftA":0,"rDf":0,"rOf":0,"As":0,"St":0,"Bl":0,"Fo":0,"TO":0
                    }
                })
        }
    })
    window.location.replace("https://warrosweb.web.app/statstracker.html");
})

