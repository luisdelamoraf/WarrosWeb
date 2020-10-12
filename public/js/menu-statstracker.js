localStorage = window.localStorage;
let docPartido
let jugadores
// Crear Partido
let partidoLiga = document.querySelector("#partidoLiga");
let partidoEquipo = document.querySelector("#partidoEquipo");
let partidoRival = document.querySelector("#partidoRival");
let partidoFecha = document.querySelector("#partidoFecha");
// Editar equipo
let editarEquipo = document.querySelector("#editarEquipo");
let editarNombre = document.querySelector("#editar-nombre-jugador");
let editarNumero = document.querySelector("#editar-numero-jugador");
let idJugador

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


// Funciones
function limpiarJugadores(){
    $("#jugadores-activos").html(``)
}
function cargarEquipoEditar(){
    limpiarJugadores()
    let equipo = firestore.collection("equipos").doc(`${editarEquipo.value}`).collection("jugadores")
    equipo.get().then(function(docs) {
        docs.forEach(function(doc){
            $("#jugadores-activos").append(`
                <button type="button" onclick="EliminarJugador('${doc.id}')" class="btn btn-danger btn-sm btn-eliminar-jugador"> <i class="fa fa-trash" aria-hidden="true"></i></button>
                <button type="button" onclick="EditarJugador('${doc.id}')" class="btn btn-secondary btn-sm btn-editar-jugador"> <i class="fa fa-pencil" aria-hidden="true"></i></button> ${doc.data().nombre} ${doc.data().numero} <hr>
            `)
        })
    }).catch(function(error){
        console.log("Error: ", error);
    });
}
function EliminarJugador(id){
    let equipo = firestore.collection("equipos").doc(`${editarEquipo.value}`).collection("jugadores")
    equipo.doc(id).delete().then(function() {
        alert("Jugador eliminado");
        cargarEquipoEditar()
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}
function EditarJugador(id){
    idJugador = id
    let equipo = firestore.collection("equipos").doc(`${editarEquipo.value}`).collection("jugadores")
    equipo.doc(id).get().then(function(doc) {
            $("#editar-nombre-jugador").val(doc.data().nombre)
            $("#editar-numero-jugador").val(doc.data().numero)
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    $("#regresar-agregar").show()
    $("#btn-editar-jugador").show()
    $("#btn-agregar-jugador").hide()
}
function regresarAgregar(){
    $("#regresar-agregar").hide()
    $("#btn-editar-jugador").hide()
    $("#btn-agregar-jugador").show()
    $("#editar-nombre-jugador").val("")
    $("#editar-numero-jugador").val("")
}

// ./Funciones


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
        idPartido++
        $('#modal-nuevo-partido').modal('hide');
        $('#modal-seleccion-jugadores').modal('show');
        let equipo = firestore.collection("equipos").doc(`${partidoEquipo.value}`).collection("jugadores")
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

$("#btn-editar-equipo").click(function(){
    cargarEquipoEditar()
});

$("#btn-agregar-jugador").click(function(){
    if(editarNombre.value && editarNumero.value){
        let equipo = firestore.collection("equipos").doc(`${editarEquipo.value}`).collection("jugadores")
        equipo.doc(editarEquipo.value+"_"+editarNumero.value+"_"+Date.now()).set({
            nombre: editarNombre.value,
            numero: editarNumero.value
        }).then(function() {
            alert("Jugador añadido al equipo");
            cargarEquipoEditar()
            $("#editar-nombre-jugador").val("")
            $("#editar-numero-jugador").val("")
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    } else{
        alert("Datos de jugador incompletos");
    }
})

$("#btn-editar-jugador").click(function(){
    if(editarNombre.value && editarNumero.value){ 
        let equipo = firestore.collection("equipos").doc(`${editarEquipo.value}`).collection("jugadores") 
        equipo.doc(idJugador).update({
            nombre: editarNombre.value,
            numero: editarNumero.value
        }).then(function() {
            alert("Jugador actualizado");
            regresarAgregar()
            cargarEquipoEditar()
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    } else {
        alert("Datos de jugador incompletos");
    }
})

$("#regresar-agregar").click(function(){
    regresarAgregar()
})

