//Funcionalidad del botón START/RESTART
$(document).ready(function () {
  $(".restart").css("display", "none");
  $(".start").css("display", "block");

  $("#start").click(function () {
    $(".restart").css("display", "block");
    $(".start").css("display", "none");
  });
  $("#restart").click(function () {
    $(".restart").css("display", "none");
    $(".start").css("display", "block");
  });
});

var selected = 0;
var cars = 0;
//Selección de coches
function selection() {
  $("select").on("change", function () {
    var storeVar = `${this.value}`;
    localStorage.setItem("storedVarKey", storeVar); //guardamos en story el número de coches seleccionados

    if (selected > this.value) {
      sessionStorage.setItem("reloading", "true"); //refrescamos pantalla para recrear los coches pero sin perder información
      document.location.reload();
    }

    cars = +localStorage.getItem("storedVarKey");
    var div = document.querySelector("#images");
    //creamos los coches
    for (let index = selected; index < cars; index++) {
      var img = document.createElement("img");
      img.className = `car${+index + 1}`;
      img.src = `./img/car${+index + 1}.png`;
      img.alt = `coche${+index + 1}`;
      for (let index = 0; index < 4; index++) {
        var br = document.createElement("br");
        div.appendChild(br);
      }
      div.appendChild(img);
    }
    selected = this.value;
  });
}

let ranking = [];
let rankingUnsorted = [];
//funcion que anima los coches
function race(_callback) {
  for (let index = 0; index < cars; index++) {
    let random = Math.floor(Math.random() * 1001) + 4000;
    ranking.push(random); //array de números random que determinaran la posición
    rankingUnsorted.push(random); //array sin ordenara
    var image = document.querySelector(`.car${index + 1}`);
    $(image).animate(
      { left: "1400px" },
      {
        duration: random,
        complete: function () {
          if (index === cars - 1) _callback();
        },
      }
    );
  }
}
//Click start y comienza la carrera
$("#start").click(function () {
  document.getElementById("cars").disabled = true; //desabilitamos el dropdown

  race(function () {
    var sorted = ranking.sort();
    var table = document.querySelector("#ranking");
    let index;
    setTimeout(function () {
      //esperamos un poco...
      //se crea la tabla
      for (index = 0; index < ranking.length; index++) {
        var position = 0;
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.innerText = `Car ${index + 1}`;
        td.style.fontFamily = "Eunomia";
        tr.appendChild(td);
        //determina la posición
        for (let pos = 0; pos < sorted.length; pos++) {
          if (rankingUnsorted[index] === sorted[pos]) {
            position = pos + 1;
            break;
          }
        }
        var td = document.createElement("td");
        td.innerText = `Posición ${position}`;
        td.style.fontFamily = "Eunomia";
        if (position < 4) {
          //color rojo a los tres primeros en llegar a la meta
          td.style.color = `purple`;
          td.style.fontWeight = "Bold";
        }
        tr.appendChild(td);

        table.appendChild(tr);
        $("img").css("display", "none"); //desaparecen los coches para mostrar la tabla
      }
    }, 1000);
  });
});
//Botón de restart
$("#restart").click(function () {
  sessionStorage.setItem("reloading", "true");
  document.location.reload();
});
//refrescamos la sesión manteniendo el número seleccionado de coches
window.onload = function () {
  var reloading = sessionStorage.getItem("reloading");
  if (reloading) {
    sessionStorage.removeItem("reloading");
    var option = document.querySelector("option");
    option.value = +localStorage.getItem("storedVarKey");
    bool = false;
    $("select").trigger("change");
  }
};
selection();
