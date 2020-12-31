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
let lastAction = {"Action":"","Author":"","Chained":"","Cuarto":""}
let matchData = firestore.doc(`ligas/${localStorage.getItem("Liga")}/partidos/${localStorage.getItem("ID")}`)
let partidoInfo
let partido
let cuarto = "Q1"
let nombreJugador


// Load match data
matchData.get().then(function(doc) {
    if (doc.exists) {
        $("#team-a").text(doc.data().Equipo.split("_")[0])
        $("#team-b").text(doc.data().Rival)
        matchData.collection("jugadores").get().then(function(querySnapshot) {
            i=-1
            cont=1
            querySnapshot.forEach(function() {
                i++
                firestore.doc(`equipos/${doc.data().Equipo}/jugadores/${querySnapshot.docs[i].id}`).get().then(function(x){
                    $(`#p${cont}`).text(x.data().nombre);             
                    $(`#p${cont}`).attr("value", x.id);
                    $(`#p${cont}`).attr('disabled', false);
                    $(`#assist-p${cont}`).text(x.data().nombre);             
                    $(`#assist-p${cont}`).attr("value", x.id);
                    $(`#assist-p${cont}`).attr('disabled', false);
                    assist-p1
                    cont++
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
            });
        });
        partidoInfo = doc.data() 
    } else {
        console.log("No such match!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
matchData.onSnapshot(function(doc) {
    $("#score-a").text(doc.data().score)
    $("#score-b").text(doc.data().scoreRival)
});
// ./load match data

// Declared Functions
function updateScore(equipo, puntos){
    if(equipo=="A"){
        matchData.update({
            score:firebase.firestore.FieldValue.increment(puntos)
        })
    }else{
        matchData.update({
            scoreRival:firebase.firestore.FieldValue.increment(puntos)
        })
    }
}
function sendToStorage(){
    localStorage.setItem("Action", lastAction.Action);
    localStorage.setItem("Author", lastAction.Author);
    localStorage.setItem("Chained", lastAction.Chained);
    localStorage.setItem("Cuarto", lastAction.Cuarto);
    lastAction.Author ="";
    lastAction.Action ="";
    lastAction.Chained ="";
    lastAction.Cuarto ="";
}
function saveToDB(x){
    if(localStorage.Action == "ftM" ||localStorage.Action == "twoM" ||localStorage.Action == "thrM" ){
        matchData.collection("jugadores").doc(localStorage.Author).update({
            [`${localStorage.Cuarto}.${localStorage.Action.replace("M","A")}`]: firebase.firestore.FieldValue.increment(x)
        })
    }
    if(localStorage.Chained != ""){
        matchData.collection("jugadores").doc(localStorage.Chained).update({
            [`${localStorage.Cuarto}.As`]: firebase.firestore.FieldValue.increment(x)
        })
    }
    matchData.collection("jugadores").doc(localStorage.Author).update({
        [`${localStorage.Cuarto}.${localStorage.Action}`]: firebase.firestore.FieldValue.increment(x)
    })
}
function clearLocalStorage(){
    localStorage.removeItem("Action");
    localStorage.removeItem("Author");
    localStorage.removeItem("Chained");
    localStorage.removeItem("Cuarto");
}
clearLocalStorage()
function habilitarBtnAssist(id){
    $(`button[value='${id}']`).attr('disabled', false);
}
// ./Declared Functions


$(document).ready(function(){

    $("#q1").change(function(){
        cuarto = "Q1"
    })
    $("#q2").change(function(){
        cuarto = "Q2"
    })
    $("#q3").change(function(){
        cuarto = "Q3"
    })
    $("#q4").change(function(){
        cuarto = "Q4"
    })
    $("#ot").change(function(){
        cuarto = "OT"
    })

    $(".btn_player").click(function(){
        $(".stats-tables").show();
        $(".otherstats-table").show();
        $(".rival-miss").show();
        $(".btn_undoRival").hide()
        $(".players-table").hide();
    })
    $(".btn_rival").click(function(){
        lastAction.Author = "B"
        $(".stats-tables").show();
        $(".btn_undoRival").show();
        $(".rival-miss").hide();
        $(".otherstats-table").hide();
        $(".players-table").hide();
    })
    $(".btn_stats").click(function(){
        $(".stats-tables").hide();
        $(".players-table").show();
    })
    $(".btn_points").click(function(){
        if(lastAction.Author=="B"){
            $(".stats-tables").hide();
            $(".players-table").show();
        }else{
            $(".stats-tables").hide();
            $(".assist-table").show(); 
        }

    })
    $(".btn_assist_player").click(function(){
        $(".assist-table").hide();
        $(".players-table").show();
    })
    $(".btn_nadie").click(function(){
        habilitarBtnAssist(lastAction.Author)
        sendToStorage()
        saveToDB(1)
        $(".assist-table").hide();
        $(".players-table").show();
    })
    $(".btn_undoRival").click(function(){

        $(".stats-tables").hide();
        $(".players-table").show();
    })
    //UNDO
    $("#undo").click(function(){
        habilitarBtnAssist(lastAction.Author)
        lastAction.Author ="";
        lastAction.Action ="";
        lastAction.Chained ="";
        lastAction.Cuarto ="";
    })
    $("#undoRival").click(function(){
        lastAction.Author ="";
        lastAction.Action ="";
        lastAction.Chained ="";
        lastAction.Cuarto ="";
    })
    $("#undo-action").click(function(){
        let puntos
        switch (localStorage.Action){
            case "ftM":
                puntos =-1;
                break;
            case "twoM":
                puntos =-2;
                break;
            case "thrM":
                puntos =-3;
                break;
            default:
                puntos =0;
                break;
        }
        if(localStorage.Author=="B"){
            updateScore("B", puntos)
        }else{
            updateScore("A", puntos)
            saveToDB(-1)
            }
        lastAction.Action="";
        lastAction.Author="";
        lastAction.Chained="";
        lastAction.Cuarto="";
        sendToStorage()
    })

    // POINTS
    $("#ft-made").click(function(){
        lastAction.Action="ftM"
        lastAction.Cuarto=cuarto
        if (lastAction.Author =="B"){
            updateScore("B",1)
        }else{
            updateScore("A",1)
            saveToDB(1)
        }
        sendToStorage()
    })
    $("#ft-miss").click(function(){
        lastAction.Action="ftA"
        lastAction.Cuarto=cuarto
        sendToStorage()
        saveToDB(1)
    })
   
    $("#2pt-made").click(function(){
        lastAction.Action="twoM"
        lastAction.Cuarto=cuarto
        if (lastAction.Author =="B"){
            updateScore("B",2)
        }else{
            updateScore("A",2)
        }
    })
    $("#2pt-miss").click(function(){
        lastAction.Action="twoA"
        lastAction.Cuarto=cuarto
        sendToStorage()
        saveToDB(1)
    })
   
    $("#3pt-made").click(function(){
        lastAction.Action="thrM"
        lastAction.Cuarto=cuarto
        if (lastAction.Author =="B"){
            updateScore("B",3)
        }else{
            updateScore("A",3)
        }
    })
    $("#3pt-miss").click(function(){
        lastAction.Action="thrA"
        lastAction.Cuarto=cuarto
        sendToStorage()
        saveToDB(1)
    })
    
    // OTHER STATS
    $("#reb-def").click(function(){
        lastAction.Action="rDf"
        lastAction.Cuarto=cuarto
        sendToStorage()
        saveToDB(1)  
    })
    $("#reb-off").click(function(){
        lastAction.Action="rOf"
        lastAction.Cuarto=cuarto
        sendToStorage()
        saveToDB(1)  
    })
    $("#steal").click(function(){
        lastAction.Action="St"
        lastAction.Cuarto=cuarto
        sendToStorage()
        saveToDB(1)   
    })
    $("#TO").click(function(){
        lastAction.Action="TO"
        lastAction.Cuarto=cuarto
        sendToStorage()
        saveToDB(1)  
    })
    $("#block").click(function(){
        lastAction.Action="Bl"
        lastAction.Cuarto=cuarto
        sendToStorage()
        saveToDB(1) 
    })
    $("#foul").click(function(){
        lastAction.Action="Fo"
        lastAction.Cuarto=cuarto
        sendToStorage()
        saveToDB(1)
    })
    $("#assist").click(function(){
        lastAction.Action="As"
        lastAction.Cuarto=cuarto
        sendToStorage()
        saveToDB(1) 
    })

    // PLAYERS
    $("#p1").click(function(){
        lastAction.Author= $("#p1").attr("value");
        $("#assist-p1").attr('disabled', true);
    })
    $("#p2").click(function(){
        lastAction.Author=$("#p2").attr("value");
        $("#assist-p2").attr('disabled', true);
    })
    $("#p3").click(function(){
        lastAction.Author=$("#p3").attr("value");
    })
    $("#p4").click(function(){
        lastAction.Author=$("#p4").attr("value");
    })
    $("#p5").click(function(){
        lastAction.Author=$("#p5").attr("value");
    })
    $("#p6").click(function(){
        lastAction.Author=$("#p6").attr("value");
    })
    $("#p7").click(function(){
        lastAction.Author=$("#p7").attr("value");
    })
    $("#p8").click(function(){
        lastAction.Author=$("#p8").attr("value");
    })
    $("#p9").click(function(){
        lastAction.Author=$("#p9").attr("value");
    })
    $("#p10").click(function(){
        lastAction.Author=$("#p10").attr("value");
    })
    $("#p11").click(function(){
        lastAction.Author=$("#p11").attr("value");
    })
    $("#p12").click(function(){
        lastAction.Author=$("#p12").attr("value");
    })
    $("#p13").click(function(){
        lastAction.Author=$("#p13").attr("value");
    })
    $("#p14").click(function(){
        lastAction.Author=$("#p14").attr("value");
    })
    $("#p15").click(function(){
        lastAction.Author=$("#p15").attr("value");
    })

    // PLAYERS-ASSIST
    $("#assist-p1").click(function(){
        lastAction.Chained=$("#p1").attr("value");
        habilitarBtnAssist(lastAction.Author)
        sendToStorage()
        saveToDB(1)
    })
    $("#assist-p2").click(function(){
        lastAction.Chained=$("#p2").attr("value");
        habilitarBtnAssist(lastAction.Author)
        sendToStorage()
        saveToDB(1)
    })
    $("#assist-p3").click(function(){
        lastAction.Chained=$("#p3").attr("value");
        habilitarBtnAssist(lastAction.Author)
        sendToStorage()
        saveToDB(1)
    })
    $("#assist-p4").click(function(){
        lastAction.Chained=$("#p4").attr("value");
        habilitarBtnAssist(lastAction.Author)
        sendToStorage()
        saveToDB(1)
    })
    $("#assist-p5").click(function(){
        lastAction.Chained=$("#p5").attr("value");
        habilitarBtnAssist(lastAction.Author)
        sendToStorage()
        saveToDB(1)
    })
    $("#assist-p6").click(function(){
        lastAction.Chained=$("#p6").attr("value");
        habilitarBtnAssist(lastAction.Author)
        sendToStorage()
        saveToDB(1)
    })
    $("#assist-p7").click(function(){
        lastAction.Chained=$("#p7").attr("value");
        habilitarBtnAssist(lastAction.Author)
        sendToStorage()
        saveToDB(1)
    })
    $("#assist-p8").click(function(){
        lastAction.Chained=$("#p0").attr("value");
        habilitarBtnAssist(lastAction.Author)
        sendToStorage()
        saveToDB(1)
    })
    $("#assist-p9").click(function(){
        lastAction.Chained=$("#p9").attr("value");
        habilitarBtnAssist(lastAction.Author)
        sendToStorage()
        saveToDB(1)
    })
    $("#assist-p10").click(function(){
        lastAction.Chained=$("#p10").attr("value");
        habilitarBtnAssist(lastAction.Author)
        sendToStorage()
        saveToDB(1)
    })
    $("#assist-p11").click(function(){
        lastAction.Chained=$("#p11").attr("value");
        habilitarBtnAssist(lastAction.Author)
        sendToStorage()
        saveToDB(1)
    })
    $("#assist-p12").click(function(){
        lastAction.Chained=$("#p12").attr("value");
        habilitarBtnAssist(lastAction.Author)
        sendToStorage()
        saveToDB(1)
    })
    $("#assist-p13").click(function(){
        lastAction.Chained=$("#p13").attr("value");
        habilitarBtnAssist(lastAction.Author)
        sendToStorage()
        saveToDB(1)
    })
    $("#assist-p14").click(function(){
        lastAction.Chained=$("#p14").attr("value");
        habilitarBtnAssist(lastAction.Author)
        sendToStorage()
        saveToDB(1)
    })
    $("#assist-p15").click(function(){
        lastAction.Chained=$("#p15").attr("value");
        habilitarBtnAssist(lastAction.Author)
        sendToStorage()
        saveToDB(1)
  })
});