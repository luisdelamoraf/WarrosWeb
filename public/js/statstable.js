localStorage = window.localStorage;

$(document).ready(function(){


    $(".prueba").text(localStorage.getItem("Action"))
    $(".prueba2").text(localStorage.getItem("Author"))
    $(".prueba3").text(localStorage.getItem("Chained"))


});