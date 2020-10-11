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
statsJSON ={}
let scoreA = 0;
let scoreB = 0;
let teamSelector ="";
let lastAction = {"Action":"","Author":"","Chained":""}
let matchData = firestore.doc(`ligas/all/${localStorage.getItem("Liga")}/${localStorage.getItem("ID")}`)
// let playersData = firestore.doc(`ligas/all/${localStorage.getItem("Liga")}/${localStorage.getItem("ID")}/jugadores/${lastAction.Author}`)
let partidoInfo
let cuarto = "Q1"
let nombreJugador



// Load match data
matchData.get().then(function(doc) {
    if (doc.exists) {
        $("#team-a").text(doc.data().Equipo)
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
// ./load match data






// Declared Functions

function sendToStorage(){
    localStorage.setItem("Action", lastAction.Action);
    localStorage.setItem("Author", lastAction.Author);
    localStorage.setItem("Chained", lastAction.Chained);
}
function saveToDB(){
    matchData.update({
        "jugadores":{
            [lastAction.Author]:{
                [cuarto]:{
                    [lastAction.Action]: partido[lastAction.Author][cuarto][lastAction.Action.toString()]++
                }
            }
        } 
    })
}

function updatePartido(){
    matchData.get().then(function(doc) {
        if (doc.exists) {
            partido = doc.data()
        } else {
            console.log("No such match!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
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
        teamSelector="A";
        $(".stats-tables").show();
        $(".otherstats-table").show();
        $(".btn_undoRival").hide()
        $(".players-table").hide();
    })
    $(".btn_rival").click(function(){
        teamSelector="B";
        lastAction.Author = "B"
        $(".stats-tables").show();
        $(".btn_undoRival").show();
        $(".otherstats-table").hide();
        $(".players-table").hide();
    })
    $(".btn_stats").click(function(){
        $(".stats-tables").hide();
        $(".players-table").show();
    })
    $(".btn_points").click(function(){
        if(teamSelector=="B"){
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
        $(".assist-table").hide();
        $(".players-table").show();
    })
    $(".btn_undoRival").click(function(){

        $(".stats-tables").hide();
        $(".players-table").show();
    })
    //UNDO
    $("#undo").click(function(){
        teamSelector ="";
        lastAction.Author ="";
        lastAction.Action ="";
        lastAction.Chained ="";
    })
    $("#undoRival").click(function(){
        teamSelector ="";
        lastAction.Author ="";
        lastAction.Author ="";
        lastAction.Action ="";
        lastAction.Chained ="";
    })

    $("#undo-action").click(function(){
        console.log(lastAction);
        if(lastAction.Author=="B"){
            scoreB -= lastAction.Action;
            $("#score-b").text(scoreB);
        }else{
            scoreA -= lastAction.Action;
            $("#score-a").text(scoreA);
        }
        teamSelector ="";
        lastAction.Action="";
        lastAction.Author="";
        lastAction.Chained="";
        sendToStorage()
    })


    // POINTS
    $("#ft-made").click(function(){
        lastAction.Action="1"
        sendToStorage()
        saveToDB()
        if(teamSelector == "A"){
            scoreA++
            $("#score-a").text(scoreA)
            teamSelector="";
        }
        if (teamSelector =="B"){
            scoreB++
            $("#score-b").text(scoreB)
            teamSelector="";
            sendToStorage()
        }
    })
    $("#ft-miss").click(function(){
        lastAction.Action="1-miss"
        sendToStorage()
    })
   
    $("#2pt-made").click(function(){
        lastAction.Action="2"
        if(teamSelector == "A"){
            scoreA+=2;
            $("#score-a").text(scoreA)
            teamSelector="";
            
            sendToStorage()
        }
        if (teamSelector =="B"){
            scoreB+=2;
            $("#score-b").text(scoreB)
            teamSelector="";
            sendToStorage()
        }
    })
    $("#2pt-miss").click(function(){
        lastAction.Action="2-miss"
        
        sendToStorage()
    })
   
    $("#3pt-made").click(function(){
        lastAction.Action="3"
        if(teamSelector == "A"){
            scoreA+=3;
            $("#score-a").text(scoreA)
            teamSelector="";
            
            sendToStorage()
        }
        if (teamSelector =="B"){
            scoreB+=3;
            $("#score-b").text(scoreB)
            teamSelector="";
            sendToStorage()
        }
    })
    $("#3pt-miss").click(function(){
        lastAction.Action="3-miss"
        
        sendToStorage()
    })
    
    // OTHER STATS
    $("#reb-def").click(function(){
        lastAction.Action="reb-def"
        
    })
    $("#reb-off").click(function(){
        lastAction.Action="reb-off"
        
    })
    $("#steal").click(function(){
        lastAction.Action="steal"
        
    })
    $("#TO").click(function(){
        lastAction.Action="TO"
        
    })
    $("#block").click(function(){
        lastAction.Action="block"
        
    })
    $("#foul").click(function(){
        lastAction.Action="foul"
        
    })
    $("#assist").click(function(){
        lastAction.Action="assist"
        
    })

    // PLAYERS
    $("#p1").click(function(){
        lastAction.Author="1";
    })
    $("#p2").click(function(){
        lastAction.Author="2";
    })
    $("#p3").click(function(){
        lastAction.Author="3";
    })
    $("#p4").click(function(){
        lastAction.Author="4";
    })
    $("#p5").click(function(){
        lastAction.Author="5";
    })
    $("#p6").click(function(){
        lastAction.Author="6";
    })
    $("#p7").click(function(){
        lastAction.Author="7";
    })
    $("#p8").click(function(){
        lastAction.Author="8";
    })
    $("#p9").click(function(){
        lastAction.Author="9";
    })
    $("#p10").click(function(){
        lastAction.Author="10";
    })
    $("#p11").click(function(){
        lastAction.Author="11";
    })
    $("#p12").click(function(){
        lastAction.Author="12";
    })
    $("#p13").click(function(){
        lastAction.Author="13";
    })
    $("#p14").click(function(){
        lastAction.Author="14";
    })
    $("#p15").click(function(){
        lastAction.Author="15";
    })

    // PLAYERS-ASSIST
    $("#assist-p1").click(function(){
        lastAction.Chained="1";
        statsJSON[0].As++
        sendToStorage()
    })
    $("#assist-p2").click(function(){
        lastAction.Chained="2";
        statsJSON[1].As++
        sendToStorage()
    })
    $("#assist-p3").click(function(){
        lastAction.Chained="3";
        statsJSON[2].As++
        sendToStorage()
    })
    $("#assist-p4").click(function(){
        lastAction.Chained="4";
        statsJSON[3].As++
        sendToStorage()
    })
    $("#assist-p5").click(function(){
        lastAction.Chained="5";
        statsJSON[4].As++
        sendToStorage()
    })
    $("#assist-p6").click(function(){
        lastAction.Chained="6";
        statsJSON[5].As++
        sendToStorage()
    })
    $("#assist-p7").click(function(){
        lastAction.Chained="7";
        statsJSON[6].As++
        sendToStorage()
    })
    $("#assist-p8").click(function(){
        lastAction.Chained="8";
        statsJSON[7].As++
        sendToStorage()
    })
    $("#assist-p9").click(function(){
        lastAction.Chained="9";
        statsJSON[8].As++
        sendToStorage()
    })
    $("#assist-p10").click(function(){
        lastAction.Chained="10";
        statsJSON[9].As++
        sendToStorage()
    })
    $("#assist-p11").click(function(){
        lastAction.Chained="11";
        statsJSON[10].As++
        sendToStorage()
    })
    $("#assist-p12").click(function(){
        lastAction.Chained="12";
        statsJSON[11].As++
        sendToStorage()
    })
    $("#assist-p13").click(function(){
        lastAction.Chained="13";
        statsJSON[12].As++
        sendToStorage()
    })
    $("#assist-p14").click(function(){
        lastAction.Chained="14";
        statsJSON[13].As++
        sendToStorage()
    })
    $("#assist-p15").click(function(){
        lastAction.Chained="15";
        statsJSON[14].As++
        sendToStorage()
  })


});