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
let total =[]
team_twoM=0
team_twoA=0
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

// Funciones
function displayTable(array, total){
    // specify the columns
    var columnDefs = [
        {headerName: "#", field: "numero", width: 65, sortable: true,  pinned: 'left', lockPosition: true},
        {headerName: "Nombre", field: "nombre", width: 120, resizable: true, sortable: true, filter: true,  pinned: 'left', lockPosition: true},
        {headerName: "PTS", field: "pts", width: 70, sortable: true, lockPosition: true},
        {headerName: "FGM", field: "fgM", width: 70, sortable: true, lockPosition: true, editable: true, singleClickEdit:true},
        {headerName: "FGA", field: "fgA", width: 70, sortable: true, lockPosition: true, editable: true, singleClickEdit:true},
        {headerName: "FG%", field: "fgP", width: 70, sortable: true, lockPosition: true},
        {headerName: "3PM", field: "thrM", width: 70, sortable: true, lockPosition: true, editable: true, singleClickEdit:true},
        {headerName: "3PA", field: "thrA", width: 70, sortable: true, lockPosition: true, editable: true, singleClickEdit:true},
        {headerName: "3P%", field: "thrP", width: 70, sortable: true, lockPosition: true},
        {headerName: "FTM", field: "ftM", width: 70, sortable: true, lockPosition: true, editable: true, singleClickEdit:true},
        {headerName: "FTA", field: "ftA", width: 70, sortable: true, lockPosition: true, editable: true, singleClickEdit:true},
        {headerName: "FT%", field: "ftP", width: 70, sortable: true, lockPosition: true},
        {headerName: "OREB", field: "rOf", width: 70, sortable: true, lockPosition: true, editable: true, singleClickEdit:true},
        {headerName: "DREB", field: "rDf", width: 70, sortable: true, lockPosition: true, editable: true, singleClickEdit:true},
        {headerName: "REB", field: "rT", width: 70, sortable: true, lockPosition: true, editable: true, singleClickEdit:true},
        {headerName: "AST", field: "As", width: 70, sortable: true, lockPosition: true, editable: true, singleClickEdit:true},
        {headerName: "TOV", field: "TO", width: 70, sortable: true, lockPosition: true, editable: true, singleClickEdit:true},
        {headerName: "STL", field: "St", width: 70, sortable: true, lockPosition: true, editable: true, singleClickEdit:true},
        {headerName: "BLK", field: "Bl", width: 70, sortable: true, lockPosition: true, editable: true, singleClickEdit:true},
        {headerName: "PF", field: "Fo", width: 70, sortable: true, lockPosition: true, editable: true, singleClickEdit:true},
    ];
    // let the grid know which columns and what data to use
    var gridOptions = {
        columnDefs: columnDefs,
        rowData: array,
        pinnedBottomRowData: total,
        rowStyle:{ "font-size": "12px" },
        getRowStyle: function (params) {
            if (params.node.rowPinned) {
              return { 'font-weight': 'bold' };
            }
          }
    };


    // lookup the container we want the Grid to use
    var eGridDiv = document.querySelector('#myGrid');
    // create the grid passing in the div to use together with the columns & data we want to use
    setTimeout(function(){ new agGrid.Grid(eGridDiv, gridOptions); }, 600)
}
function saveChanges(){
    Q1_twoM=0, Q1_twoA=0, Q1_thrM=0, Q1_thrA=0, Q1_ftM=0, Q1_ftA=0, Q1_rDf=0, Q1_rOf=0, Q1_As=0, Q1_St=0, Q1_Bl=0, Q1_TO=0, Q1_Fo=0
    Q2_twoM=0, Q2_twoA=0, Q2_thrM=0, Q2_thrA=0, Q2_ftM=0, Q2_ftA=0, Q2_rDf=0, Q2_rOf=0, Q2_As=0, Q2_St=0, Q2_Bl=0, Q2_TO=0, Q2_Fo=0
    Q3_twoM=0, Q3_twoA=0, Q3_thrM=0, Q3_thrA=0, Q3_ftM=0, Q3_ftA=0, Q3_rDf=0, Q3_rOf=0, Q3_As=0, Q3_St=0, Q3_Bl=0, Q3_TO=0, Q3_Fo=0
    Q4_twoM=0, Q4_twoA=0, Q4_thrM=0, Q4_thrA=0, Q4_ftM=0, Q4_ftA=0, Q4_rDf=0, Q4_rOf=0, Q4_As=0, Q4_St=0, Q4_Bl=0, Q4_TO=0, Q4_Fo=0
    OT_twoM=0, OT_twoA=0, OT_thrM=0, OT_thrA=0, OT_ftM=0, OT_ftA=0, OT_rDf=0, OT_rOf=0, OT_As=0, OT_St=0, OT_Bl=0, OT_TO=0, OT_Fo=0
    arrayQ1.forEach(function(jugador){
        matchData.collection("jugadores").doc(jugador.id).update({
            Q1: {
                twoM:parseInt(jugador.fgM-jugador.thrM),
                twoA:parseInt(jugador.fgA-jugador.thrA),
                thrM:parseInt(jugador.thrM),
                thrA:parseInt(jugador.thrA),
                ftM:parseInt(jugador.ftM),
                ftA:parseInt(jugador.ftA),
                rDf:parseInt(jugador.rDf),
                rOf:parseInt(jugador.rOf),
                As:parseInt(jugador.As),
                St:parseInt(jugador.St),
                Bl:parseInt(jugador.Bl),
                TO:parseInt(jugador.TO),
                Fo:parseInt(jugador.Fo)
              }
        })
        Q1_twoM+=parseInt(jugador.fgM-jugador.thrM)
        Q1_twoA+=parseInt(jugador.fgA-jugador.thrA)
        Q1_thrM+=parseInt(jugador.thrM)
        Q1_thrA+=parseInt(jugador.thrA)
        Q1_ftM+=parseInt(jugador.ftM)
        Q1_ftA+=parseInt(jugador.ftA)
        Q1_rDf+=parseInt(jugador.rDf)
        Q1_rOf+=parseInt(jugador.rOf)
        Q1_As+=parseInt(jugador.As)
        Q1_St+=parseInt(jugador.St)
        Q1_Bl+=parseInt(jugador.Bl)
        Q1_TO+=parseInt(jugador.TO)
        Q1_Fo+=parseInt(jugador.Fo)
        totalQ1= {
            numero: "##",
            nombre: "TOTAL",
            pts:(Q1_twoM*2) + ( Q1_thrM*3) + (Q1_ftM),
            fgM: (Q1_twoM + Q1_thrM),
            fgA: (Q1_twoA + Q1_twoA),
            fgP: ((Q1_twoM + Q1_thrM)/( Q1_twoA + Q1_thrA)*100).toFixed(1),
            thrM: Q1_thrM,
            thrA: Q1_thrA,
            thrP: ((Q1_thrM/Q1_thrA)*100).toFixed(1),
            ftM: Q1_ftM,
            ftA: Q1_ftA,
            ftP: ((Q1_ftM/Q1_ftA)*100).toFixed(1),
            rDf: Q1_rDf,
            rOf: Q1_rOf,
            rT:Q1_rDf+Q1_rOf,
            As: Q1_As,
            St: Q1_St,
            Bl: Q1_Bl,
            TO: Q1_TO,
            Fo: Q1_Fo
        }
        teamQ1.pop()
        teamQ1.push(totalQ1)
    })
    arrayQ2.forEach(function(jugador){
        matchData.collection("jugadores").doc(jugador.id).update({
            Q2: {
                twoM:jugador.fgM-jugador.thrM,
                twoA:jugador.fgA-jugador.thrA,
                thrM:parseInt(jugador.thrM),
                thrA:parseInt(jugador.thrA),
                ftM:parseInt(jugador.ftM),
                ftA:parseInt(jugador.ftA),
                rDf:parseInt(jugador.rDf),
                rOf:parseInt(jugador.rOf),
                As:parseInt(jugador.As),
                St:parseInt(jugador.St),
                Bl:parseInt(jugador.Bl),
                TO:parseInt(jugador.TO),
                Fo:parseInt(jugador.Fo)
              }
        })
        Q2_twoM+=parseInt(jugador.fgM-jugador.thrM)
        Q2_twoA+=parseInt(jugador.fgA-jugador.thrA)
        Q2_thrM+=parseInt(jugador.thrM)
        Q2_thrA+=parseInt(jugador.thrA)
        Q2_ftM+=parseInt(jugador.ftM)
        Q2_ftA+=parseInt(jugador.ftA)
        Q2_rDf+=parseInt(jugador.rDf)
        Q2_rOf+=parseInt(jugador.rOf)
        Q2_As+=parseInt(jugador.As)
        Q2_St+=parseInt(jugador.St)
        Q2_Bl+=parseInt(jugador.Bl)
        Q2_TO+=parseInt(jugador.TO)
        Q2_Fo+=parseInt(jugador.Fo)
        totalQ2= {
            numero: "##",
            nombre: "TOTAL",
            pts:(Q2_twoM*2) + ( Q2_thrM*3) + (Q2_ftM),
            fgM: (Q2_twoM + Q2_thrM),
            fgA: (Q2_twoA + Q2_twoA),
            fgP: ((Q2_twoM + Q2_thrM)/( Q2_twoA + Q2_thrA)*100).toFixed(1),
            thrM: Q2_thrM,
            thrA: Q2_thrA,
            thrP: ((Q2_thrM/Q2_thrA)*100).toFixed(1),
            ftM: Q2_ftM,
            ftA: Q2_ftA,
            ftP: ((Q2_ftM/Q2_ftA)*100).toFixed(1),
            rDf: Q2_rDf,
            rOf: Q2_rOf,
            rT:Q2_rDf+Q2_rOf,
            As: Q2_As,
            St: Q2_St,
            Bl: Q2_Bl,
            TO: Q2_TO,
            Fo: Q2_Fo
        }
        teamQ2.pop()
        teamQ2.push(totalQ2)
    })
    arrayQ3.forEach(function(jugador){
        matchData.collection("jugadores").doc(jugador.id).update({
            Q3: {
                twoM:jugador.fgM-jugador.thrM,
                twoA:jugador.fgA-jugador.thrA,
                thrM:parseInt(jugador.thrM),
                thrA:parseInt(jugador.thrA),
                ftM:parseInt(jugador.ftM),
                ftA:parseInt(jugador.ftA),
                rDf:parseInt(jugador.rDf),
                rOf:parseInt(jugador.rOf),
                As:parseInt(jugador.As),
                St:parseInt(jugador.St),
                Bl:parseInt(jugador.Bl),
                TO:parseInt(jugador.TO),
                Fo:parseInt(jugador.Fo)
              }
        })
        Q3_twoM+=parseInt(jugador.fgM-jugador.thrM)
        Q3_twoA+=parseInt(jugador.fgA-jugador.thrA)
        Q3_thrM+=parseInt(jugador.thrM)
        Q3_thrA+=parseInt(jugador.thrA)
        Q3_ftM+=parseInt(jugador.ftM)
        Q3_ftA+=parseInt(jugador.ftA)
        Q3_rDf+=parseInt(jugador.rDf)
        Q3_rOf+=parseInt(jugador.rOf)
        Q3_As+=parseInt(jugador.As)
        Q3_St+=parseInt(jugador.St)
        Q3_Bl+=parseInt(jugador.Bl)
        Q3_TO+=parseInt(jugador.TO)
        Q3_Fo+=parseInt(jugador.Fo)
        totalQ3= {
            numero: "##",
            nombre: "TOTAL",
            pts:(Q3_twoM*2) + ( Q3_thrM*3) + (Q3_ftM),
            fgM: (Q3_twoM + Q3_thrM),
            fgA: (Q3_twoA + Q3_twoA),
            fgP: ((Q3_twoM + Q3_thrM)/( Q3_twoA + Q3_thrA)*100).toFixed(1),
            thrM: Q3_thrM,
            thrA: Q3_thrA,
            thrP: ((Q3_thrM/Q3_thrA)*100).toFixed(1),
            ftM: Q3_ftM,
            ftA: Q3_ftA,
            ftP: ((Q3_ftM/Q3_ftA)*100).toFixed(1),
            rDf: Q3_rDf,
            rOf: Q3_rOf,
            rT:Q3_rDf+Q3_rOf,
            As: Q3_As,
            St: Q3_St,
            Bl: Q3_Bl,
            TO: Q3_TO,
            Fo: Q3_Fo
        }
        teamQ3.pop()
        teamQ3.push(totalQ3)
    })
    arrayQ4.forEach(function(jugador){
        matchData.collection("jugadores").doc(jugador.id).update({
            Q4: {
                twoM:jugador.fgM-jugador.thrM,
                twoA:jugador.fgA-jugador.thrA,
                thrM:parseInt(jugador.thrM),
                thrA:parseInt(jugador.thrA),
                ftM:parseInt(jugador.ftM),
                ftA:parseInt(jugador.ftA),
                rDf:parseInt(jugador.rDf),
                rOf:parseInt(jugador.rOf),
                As:parseInt(jugador.As),
                St:parseInt(jugador.St),
                Bl:parseInt(jugador.Bl),
                TO:parseInt(jugador.TO),
                Fo:parseInt(jugador.Fo)
              }
        })
        Q4_twoM+=parseInt(jugador.fgM-jugador.thrM)
        Q4_twoA+=parseInt(jugador.fgA-jugador.thrA)
        Q4_thrM+=parseInt(jugador.thrM)
        Q4_thrA+=parseInt(jugador.thrA)
        Q4_ftM+=parseInt(jugador.ftM)
        Q4_ftA+=parseInt(jugador.ftA)
        Q4_rDf+=parseInt(jugador.rDf)
        Q4_rOf+=parseInt(jugador.rOf)
        Q4_As+=parseInt(jugador.As)
        Q4_St+=parseInt(jugador.St)
        Q4_Bl+=parseInt(jugador.Bl)
        Q4_TO+=parseInt(jugador.TO)
        Q4_Fo+=parseInt(jugador.Fo)
        totalQ4= {
            numero: "##",
            nombre: "TOTAL",
            pts:(Q4_twoM*2) + ( Q4_thrM*3) + (Q4_ftM),
            fgM: (Q4_twoM + Q4_thrM),
            fgA: (Q4_twoA + Q4_twoA),
            fgP: ((Q4_twoM + Q4_thrM)/( Q4_twoA + Q4_thrA)*100).toFixed(1),
            thrM: Q4_thrM,
            thrA: Q4_thrA,
            thrP: ((Q4_thrM/Q4_thrA)*100).toFixed(1),
            ftM: Q4_ftM,
            ftA: Q4_ftA,
            ftP: ((Q4_ftM/Q4_ftA)*100).toFixed(1),
            rDf: Q4_rDf,
            rOf: Q4_rOf,
            rT:Q4_rDf+Q4_rOf,
            As: Q4_As,
            St: Q4_St,
            Bl: Q4_Bl,
            TO: Q4_TO,
            Fo: Q4_Fo
        }
        teamQ4.pop()
        teamQ4.push(totalQ4)
    })
    // arrayOT.forEach(function(jugador){
    //     matchData.collection("jugadores").doc(jugador.id).update({
    //         OT: {
                    // twoM:jugador.fgM-jugador.thrM,
                    // twoA:jugador.fgA-jugador.thrA,
                    // thrM:parseInt(jugador.thrM),
                    // thrA:parseInt(jugador.thrA),
                    // ftM:parseInt(jugador.ftM),
                    // ftA:parseInt(jugador.ftA),
                    // rDf:parseInt(jugador.rDf),
                    // rOf:parseInt(jugador.rOf),
                    // As:parseInt(jugador.As),
                    // St:parseInt(jugador.St),
                    // Bl:parseInt(jugador.Bl),
                    // TO:parseInt(jugador.TO),
                    // Fo:parseInt(jugador.Fo)
    //           }
    //     })
        // OT_twoM+=parseInt(jugador.fgM-jugador.thrM)
        // OT_twoA+=parseInt(jugador.fgA-jugador.thrA)
        // OT_thrM+=parseInt(jugador.thrM)
        // OT_thrA+=parseInt(jugador.thrA)
        // OT_ftM+=parseInt(jugador.ftM)
        // OT_ftA+=parseInt(jugador.ftA)
        // OT_rDf+=parseInt(jugador.rDf)
        // OT_rOf+=parseInt(jugador.rOf)
        // OT_As+=parseInt(jugador.As)
        // OT_St+=parseInt(jugador.St)
        // OT_Bl+=parseInt(jugador.Bl)
        // OT_TO+=parseInt(jugador.TO)
        // OT_Fo+=parseInt(jugador.Fo)
        // totalOT= {
        //     numero: "##",
        //     nombre: "TOTAL",
        //     pts:(OT_twoM*2) + ( OT_thrM*3) + (OT_ftM),
        //     fgM: (OT_twoM + OT_thrM),
        //     fgA: (OT_twoA + OT_twoA),
        //     fgP: ((OT_twoM + OT_thrM)/( OT_twoA + OT_thrA)*100).toFixed(1),
        //     thrM: OT_thrM,
        //     thrA: OT_thrA,
        //     thrP: ((OT_thrM/OT_thrA)*100).toFixed(1),
        //     ftM: OT_ftM,
        //     ftA: OT_ftA,
        //     ftP: ((OT_ftM/OT_ftA)*100).toFixed(1),
        //     rDf: OT_rDf,
        //     rOf: OT_rOf,
        //     rT:OT_rDf+OT_rOf,
        //     As: OT_As,
        //     St: OT_St,
        //     Bl: OT_Bl,
        //     TO: OT_TO,
        //     Fo: OT_Fo
        // }
        // teamOT.pop()
        // teamOT.push(totalOT)
    // })
    matchData.update({
        "Fecha":"hoy",
        "Score": {
            Final: teamQ1[0].pts + teamQ2[0].pts + teamQ3[0].pts + teamQ4[0].pts, //+ teamOT[0].pts,
            Q1:teamQ1[0].pts,
            Q2:teamQ2[0].pts,
            Q3:teamQ3[0].pts,
            Q4:teamQ4[0].pts
            // OT:teamOT[0].pts
          }
    }).then(function() {
        alert("Cambios guardados de forma exitosa.\n\nIMPORTANTE:\n- Si aumentaste los tiros encestados, tambien hay que aumentar los tiros intentados.\n- Editar sólo en el periodo o cuarto correspondiente, no en el apartado de: FINAL ")
        setTimeout(function(){location.reload();}, 400)
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

function displayScore(Q){
    matchData.onSnapshot(function(doc) {
        $("#score-a").text(doc.data().Score[Q])
        $("#score-b").text(doc.data().ScoreRival[Q])
    });
    
}

//Marcador
matchData.get().then(function(doc) {
    if (doc.exists) {
        $("#team-a").text(doc.data().Equipo.split("_")[0])
        $("#team-b").text(doc.data().Rival)
    } else {
        console.log("No such match!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
displayScore("Final")

// Creación arrayPartido
matchData.collection("jugadores").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        matchData.get().then(function(equipo){
            firestore.doc(`equipos/${equipo.data().Equipo}/jugadores/${doc.id}`).get().then(function(jugador){
                twoM=0, twoA=0, thrM=0, thrA=0, ftM=0, ftA=0, rDf=0, rOf=0, As=0, St=0, Bl=0, TO=0, Fo=0 
                for(Q in doc.data()){
                    twoM+=doc.data()[Q].twoM
                    twoA+=doc.data()[Q].twoA
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
                    team_twoM+=doc.data()[Q].twoM
                    team_twoA+=doc.data()[Q].twoA
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
                jugadorJSON = {
                    id: jugador.id,
                    numero: jugador.data().numero,
                    nombre: jugador.data().nombre,
                    pts:(twoM*2)+(thrM*3)+(ftM),
                    fgM: (twoM+thrM),
                    fgA: (twoA+thrA),
                    fgP: ((twoM+thrM)/(twoA+thrA)*100).toFixed(1),
                    thrM: thrM,
                    thrA: thrA,
                    thrP: ((thrM/thrA)*100).toFixed(1),
                    ftM: ftM,
                    ftA: ftA,
                    ftP: ((ftM/ftA)*100).toFixed(1),
                    rDf: rDf,
                    rOf: rOf,
                    rT:rDf+rOf,
                    As: As,
                    St: St,
                    Bl: Bl,
                    TO: TO,
                    Fo: Fo
                }
                arrayPartido.push(jugadorJSON)
                team = {
                    numero: "##",
                    nombre: "TOTAL",
                    pts:(team_twoM*2)+(team_thrM*3)+(team_ftM),
                    fgM: (team_twoM+team_thrM),
                    fgA: (team_twoA+team_thrA),
                    fgP: ((team_twoM+team_thrM)/(team_twoA+team_thrA)*100).toFixed(1),
                    thrM: team_thrM,
                    thrA: team_thrA,
                    thrP: ((team_thrM/team_thrA)*100).toFixed(1),
                    ftM: team_ftM,
                    ftA: team_ftA,
                    ftP: ((team_ftM/team_ftA)*100).toFixed(1),
                    rDf: team_rDf,
                    rOf: team_rOf,
                    rT:team_rDf+team_rOf,
                    As: team_As,
                    St: team_St,
                    Bl: team_Bl,
                    TO: team_TO,
                    Fo: team_Fo
                }
                total.pop()
                total.push(team)
            })     
        })
    });
// AQUI
})

// Creación de arrayQ1
Q1_twoM=0, Q1_twoA=0, Q1_thrM=0, Q1_thrA=0, Q1_ftM=0, Q1_ftA=0, Q1_rDf=0, Q1_rOf=0, Q1_As=0, Q1_St=0, Q1_Bl=0, Q1_TO=0, Q1_Fo=0
matchData.collection("jugadores").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        matchData.get().then(function(equipo){
            firestore.doc(`equipos/${equipo.data().Equipo}/jugadores/${doc.id}`).get().then(function(jugador){
                Q1_twoM+=doc.data().Q1.twoM
                Q1_twoA+=doc.data().Q1.twoA
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
                jugadorJSON = {
                    id: jugador.id,
                    numero: jugador.data().numero,
                    nombre: jugador.data().nombre,
                    pts:(doc.data().Q1.twoM*2) + (doc.data().Q1.thrM*3) + (doc.data().Q1.ftM),
                    fgM:(doc.data().Q1.twoM + doc.data().Q1.thrM),
                    fgA:(doc.data().Q1.twoA + doc.data().Q1.thrA),
                    fgP:((doc.data().Q1.twoM + doc.data().Q1.thrM)/(doc.data().Q1.twoA+ doc.data().Q1.thrA)*100).toFixed(1),
                    thrM:doc.data().Q1.thrM,
                    thrA:doc.data().Q1.thrA,
                    thrP:((doc.data().Q1.thrM/doc.data().Q1.thrA)*100).toFixed(1),
                    ftM:doc.data().Q1.ftM,
                    ftA:doc.data().Q1.ftA,
                    ftP:((doc.data().Q1.ftM/doc.data().Q1.ftA)*100).toFixed(1),
                    rDf:doc.data().Q1.rDf,
                    rOf:doc.data().Q1.rOf,
                    rT:(doc.data().Q1.rDf + doc.data().Q1.rOf),
                    As:doc.data().Q1.As,
                    St:doc.data().Q1.St,
                    Bl:doc.data().Q1.Bl,
                    TO:doc.data().Q1.TO,
                    Fo:doc.data().Q1.Fo
                }
                arrayQ1.push(jugadorJSON)
                totalQ1= {
                    numero: "##",
                    nombre: "TOTAL",
                    pts:(Q1_twoM*2) + ( Q1_thrM*3) + (Q1_ftM),
                    fgM: (Q1_twoM + Q1_thrM),
                    fgA: (Q1_twoA + Q1_twoA),
                    fgP: ((Q1_twoM + Q1_thrM)/( Q1_twoA + Q1_thrA)*100).toFixed(1),
                    thrM: Q1_thrM,
                    thrA: Q1_thrA,
                    thrP: ((Q1_thrM/Q1_thrA)*100).toFixed(1),
                    ftM: Q1_ftM,
                    ftA: Q1_ftA,
                    ftP: ((Q1_ftM/Q1_ftA)*100).toFixed(1),
                    rDf: Q1_rDf,
                    rOf: Q1_rOf,
                    rT:Q1_rDf+Q1_rOf,
                    As: Q1_As,
                    St: Q1_St,
                    Bl: Q1_Bl,
                    TO: Q1_TO,
                    Fo: Q1_Fo
                }
                teamQ1.pop()
                teamQ1.push(totalQ1)
            })
        })
    })
})

// Creación de arrayQ2
Q2_twoM=0, Q2_twoA=0, Q2_thrM=0, Q2_thrA=0, Q2_ftM=0, Q2_ftA=0, Q2_rDf=0, Q2_rOf=0, Q2_As=0, Q2_St=0, Q2_Bl=0, Q2_TO=0, Q2_Fo=0
matchData.collection("jugadores").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        matchData.get().then(function(equipo){
            firestore.doc(`equipos/${equipo.data().Equipo}/jugadores/${doc.id}`).get().then(function(jugador){
                Q2_twoM+=doc.data().Q2.twoM
                Q2_twoA+=doc.data().Q2.twoA
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
                jugadorJSON = {
                    id: jugador.id,
                    numero: jugador.data().numero,
                    nombre: jugador.data().nombre,
                    pts:(doc.data().Q2.twoM*2) + (doc.data().Q2.thrM*3) + (doc.data().Q2.ftM),
                    fgM:(doc.data().Q2.twoM + doc.data().Q2.thrM),
                    fgA:(doc.data().Q2.twoA+ doc.data().Q2.thrA),
                    fgP:((doc.data().Q2.twoM + doc.data().Q2.thrM)/(doc.data().Q2.twoA+ doc.data().Q2.thrA)*100).toFixed(1),
                    thrM:doc.data().Q2.thrM,
                    thrA:doc.data().Q2.thrA,
                    thrP:((doc.data().Q2.thrM/doc.data().Q2.thrA)*100).toFixed(1),
                    ftM:doc.data().Q2.ftM,
                    ftA:doc.data().Q2.ftA,
                    ftP:((doc.data().Q2.ftM/doc.data().Q2.ftA)*100).toFixed(1),
                    rDf:doc.data().Q2.rDf,
                    rOf:doc.data().Q2.rOf,
                    rT:(doc.data().Q2.rDf + doc.data().Q2.rOf),
                    As:doc.data().Q2.As,
                    St:doc.data().Q2.St,
                    Bl:doc.data().Q2.Bl,
                    TO:doc.data().Q2.TO,
                    Fo:doc.data().Q2.Fo
                }
                arrayQ2.push(jugadorJSON)
                totalQ2= {
                    numero: "##",
                    nombre: "TOTAL",
                    pts:(Q2_twoM*2) + ( Q2_thrM*3) + (Q2_ftM),
                    fgM: (Q2_twoM + Q2_thrM),
                    fgA: (Q2_twoA + Q2_twoA),
                    fgP: ((Q2_twoM + Q2_thrM)/( Q2_twoA + Q2_thrA)*100).toFixed(1),
                    thrM: Q2_thrM,
                    thrA: Q2_thrA,
                    thrP: ((Q2_thrM/Q2_thrA)*100).toFixed(1),
                    ftM: Q2_ftM,
                    ftA: Q2_ftA,
                    ftP: ((Q2_ftM/Q2_ftA)*100).toFixed(1),
                    rDf: Q2_rDf,
                    rOf: Q2_rOf,
                    rT:Q2_rDf+Q2_rOf,
                    As: Q2_As,
                    St: Q2_St,
                    Bl: Q2_Bl,
                    TO: Q2_TO,
                    Fo: Q2_Fo
                }
                teamQ2.pop()
                teamQ2.push(totalQ2)
            })
        })
    })
})

// Creación de arrayQ3
Q3_twoM=0, Q3_twoA=0, Q3_thrM=0, Q3_thrA=0, Q3_ftM=0, Q3_ftA=0, Q3_rDf=0, Q3_rOf=0, Q3_As=0, Q3_St=0, Q3_Bl=0, Q3_TO=0, Q3_Fo=0
matchData.collection("jugadores").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        matchData.get().then(function(equipo){
            firestore.doc(`equipos/${equipo.data().Equipo}/jugadores/${doc.id}`).get().then(function(jugador){
                Q3_twoM+=doc.data().Q3.twoM
                Q3_twoA+=doc.data().Q3.twoA
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
                jugadorJSON = {
                    id: jugador.id,
                    numero: jugador.data().numero,
                    nombre: jugador.data().nombre,
                    pts:(doc.data().Q3.twoM*2) + (doc.data().Q3.thrM*3) + (doc.data().Q3.ftM),
                    fgM:(doc.data().Q3.twoM + doc.data().Q3.thrM),
                    fgA:(doc.data().Q3.twoA+ doc.data().Q3.thrA),
                    fgP:((doc.data().Q3.twoM + doc.data().Q3.thrM)/(doc.data().Q3.twoA+ doc.data().Q3.thrA)*100).toFixed(1),
                    thrM:doc.data().Q3.thrM,
                    thrA:doc.data().Q3.thrA,
                    thrP:((doc.data().Q3.thrM/doc.data().Q3.thrA)*100).toFixed(1),
                    ftM:doc.data().Q3.ftM,
                    ftA:doc.data().Q3.ftA,
                    ftP:((doc.data().Q3.ftM/doc.data().Q3.ftA)*100).toFixed(1),
                    rDf:doc.data().Q3.rDf,
                    rOf:doc.data().Q3.rOf,
                    rT:(doc.data().Q3.rDf + doc.data().Q3.rOf),
                    As:doc.data().Q3.As,
                    St:doc.data().Q3.St,
                    Bl:doc.data().Q3.Bl,
                    TO:doc.data().Q3.TO,
                    Fo:doc.data().Q3.Fo
                }
                arrayQ3.push(jugadorJSON)
                totalQ3= {
                    numero: "##",
                    nombre: "TOTAL",
                    pts:(Q3_twoM*2) + ( Q3_thrM*3) + (Q3_ftM),
                    fgM: (Q3_twoM + Q3_thrM),
                    fgA: (Q3_twoA + Q3_twoA),
                    fgP: ((Q3_twoM + Q3_thrM)/( Q3_twoA + Q3_thrA)*100).toFixed(1),
                    thrM: Q3_thrM,
                    thrA: Q3_thrA,
                    thrP: ((Q3_thrM/Q3_thrA)*100).toFixed(1),
                    ftM: Q3_ftM,
                    ftA: Q3_ftA,
                    ftP: ((Q3_ftM/Q3_ftA)*100).toFixed(1),
                    rDf: Q3_rDf,
                    rOf: Q3_rOf,
                    rT:Q3_rDf+Q3_rOf,
                    As: Q3_As,
                    St: Q3_St,
                    Bl: Q3_Bl,
                    TO: Q3_TO,
                    Fo: Q3_Fo
                }
                teamQ3.pop()
                teamQ3.push(totalQ3)
            })
        })
    })
})

// Creación de arrayQ4
Q4_twoM=0, Q4_twoA=0, Q4_thrM=0, Q4_thrA=0, Q4_ftM=0, Q4_ftA=0, Q4_rDf=0, Q4_rOf=0, Q4_As=0, Q4_St=0, Q4_Bl=0, Q4_TO=0, Q4_Fo=0
matchData.collection("jugadores").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        matchData.get().then(function(equipo){
            firestore.doc(`equipos/${equipo.data().Equipo}/jugadores/${doc.id}`).get().then(function(jugador){
                Q4_twoM+=doc.data().Q4.twoM
                Q4_twoA+=doc.data().Q4.twoA
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
                jugadorJSON = {
                    id: jugador.id,
                    numero: jugador.data().numero,
                    nombre: jugador.data().nombre,
                    pts:(doc.data().Q4.twoM*2) + (doc.data().Q4.thrM*3) + (doc.data().Q4.ftM),
                    fgM:(doc.data().Q4.twoM + doc.data().Q4.thrM),
                    fgA:(doc.data().Q4.twoA+ doc.data().Q4.thrA),
                    fgP:((doc.data().Q4.twoM + doc.data().Q4.thrM)/(doc.data().Q4.twoA+ doc.data().Q4.thrA)*100).toFixed(1),
                    thrM:doc.data().Q4.thrM,
                    thrA:doc.data().Q4.thrA,
                    thrP:((doc.data().Q4.thrM/doc.data().Q4.thrA)*100).toFixed(1),
                    ftM:doc.data().Q4.ftM,
                    ftA:doc.data().Q4.ftA,
                    ftP:((doc.data().Q4.ftM/doc.data().Q4.ftA)*100).toFixed(1),
                    rDf:doc.data().Q4.rDf,
                    rOf:doc.data().Q4.rOf,
                    rT:(doc.data().Q4.rDf + doc.data().Q4.rOf),
                    As:doc.data().Q4.As,
                    St:doc.data().Q4.St,
                    Bl:doc.data().Q4.Bl,
                    TO:doc.data().Q4.TO,
                    Fo:doc.data().Q4.Fo
                }
                arrayQ4.push(jugadorJSON)
                totalQ4= {
                    numero: "##",
                    nombre: "TOTAL",
                    pts:(Q4_twoM*2) + ( Q4_thrM*3) + (Q4_ftM),
                    fgM: (Q4_twoM + Q4_thrM),
                    fgA: (Q4_twoA + Q4_twoA),
                    fgP: ((Q4_twoM + Q4_thrM)/( Q4_twoA + Q4_thrA)*100).toFixed(1),
                    thrM: Q4_thrM,
                    thrA: Q4_thrA,
                    thrP: ((Q4_thrM/Q4_thrA)*100).toFixed(1),
                    ftM: Q4_ftM,
                    ftA: Q4_ftA,
                    ftP: ((Q4_ftM/Q4_ftA)*100).toFixed(1),
                    rDf: Q4_rDf,
                    rOf: Q4_rOf,
                    rT:Q4_rDf+Q4_rOf,
                    As: Q4_As,
                    St: Q4_St,
                    Bl: Q4_Bl,
                    TO: Q4_TO,
                    Fo: Q4_Fo
                }
                teamQ4.pop()
                teamQ4.push(totalQ4)
            })
        })
    })
})

// Creación de arrayOT
// OT_twoM=0, OT_twoA=0, OT_thrM=0, OT_thrA=0, OT_ftM=0, OT_ftA=0, OT_rDf=0, OT_rOf=0, OT_As=0, OT_St=0, OT_Bl=0, OT_TO=0, OT_Fo=0
// matchData.collection("jugadores").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         matchData.get().then(function(equipo){
//             firestore.doc(`equipos/${equipo.data().Equipo}/jugadores/${doc.id}`).get().then(function(jugador){
//                 OT_twoM+=doc.data().OT.twoM
//                 OT_twoA+=doc.data().OT.twoA
//                 OT_thrM+=doc.data().OT.thrM
//                 OT_thrA+=doc.data().OT.thrA
//                 OT_ftM+=doc.data().OT.ftM
//                 OT_ftA+=doc.data().OT.ftA
//                 OT_rDf+=doc.data().OT.rDf
//                 OT_rOf+=doc.data().OT.rOf
//                 OT_As+=doc.data().OT.As
//                 OT_St+=doc.data().OT.St
//                 OT_Bl+=doc.data().OT.Bl
//                 OT_TO+=doc.data().OT.TO
//                 OT_Fo+=doc.data().OT.Fo
//                 jugadorJSON = {
//                     id: jugador.id,
//                     numero: jugador.data().numero,
//                     nombre: jugador.data().nombre,
//                     pts:(doc.data().OT.twoM*2) + (doc.data().OT.thrM*3) + (doc.data().OT.ftM),
//                     fgM:(doc.data().OT.twoM + doc.data().OT.thrM),
//                     fgA:(doc.data().OT.twoA+ doc.data().OT.thrA),
//                     fgP:((doc.data().OT.twoM + doc.data().OT.thrM)/(doc.data().OT.twoA+ doc.data().OT.thrA)*100).toFixed(1),
//                     thrM:doc.data().OT.thrM,
//                     thrA:doc.data().OT.thrA,
//                     thrP:((doc.data().OT.thrM/doc.data().OT.thrA)*100).toFixed(1),
//                     ftM:doc.data().OT.ftM,
//                     ftA:doc.data().OT.ftA,
//                     ftP:((doc.data().OT.ftM/doc.data().OT.ftA)*100).toFixed(1),
//                     rDf:doc.data().OT.rDf,
//                     rOf:doc.data().OT.rOf,
//                     rT:(doc.data().OT.rDf + doc.data().OT.rOf),
//                     As:doc.data().OT.As,
//                     St:doc.data().OT.St,
//                     Bl:doc.data().OT.Bl,
//                     TO:doc.data().OT.TO,
//                     Fo:doc.data().OT.Fo
//                 }
//                 arrayOT.push(jugadorJSON)
//                 totalOT= {
//                     numero: "##",
//                     nombre: "TOTAL",
//                     pts:(OT_twoM*2) + ( OT_thrM*3) + (OT_ftM),
//                     fgM: (OT_twoM + OT_thrM),
//                     fgA: (OT_twoA + OT_twoA),
//                     fgP: ((OT_twoM + OT_thrM)/( OT_twoA + OT_thrA)*100).toFixed(1),
//                     thrM: OT_thrM,
//                     thrA: OT_thrA,
//                     thrP: ((OT_thrM/OT_thrA)*100).toFixed(1),
//                     ftM: OT_ftM,
//                     ftA: OT_ftA,
//                     ftP: ((OT_ftM/OT_ftA)*100).toFixed(1),
//                     rDf: OT_rDf,
//                     rOf: OT_rOf,
//                     rT: OT_rDf+OT_rOf,
//                     As: OT_As,
//                     St: OT_St,
//                     Bl: OT_Bl,
//                     TO: OT_TO,
//                     Fo: OT_Fo
//                 }
//                 teamOT.pop()
//                 teamOT.push(totalOT)
//             })
//         })
//     })
// })

$(document).ready(function(){
    $("#final").change(function(){
        $("#myGrid").html(``)
        displayScore("Final")
        displayTable(arrayPartido, total)
    })
    $("#q1").change(function(){
        $("#myGrid").html(``)
        displayScore("Q1")
        displayTable(arrayQ1, teamQ1)
    })
    $("#q2").change(function(){
        $("#myGrid").html(``)
        displayScore("Q2")
        displayTable(arrayQ2, teamQ2)
    })
    $("#q3").change(function(){
        $("#myGrid").html(``)
        displayScore("Q3")
        displayTable(arrayQ3, teamQ3)
    })
    $("#q4").change(function(){
        $("#myGrid").html(``)
        displayScore("Q4")
        displayTable(arrayQ4, teamQ4)
    })
    $("#ot").change(function(){
        $("#myGrid").html(``)
        displayScore("OT")
        displayTable(arrayOT, teamOT) 
    })
    $("#btn-save").click(function(){
        saveChanges()
    })  
    displayTable(arrayPartido, total);  
})