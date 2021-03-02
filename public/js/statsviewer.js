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


localStorage = window.localStorage;
let torneo = document.querySelector("#selector-torneo");
let equipo = document.querySelector("#selector-equipo");
let currentTorneo
let currentPartido
let arrayJugadores = []
let total = []
team_twoM = 0
team_twoA = 0
team_thrM = 0
team_thrA = 0
team_ftM = 0
team_ftA = 0
team_rDf = 0
team_rOf = 0
team_As = 0
team_St = 0
team_Bl = 0
team_TO = 0
team_Fo = 0

function obtenerFiltros() {
    firestore.collection("torneos").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            $("#selector-torneo").append(`<option value="${doc.id}">${doc.data().nombre}</option>`)
        });
    });
    firestore.collection("equipos").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            $("#selector-equipo").append(`<option value="${doc.id}">${doc.data().nombre}</option>`)
        });
    });
}

function displayTable() {
    // specify the columns
    var columnDefs = [{
            headerName: "#",
            field: "numero",
            width: 80,
            sortable: true,
            lockPosition: true
        },
        {
            headerName: "Nombre",
            field: "nombre",
            width: 200,
            resizable: true,
            sortable: true,
            filter: true,
            lockPosition: true
        },
        {
            headerName: "Estatura",
            field: "height",
            width: 100,
            sortable: true,
            lockPosition: true
        },
        {
            headerName: "Peso",
            field: "weight",
            width: 100,
            sortable: true,
            lockPosition: true
        },
        {
            headerName: "Fecha de nacimiento",
            field: "birthday",
            width: 200,
            sortable: true,
            lockPosition: true
        },
        {
            headerName: "Edad",
            field: "age",
            width: 100,
            sortable: true,
            lockPosition: true
        },
    ];
    // let the grid know which columns and what data to use
    var gridOptions = {
        columnDefs: columnDefs,
        rowData: arrayJugadores,
        rowStyle: {
            "font-size": "14px"
        },
    };
    // lookup the container we want the Grid to use
    var eGridDiv = document.querySelector('#myGrid');
    // create the grid passing in the div to use together with the columns & data we want to use
    new agGrid.Grid(eGridDiv, gridOptions);
}

function displayTotals() {
    // specify the columns
    var columnDefs = [{
            headerName: "PTS",
            field: "pts",
            width: 70,
            lockPosition: true
        },
        {
            headerName: "FGM",
            field: "fgM",
            width: 70,
            lockPosition: true
        },
        {
            headerName: "FGA",
            field: "fgA",
            width: 70,
            lockPosition: true
        },
        {
            headerName: "FG%",
            field: "fgP",
            width: 70,
            lockPosition: true
        },
        {
            headerName: "3PM",
            field: "thrM",
            width: 70,
            lockPosition: true
        },
        {
            headerName: "3PA",
            field: "thrA",
            width: 70,
            lockPosition: true
        },
        {
            headerName: "3P%",
            field: "thrP",
            width: 70,
            lockPosition: true
        },
        {
            headerName: "FTM",
            field: "ftM",
            width: 70,
            lockPosition: true
        },
        {
            headerName: "FTA",
            field: "ftA",
            width: 70,
            lockPosition: true
        },
        {
            headerName: "FT%",
            field: "ftP",
            width: 70,
            lockPosition: true
        },
        {
            headerName: "OREB",
            field: "rOf",
            width: 70,
            lockPosition: true
        },
        {
            headerName: "DREB",
            field: "rDf",
            width: 70,
            lockPosition: true
        },
        {
            headerName: "REB",
            field: "rT",
            width: 70,
            lockPosition: true
        },
        {
            headerName: "AST",
            field: "As",
            width: 70,
            lockPosition: true
        },
        {
            headerName: "TOV",
            field: "TO",
            width: 70,
            lockPosition: true
        },
        {
            headerName: "STL",
            field: "St",
            width: 70,
            lockPosition: true
        },
        {
            headerName: "BLK",
            field: "Bl",
            width: 70,
            lockPosition: true
        },
        {
            headerName: "PF",
            field: "Fo",
            width: 70,
            lockPosition: true
        },
    ];
    // let the grid know which columns and what data to use
    var gridOptions = {
        columnDefs: columnDefs,
        rowData: total
    };

    // lookup the container we want the Grid to use
    var TotalsDiv = document.querySelector('#team-totals');
    // create the grid passing in the div to use together with the columns & data we want to use
    new agGrid.Grid(TotalsDiv, gridOptions);
}

function filtrar() {
    let wins=0
    let loses=0
    let draws =0
    let totalPoints=0
    let numeroPartidos = 0
    
    // Obtener promedios de temporada
    firestore.collection("equipos").doc(equipo.value).get().then(function (equipo) {
        $("#team-name").text(equipo.data().nombre);
    })
    
    firestore.collection("torneos").doc(torneo.value).collection("partidos").get().then(function(querySnapshot){
        querySnapshot.forEach(function(partido){
            if(partido.data().Score["Final"] > partido.data().ScoreRival["Final"]){
                wins++
            } else{
                if(partido.data().Score["Final"] < partido.data().ScoreRival["Final"]){
                    loses++
                }else{
                    draws++
                }
            }
            totalPoints = parseInt(partido.data().Score.Final)
            totalPointsRival = parseInt(partido.data().ScoreRival.Final)
            numeroPartidos++
        })
    })
    setTimeout(function () {
        $("#team-record").text(wins+"-"+loses);
        $("#team-ppg").text((totalPoints/numeroPartidos).toFixed(1));
        $("#team-rpg").text((totalRebounds/numeroPartidos).toFixed(1));
        $("#team-apg").text((totalAsists/numeroPartidos).toFixed(1));
        $("#team-oppg").text((totalPointsRival/numeroPartidos).toFixed(1));
    }, 2000)


    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.PieChart);
    var title = chart.titles.create();
    title.text = "Tipo de canasta"
    title.fontSize = 25;
    // Create pie series
    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "%";
    series.dataFields.category = "canasta";
    // And, for a good measure, let's add a legend
    chart.legend = new am4charts.Legend();

    let matchData = firestore.collection("torneos").doc(torneo.value).collection("partidos")

    matchData.get().then(function (partidoQuerySnapshot) {
        partidoQuerySnapshot.forEach(function (partido) {
            matchData.doc(partido.id).collection("jugadores").get().then(function (querySnapshot) {
                // Create chart instance
                var chart2 = am4core.create("chartdiv2", am4charts.XYChart);
                chart2.marginRight = 400;
                var title2 = chart2.titles.create();
                title2.text = "Historial de anotación por partido"
                title2.fontSize = 25;
                
                // Create axes
                var categoryAxis = chart2.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "oponente";
                categoryAxis.title.text = "Oponente";
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.minGridDistance = 20;


                var valueAxis = chart2.yAxes.push(new am4charts.ValueAxis());
                valueAxis.title.text = "Puntos";

                // Create series
                var series4 = chart2.series.push(new am4charts.ColumnSeries());
                series4.dataFields.valueY = "FT";
                series4.dataFields.categoryX = "oponente";
                series4.name = "FT";
                series4.tooltipText = "{name}: [bold]{valueY} puntos[/]";
                series4.stacked = true;

                var series2 = chart2.series.push(new am4charts.ColumnSeries());
                series2.dataFields.valueY = "2PT";
                series2.dataFields.categoryX = "oponente";
                series2.name = "2PT";
                series2.tooltipText = "{name}: [bold]{valueY} puntos[/]";
                series2.stacked = true;

                var series3 = chart2.series.push(new am4charts.ColumnSeries());
                series3.dataFields.valueY = "3PT";
                series3.dataFields.categoryX = "oponente";
                series3.name = "3PT";
                series3.tooltipText = "{name}: [bold]{valueY} puntos[/]";
                series3.stacked = true;

                // Add cursor
                chart2.cursor = new am4charts.XYCursor();

                querySnapshot.forEach(function (doc) {
                    for (Q in doc.data()) {
                        team_twoM += doc.data()[Q].twoM
                        team_twoA += doc.data()[Q].twoA
                        team_thrM += doc.data()[Q].thrM
                        team_thrA += doc.data()[Q].thrA
                        team_ftM += doc.data()[Q].ftM
                        team_ftA += doc.data()[Q].ftA
                        team_rDf += doc.data()[Q].rDf
                        team_rOf += doc.data()[Q].rOf
                        team_As += doc.data()[Q].As
                        team_St += doc.data()[Q].St
                        team_Bl += doc.data()[Q].Bl
                        team_TO += doc.data()[Q].TO
                        team_Fo += doc.data()[Q].Fo
                    }
                    team = {
                        pts: (team_twoM * 2) + (team_thrM * 3) + (team_ftM),
                        fgM: (team_twoM + team_thrM),
                        fgA: (team_twoA + team_thrA),
                        fgP: ((team_twoM + team_thrM) / (team_twoA + team_thrA) * 100).toFixed(1),
                        thrM: team_thrM,
                        thrA: team_thrA,
                        thrP: ((team_thrM / team_thrA) * 100).toFixed(1),
                        ftM: team_ftM,
                        ftA: team_ftA,
                        ftP: ((team_ftM / team_ftA) * 100).toFixed(1),
                        rDf: team_rDf,
                        rOf: team_rOf,
                        rT: team_rDf + team_rOf,
                        As: team_As,
                        St: team_St,
                        Bl: team_Bl,
                        TO: team_TO,
                        Fo: team_Fo
                    }
                    totalRebounds = parseInt(team.rT)
                    totalAsists = parseInt(team.As)
                    // Add data
                    matchGraphData = {
                        "oponente": partido.data().Rival +" ("+ partido.data().Fecha+")",
                        "FT": team.ftM,
                        "2PT": (team.fgM - team.thrM) * 2,
                        "3PT": (team.thrM) * 3
                    }
                    chart2.data.pop()
                    chart2.data.push(matchGraphData)
                    total.pop()
                    total.push(team)
                });
                // Add data
                chart.data = [{
                    "canasta": "FT",
                    "%": total[0].ft
                }, {
                    "canasta": "2pt",
                    "%": total[0].fgM - total[0].thrM
                }, {
                    "canasta": "3pt",
                    "%": total[0].thrM
                }];
            })
        });
    });

    arrayJugadores = []
    total = []
    $("#myGrid").html(``)
    $("#team-totals").html(``)
    gridHeight = 54
    firestore.collection("equipos").doc(equipo.value).collection("jugadores").get().then(function (querySnapshot) {
        $("#team-name").text(querySnapshot.nombre);
        querySnapshot.forEach(function (jugador) {
            arrayJugadores.push(jugador.data())
            gridHeight += 42;
            document.getElementById("myGrid").style.height = gridHeight + "px"
        })
    })

    setTimeout(function () {
        displayTotals()
    }, 2000)
    setTimeout(function () {
        displayTable()
    }, 2000)
}


$(document).ready(function () {
    obtenerFiltros()
    $("#btn-filtrar").click(function () {
        $("#display-team").show()
        filtrar()
    })
})