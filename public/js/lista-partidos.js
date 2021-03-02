localStorage = window.localStorage;
let torneo = document.querySelector("#selector-torneo");
let equipo = document.querySelector("#selector-equipo");
let currentTorneo
let currentPartido


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

function filtrar(){
    if(torneo.value == "Todos" && equipo.value == "Todos"){
        firestore.collection("torneos").get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                firestore.collection("torneos").doc(doc.id).collection("partidos").get().then(function(querySnapshot){
                    querySnapshot.forEach(function(partido){
                        let result
                        if(partido.data().Score["Final"] > partido.data().ScoreRival["Final"]){
                            result = "w"
                        } else{
                            if(partido.data().Score["Final"] < partido.data().ScoreRival["Final"]){
                                result = "l"
                            }else{
                                result = "d"
                            }
                        }
                        $("#tabla-partidos").append(`
                            <tr>
                                <td>${partido.data().Equipo.split("_")[0]}</td>
                                <td class="vs-cell">vs</td>
                                <td>${partido.data().Rival}</td>
                                <td>${partido.data().Score["Final"]} - ${partido.data().ScoreRival["Final"]}</td>
                                <td>${partido.data().Fecha}</td>
                                <td>
                                    <div>
                                        <button type="button" data-toggle="modal" data-target="#modal-eliminar-partido" onclick="datosPartido('${doc.id}','${partido.id}')" class="btn btn-danger btn-sm btn-eliminar-jugador"> <i class="fa fa-trash" aria-hidden="true"></i></button>
                                        <button type="button" onclick="EditarPartido('${doc.id}','${partido.id}')" class="btn btn-secondary btn-sm btn-editar-jugador"> <i class="fa fa-pencil" aria-hidden="true"></i></button>
                                    </div>
                                </td>
                                <td class="align-center">
                                    <div class="result ${result}">
                                        ${result}
                                    </div>
                                </td>
                            </tr>
                        `)
                    })
                })
            })
        })
    } else {
        if(torneo.value == "Todos" && equipo.value != "Todos"){
            firestore.collection("torneos").get().then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                    firestore.collection("torneos").doc(doc.id).collection("partidos").where("Equipo", "==", equipo.value).get().then(function(querySnapshot){
                        querySnapshot.forEach(function(partido){
                            let result
                            if(partido.data().Score["Final"] > partido.data().ScoreRival["Final"]){
                                result = "w"
                            } else{
                                if(partido.data().Score["Final"] < partido.data().ScoreRival["Final"]){
                                    result = "l"
                                }else{
                                    result = "d"
                                }
                            }
                            $("#tabla-partidos").append(`
                                <tr>
                                    <td>${partido.data().Equipo.split("_")[0]}</td>
                                    <td class="vs-cell">vs</td>
                                    <td>${partido.data().Rival}</td>
                                    <td>${partido.data().Score["Final"]} - ${partido.data().ScoreRival["Final"]}</td>
                                    <td>${partido.data().Fecha}</td>
                                    <td>
                                        <div>
                                            <button type="button"  data-toggle="modal" data-target="#modal-eliminar-partido" onclick="datosPartido('${doc.id}','${partido.id}')" class="btn btn-danger btn-sm btn-eliminar-jugador"> <i class="fa fa-trash" aria-hidden="true"></i></button>
                                            <button type="button" onclick="EditarPartido('${partido.id}')" class="btn btn-secondary btn-sm btn-editar-jugador"> <i class="fa fa-pencil" aria-hidden="true"></i></button>
                                        </div>
                                    </td>
                                    <td class="align-center">
                                        <div class="result ${result}">
                                            ${result}
                                        </div>
                                    </td>
                                </tr>
                            `)
                        })
                    })
                })
            })
        } else {
            if(torneo.value != "Todos" && equipo.value == "Todos"){
                firestore.collection("torneos").doc(torneo.value).collection("partidos").get().then(function(querySnapshot){
                    querySnapshot.forEach(function(partido){
                        let result
                        if(partido.data().Score["Final"] > partido.data().ScoreRival["Final"]){
                            result = "w"
                        } else{
                            if(partido.data().Score["Final"] < partido.data().ScoreRival["Final"]){
                                result = "l"
                            }else{
                                result = "d"
                            }
                        }
                        $("#tabla-partidos").append(`
                            <tr>
                                <td>${partido.data().Equipo.split("_")[0]}</td>
                                <td class="vs-cell">vs</td>
                                <td>${partido.data().Rival}</td>
                                <td>${partido.data().Score["Final"]} - ${partido.data().ScoreRival["Final"]}</td>
                                <td>${partido.data().Fecha}</td>
                                <td>
                                    <div>
                                        <button type="button"  data-toggle="modal" data-target="#modal-eliminar-partido" onclick="datosPartido('${torneo.value}','${partido.id}')" class="btn btn-danger btn-sm btn-eliminar-jugador"> <i class="fa fa-trash" aria-hidden="true"></i></button>
                                        <button type="button" onclick="EditarPartido('${torneo.value}','${partido.id}')" class="btn btn-secondary btn-sm btn-editar-jugador"> <i class="fa fa-pencil" aria-hidden="true"></i></button>
                                    </div>
                                </td>
                                <td class="align-center">
                                    <div class="result ${result}">
                                        ${result}
                                    </div>
                                </td>
                            </tr>
                        `)
                    })
                })
            } else {
                firestore.collection("torneos").doc(torneo.value).collection("partidos").where("Equipo", "==", equipo.value).get().then(function(querySnapshot){
                    querySnapshot.forEach(function(partido){

                        let result
                        if(partido.data().Score["Final"] > partido.data().ScoreRival["Final"]){
                            result = "w"
                        } else{
                            if(partido.data().Score["Final"] < partido.data().ScoreRival["Final"]){
                                result = "l"
                            }else{
                                result = "d"
                            }
                        }                      
                        $("#tabla-partidos").append(`
                            <tr>
                                <td>${partido.data().Equipo.split("_")[0]}</td>
                                <td class="vs-cell">vs</td>
                                <td>${partido.data().Rival}</td>
                                <td>${partido.data().Score["Final"]} - ${partido.data().ScoreRival["Final"]}</td>
                                <td>${partido.data().Fecha}</td>
                                <td>
                                    <div>
                                        <button type="button"  data-toggle="modal" data-target="#modal-eliminar-partido" onclick="datosPartido('${torneo.value}','${partido.id}')" class="btn btn-danger btn-sm btn-eliminar-jugador"> <i class="fa fa-trash" aria-hidden="true"></i></button>
                                        <button type="button" onclick="EditarPartido('${torneo.value}','${partido.id}')" class="btn btn-secondary btn-sm btn-editar-jugador"> <i class="fa fa-pencil" aria-hidden="true"></i></button>
                                    </div>
                                </td>
                                <td class="align-center">
                                    <div class="result ${result}">
                                        ${result}
                                    </div>
                                </td>
                            </tr>
                        `)
                    })
                })
            }
        }
    } 
}
function limpiarTabla(){
    $("#tabla-partidos").html(`
    <tr>
        <th colspan="3">partido</th>
        <th>marcador</th>
        <th>fecha</th>
        <th></th>
        <th></th>
    </tr>
    `)
}
function obtenerFiltros(){
    firestore.collection("torneos").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            $("#selector-torneo").append(`<option value="${doc.id}">${doc.data().nombre}</option>`)
        });
    });
    firestore.collection("equipos").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            $("#selector-equipo").append(`<option value="${doc.id}">${doc.data().nombre}</option>`)
        });
    });
}
function datosPartido(torneo,id){
    currentTorneo = torneo
    currentPartido = id
}
function EliminarPartido(torneo, id){
    firestore.collection("torneos").doc(torneo).collection("partidos").doc(id).delete().then(function() {
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    limpiarTabla()
    filtrar()
}
function EditarPartido(torneo, id){
    localStorage.setItem("ID", id);
    localStorage.setItem("Torneo", torneo);
    window.location.replace("https://warrosweb.web.app/statstable.html");
}
function limpiarStorage(){
    localStorage.removeItem("ID");
    localStorage.removeItem("Torneo");
}

$(document).ready(function(){
    limpiarStorage()
    obtenerFiltros()
    filtrar()
    $("#btn-filtrar").click(function(){
        limpiarTabla()
        filtrar()
    })
    $("#btn-confirmar-eliminar").click(function(){
        EliminarPartido(currentTorneo, currentPartido)
    })
})




