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
let arrayPartido =[]
let arrayQ1 =[]
let arrayQ2 =[]
let arrayQ3 =[]
let arrayQ4 =[]
let arrayOT =[]
let teamQ1 =[]
let teamQ2 =[]
let teamQ3 =[]
let teamQ4 =[]
let teamOT =[]
let team =[]
team_fgM=0
team_fgA=0
team_thrM=0
team_thrA=0
team_ftM=0
team_ftA=0
team_rDf=0
team_rOf=0
team_As=0
team_St=0
team_Bl=0
team_TO=0
team_Fo=0




// Creación arrayPartido
matchData.collection("jugadores").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        matchData.get().then(function(equipo){
            firestore.doc(`equipos/${equipo.data().Equipo}/jugadores/${doc.id}`).get().then(function(jugador){
                fgM=0
                fgA=0
                thrM=0
                thrA=0
                ftM=0
                ftA=0
                rDf=0
                rOf=0
                As=0
                St=0
                Bl=0
                TO=0
                Fo=0
                for(Q in doc.data()){
                    fgM+=doc.data()[Q].fgM
                    fgA+=doc.data()[Q].fgA
                    thrM+=doc.data()[Q].thrM
                    thrA+=doc.data()[Q].thrA
                    ftM+=doc.data()[Q].ftM
                    ftA+=doc.data()[Q].ftA
                    rDf+=doc.data()[Q].rDf
                    rOf+=doc.data()[Q].rOf
                    As+=doc.data()[Q].As
                    St+=doc.data()[Q].St
                    Bl+=doc.data()[Q].Bl
                    TO+=doc.data()[Q].TO
                    Fo+=doc.data()[Q].Fo
                    team_fgM+=doc.data()[Q].fgM
                    team_fgA+=doc.data()[Q].fgA
                    team_thrM+=doc.data()[Q].thrM
                    team_thrA+=doc.data()[Q].thrA
                    team_ftM+=doc.data()[Q].ftM
                    team_ftA+=doc.data()[Q].ftA
                    team_rDf+=doc.data()[Q].rDf
                    team_rOf+=doc.data()[Q].rOf
                    team_As+=doc.data()[Q].As
                    team_St+=doc.data()[Q].St
                    team_Bl+=doc.data()[Q].Bl
                    team_TO+=doc.data()[Q].TO
                    team_Fo+=doc.data()[Q].Fo
                }
                jugadorJSON ={ id:jugador.id, numero: jugador.data().numero, nombre: jugador.data().nombre, fgM:fgM, fgA:fgA, thrM:thrM, thrA:thrA, ftM:ftM, ftA:ftA, rDf:rDf, rOf:rOf, As:As, St:St, Bl:Bl, TO:TO, Fo:Fo}
                arrayPartido.push(jugadorJSON)
                team = ["##", "TOTAL", team_fgM, team_fgA, team_thrM, team_thrA, team_ftM, team_ftA, team_rDf, team_rOf, team_As, team_St, team_Bl, team_TO, team_Fo];
                displayTable(arrayPartido, team)
            })        
        }) 
    });
});

// Creación de arrayQ1
Q1_fgM=0
Q1_fgA=0
Q1_thrM=0
Q1_thrA=0
Q1_ftM=0
Q1_ftA=0
Q1_rDf=0
Q1_rOf=0
Q1_As=0
Q1_St=0
Q1_Bl=0
Q1_TO=0
Q1_Fo=0
matchData.collection("jugadores").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        matchData.get().then(function(equipo){
            firestore.doc(`equipos/${equipo.data().Equipo}/jugadores/${doc.id}`).get().then(function(jugador){
                Q1_fgM+=doc.data().Q1.fgM
                Q1_fgA+=doc.data().Q1.fgA
                Q1_thrM+=doc.data().Q1.thrM
                Q1_thrA+=doc.data().Q1.thrA
                Q1_ftM+=doc.data().Q1.ftM
                Q1_ftA+=doc.data().Q1.ftA
                Q1_rDf+=doc.data().Q1.rDf
                Q1_rOf+=doc.data().Q1.rOf
                Q1_As+=doc.data().Q1.As
                Q1_St+=doc.data().Q1.St
                Q1_Bl+=doc.data().Q1.Bl
                Q1_TO+=doc.data().Q1.TO
                Q1_Fo+=doc.data().Q1.Fo
                jugadorJSON ={ id:jugador.id, numero: jugador.data().numero, nombre: jugador.data().nombre, fgM:doc.data().Q1.fgM, fgA:doc.data().Q1.fgA, thrM:doc.data().Q1.thrM, thrA:doc.data().Q1.thrA, ftM:doc.data().Q1.ftM, ftA:doc.data().Q1.ftA, rDf:doc.data().Q1.rDf, rOf:doc.data().Q1.rOf, As:doc.data().Q1.As, St:doc.data().Q1.St, Bl:doc.data().Q1.Bl, TO:doc.data().Q1.TO, Fo:doc.data().Q1.Fo}
                arrayQ1.push(jugadorJSON)
                teamQ1= ["##", "TOTAL", Q1_fgM, Q1_fgA, Q1_thrM, Q1_thrA, Q1_ftM, Q1_ftA, Q1_rDf, Q1_rOf, Q1_As, Q1_St, Q1_Bl, Q1_TO, Q1_Fo];
            })
        })
    })
})

// Creación de arrayQ2
Q2_fgM=0
Q2_fgA=0
Q2_thrM=0
Q2_thrA=0
Q2_ftM=0
Q2_ftA=0
Q2_rDf=0
Q2_rOf=0
Q2_As=0
Q2_St=0
Q2_Bl=0
Q2_TO=0
Q2_Fo=0
matchData.collection("jugadores").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        matchData.get().then(function(equipo){
            firestore.doc(`equipos/${equipo.data().Equipo}/jugadores/${doc.id}`).get().then(function(jugador){
                Q2_fgM+=doc.data().Q2.fgM
                Q2_fgA+=doc.data().Q2.fgA
                Q2_thrM+=doc.data().Q2.thrM
                Q2_thrA+=doc.data().Q2.thrA
                Q2_ftM+=doc.data().Q2.ftM
                Q2_ftA+=doc.data().Q2.ftA
                Q2_rDf+=doc.data().Q2.rDf
                Q2_rOf+=doc.data().Q2.rOf
                Q2_As+=doc.data().Q2.As
                Q2_St+=doc.data().Q2.St
                Q2_Bl+=doc.data().Q2.Bl
                Q2_TO+=doc.data().Q2.TO
                Q2_Fo+=doc.data().Q2.Fo
                jugadorJSON ={ id:jugador.id, numero: jugador.data().numero, nombre: jugador.data().nombre, fgM:doc.data().Q2.fgM, fgA:doc.data().Q2.fgA, thrM:doc.data().Q2.thrM, thrA:doc.data().Q2.thrA, ftM:doc.data().Q2.ftM, ftA:doc.data().Q2.ftA, rDf:doc.data().Q2.rDf, rOf:doc.data().Q2.rOf, As:doc.data().Q2.As, St:doc.data().Q2.St, Bl:doc.data().Q2.Bl, TO:doc.data().Q2.TO, Fo:doc.data().Q2.Fo}
                arrayQ2.push(jugadorJSON)
                teamQ2= ["##", "TOTAL", Q2_fgM, Q2_fgA, Q2_thrM, Q2_thrA, Q2_ftM, Q2_ftA, Q2_rDf, Q2_rOf, Q2_As, Q2_St, Q2_Bl, Q2_TO, Q2_Fo];
            })
        })
    })
})

// Creación de arrayQ3
Q3_fgM=0
Q3_fgA=0
Q3_thrM=0
Q3_thrA=0
Q3_ftM=0
Q3_ftA=0
Q3_rDf=0
Q3_rOf=0
Q3_As=0
Q3_St=0
Q3_Bl=0
Q3_TO=0
Q3_Fo=0
matchData.collection("jugadores").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        matchData.get().then(function(equipo){
            firestore.doc(`equipos/${equipo.data().Equipo}/jugadores/${doc.id}`).get().then(function(jugador){
                Q3_fgM+=doc.data().Q3.fgM
                Q3_fgA+=doc.data().Q3.fgA
                Q3_thrM+=doc.data().Q3.thrM
                Q3_thrA+=doc.data().Q3.thrA
                Q3_ftM+=doc.data().Q3.ftM
                Q3_ftA+=doc.data().Q3.ftA
                Q3_rDf+=doc.data().Q3.rDf
                Q3_rOf+=doc.data().Q3.rOf
                Q3_As+=doc.data().Q3.As
                Q3_St+=doc.data().Q3.St
                Q3_Bl+=doc.data().Q3.Bl
                Q3_TO+=doc.data().Q3.TO
                Q3_Fo+=doc.data().Q3.Fo
                jugadorJSON ={ id:jugador.id, numero: jugador.data().numero, nombre: jugador.data().nombre, fgM:doc.data().Q3.fgM, fgA:doc.data().Q3.fgA, thrM:doc.data().Q3.thrM, thrA:doc.data().Q3.thrA, ftM:doc.data().Q3.ftM, ftA:doc.data().Q3.ftA, rDf:doc.data().Q3.rDf, rOf:doc.data().Q3.rOf, As:doc.data().Q3.As, St:doc.data().Q3.St, Bl:doc.data().Q3.Bl, TO:doc.data().Q3.TO, Fo:doc.data().Q3.Fo}
                arrayQ3.push(jugadorJSON)
                teamQ3= ["##", "TOTAL", Q3_fgM, Q3_fgA, Q3_thrM, Q3_thrA, Q3_ftM, Q3_ftA, Q3_rDf, Q3_rOf, Q3_As, Q3_St, Q3_Bl, Q3_TO, Q3_Fo];
            })
        })
    })
})

// Creación de arrayQ4
Q4_fgM=0
Q4_fgA=0
Q4_thrM=0
Q4_thrA=0
Q4_ftM=0
Q4_ftA=0
Q4_rDf=0
Q4_rOf=0
Q4_As=0
Q4_St=0
Q4_Bl=0
Q4_TO=0
Q4_Fo=0
matchData.collection("jugadores").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        matchData.get().then(function(equipo){
            firestore.doc(`equipos/${equipo.data().Equipo}/jugadores/${doc.id}`).get().then(function(jugador){
                Q4_fgM+=doc.data().Q4.fgM
                Q4_fgA+=doc.data().Q4.fgA
                Q4_thrM+=doc.data().Q4.thrM
                Q4_thrA+=doc.data().Q4.thrA
                Q4_ftM+=doc.data().Q4.ftM
                Q4_ftA+=doc.data().Q4.ftA
                Q4_rDf+=doc.data().Q4.rDf
                Q4_rOf+=doc.data().Q4.rOf
                Q4_As+=doc.data().Q4.As
                Q4_St+=doc.data().Q4.St
                Q4_Bl+=doc.data().Q4.Bl
                Q4_TO+=doc.data().Q4.TO
                Q4_Fo+=doc.data().Q4.Fo
                jugadorJSON ={ id:jugador.id, numero: jugador.data().numero, nombre: jugador.data().nombre, fgM:doc.data().Q4.fgM, fgA:doc.data().Q4.fgA, thrM:doc.data().Q4.thrM, thrA:doc.data().Q4.thrA, ftM:doc.data().Q4.ftM, ftA:doc.data().Q4.ftA, rDf:doc.data().Q4.rDf, rOf:doc.data().Q4.rOf, As:doc.data().Q4.As, St:doc.data().Q4.St, Bl:doc.data().Q4.Bl, TO:doc.data().Q4.TO, Fo:doc.data().Q4.Fo}
                arrayQ4.push(jugadorJSON)
                teamQ4= ["##", "TOTAL", Q4_fgM, Q4_fgA, Q4_thrM, Q4_thrA, Q4_ftM, Q4_ftA, Q4_rDf, Q4_rOf, Q4_As, Q4_St, Q4_Bl, Q4_TO, Q4_Fo];
            })
        })
    })
})

function displayTable(array, team){
    // EXTRACT VALUE FOR HTML HEADER. 
    var col = [];
    for (var i = 0; i < array.length; i++) {
        for (var key in array[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var tr = table.insertRow(-1);                   // TABLE ROW.
    for (var i = 1; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < array.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 1; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = array[i][col[j]];
        }
    }
    tr = table.insertRow(-1);
    for (var j = 0; j < team.length; j++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = team[j];
        tr.appendChild(th);
    }
    var divContainer = document.getElementById("insert-table");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}


$("#final").change(function(){
    displayTable(arrayPartido, team)
})
$("#q1").change(function(){
    displayTable(arrayQ1, teamQ1)
})
$("#q2").change(function(){
    displayTable(arrayQ2, teamQ2)
})
$("#q3").change(function(){
    displayTable(arrayQ3, teamQ3)
})
$("#q4").change(function(){
    displayTable(arrayQ4, teamQ4)
})
$("#ot").change(function(){
    displayTable(arrayOT, teamOT)
})

