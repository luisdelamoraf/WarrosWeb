localStorage = window.localStorage;
let docPartido
let jugadores
// Crear Partido
let partidoTorneo = document.querySelector("#partidoTorneo");
let partidoEquipo = document.querySelector("#partidoEquipo");
let partidoRival = document.querySelector("#partidoRival");
let partidoFecha = document.querySelector("#partidoFecha");
// Crear Equipo
let crearEquipo = document.querySelector("#btn-crear-nuevo-equipo");
let nombreEquipo = document.querySelector("#nombre-nuevo-equipo");
// Editar Equipo
let editarEquipo = document.querySelector("#editarEquipo");
let editarNombre = document.querySelector("#editar-nombre-jugador");
let editarNumero = document.querySelector("#editar-numero-jugador");
let idJugador
// Añadir Torneo
let anadirTorneo = document.querySelector("#btn-anadir-torneo");
let nombreTorneo = document.querySelector("#nombre-nueva-torneo");


//Inicializar firebase/firestore
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

//Funciones
function refrescarEquipos(){
    $("#partidoEquipo").html(``)
    firestore.collection("equipos").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            $("#partidoEquipo").append(`<option value="${doc.id}">${doc.data().nombre}</option>`)
        });
    });
    $("#editarEquipo").html(``)
    firestore.collection("equipos").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            $("#editarEquipo").append(`<option value="${doc.id}">${doc.data().nombre}</option>`)
        });
    });  
}
refrescarEquipos()
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
function refrescarTorneos(){
    $("#partidoTorneo").html(``)
    firestore.collection("torneos").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            $("#partidoTorneo").append(`<option value="${doc.id}">${doc.data().nombre}</option>`)
        });
    });
    
}
refrescarTorneos()
// ./Funciones


$("#btn-nuevo-partido").click(function(){
    let idPartido = partidoTorneo.value.split("_")[0] +"_"+ partidoFecha.value +"_"+ Date.now()
    docPartido = firestore.doc(`torneos/${partidoTorneo.value}/partidos/${idPartido}`)
    localStorage.setItem("Torneo", partidoTorneo.value)
    localStorage.setItem("ID", idPartido)
    docPartido.set({
        Equipo: partidoEquipo.value, 
        Rival: partidoRival.value, 
        Fecha: partidoFecha.value,
        Score: {Final:0, Q1:0, Q2:0, Q3:0, Q4:0},
        ScoreRival:{Final:0, Q1:0, Q2:0, Q3:0, Q4:0}
    }).then(function(){
        idPartido++
        $('#modal-nuevo-partido').modal('hide');
        $('#modal-seleccion-jugadores').modal('show');
        let equipo = firestore.collection("equipos").doc(`${partidoEquipo.value}`).collection("jugadores")
        equipo.get().then(function(docs) {
            docs.forEach(function(doc){
                    $("#equipo-seleccionado").append(`
                    <div>
                        <input class="form-check-input big-checkbox" type="checkbox" id="${doc.id}" value="${doc.id}">
                        <label class="form-check-label" for="${doc.id}">
                            &nbsp;&nbsp;&nbsp;&nbsp;${doc.data().numero} &nbsp;&nbsp;&nbsp;&nbsp; ${doc.data().nombre}
                        </label>
                    </div>
                    <hr>
                    `)
            })
        });
    }).catch(function(error){
        console.log("Error: ", error);
    })
})

$("#go-to-match").click(function(){
    if( $('input:checkbox:checked').length > 15){
        alert("Solo se pueden seleccionar 15 jugadores como máximo")
    }else{
        $("input[type=checkbox]").each(function(){
            if(this.checked){
                    docPartido.collection("jugadores").doc(this.value).set({
                        "Q1":{
                            "twoM":0,"twoA":0,"thrM":0,"thrA":0,"ftM":0,"ftA":0,"rDf":0,"rOf":0,"As":0,"St":0,"Bl":0,"Fo":0,"TO":0
                        },
                        "Q2":{
                            "twoM":0,"twoA":0,"thrM":0,"thrA":0,"ftM":0,"ftA":0,"rDf":0,"rOf":0,"As":0,"St":0,"Bl":0,"Fo":0,"TO":0
                        },
                        "Q3":{
                            "twoM":0,"twoA":0,"thrM":0,"thrA":0,"ftM":0,"ftA":0,"rDf":0,"rOf":0,"As":0,"St":0,"Bl":0,"Fo":0,"TO":0
                        },
                        "Q4":{
                            "twoM":0,"twoA":0,"thrM":0,"thrA":0,"ftM":0,"ftA":0,"rDf":0,"rOf":0,"As":0,"St":0,"Bl":0,"Fo":0,"TO":0
                        }
                    })
            }
        })  
        
        window.location.replace("https://warrosweb.web.app/statstracker.html");
    }
})

$("#btn-ver-partidos").click(function(){
    window.location.replace("https://warrosweb.web.app/lista-partidos.html");
})

$("#btn-crear-nuevo-equipo").click(function(){
    if(nombreEquipo.value){
        var equipo = firestore.collection("equipos").doc(nombreEquipo.value+"_"+Date.now());
        equipo.set({
            nombre: nombreEquipo.value 
        }).then(function() {
            refrescarEquipos()
            alert("Equipo creado correctamente");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }else{
        alert("Nombre de equipo vacio")
    }
})

$("#btn-editar-equipo").click(function(){
    cargarEquipoEditar()
});

$("#editarEquipo").change(function(){
    cargarEquipoEditar()
})

$("#btn-agregar-jugador").click(function(){
    if(editarNombre.value && editarNumero.value){
        let equipo = firestore.collection("equipos").doc(`${editarEquipo.value}`).collection("jugadores")
        equipo.doc(editarEquipo.value.split("_")[0]+"_"+editarNumero.value+"_"+Date.now()).set({
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

$("#btn-anadir-torneo").click(function(){
    if(nombreTorneo.value){
        var torneo = firestore.collection("torneos").doc(nombreTorneo.value+"_"+Date.now());
        torneo.set({
            nombre: nombreTorneo.value 
        }).then(function() {
            refrescarTorneos()
            alert("Torneo creado correctamente");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }else{
        alert("Nombre del torneo vacio")
    }
});
