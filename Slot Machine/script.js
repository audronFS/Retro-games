var listaImagenes = [
  "aubergine",
  "banana",
  "carrot",
  "cherrie",
  "dollar",
  "lemon",
  "orange",
  "peach",
  "potato",
  "tomato",
];
const introMonedas = (value = 0) => {
  var inputMon = document.getElementById("inputMonedas");
  document.getElementById("monedas").innerText = inputMon.value;
  inputMon.value = value;
  if (!value) {
    inputMon.disabled = true;
    document.getElementById("introducir").disabled = true;
  } else {
    inputMon.disabled = false;
    document.getElementById("introducir").disabled = false;
  }
  document.getElementById("cobrar").innerText = "Collect Money";
  document.getElementById("cobrar").style.color = "green";
  document.getElementById("cobrar").style.display = "block";
};
const activarPalanca = () => {
  if (document.getElementById("monedas").innerText <= 0) {
    alert("Please, introduce coins");
  } else {
    crearHistorial("Activating slot lever... Game cost: -1 dollar");
    var resultados = [];
    document.getElementById("palanca").src = `./img/palancaDOWN.png`;
    const myVar = setInterval(function () {
      for (let index = 1; index <= 3; index++) {
        var imagenRandom = listaImagenes[Math.floor(Math.random() * 10)];
        resultados.push(imagenRandom);
        var firstImage = document.getElementById(`luck${index}`);
        firstImage.src = `./img/${imagenRandom}.png`;
        if (resultados.length === 27) {
          document.getElementById("palanca").src = `./img/palancaUP.png`;
          calculoResultados(
            resultados.slice(Math.max(resultados.length - 3, 1))
          );
          clearInterval(myVar);
        }
      }
    }, 100);
  }
};

const calculoResultados = (resultados) => {
  var unaMoneda = 0;
  const monedas = resultados.filter((resultado) => resultado === "dollar");
  if (monedas.length > 0) unaMoneda = 1;

  var dup = encuentraDuplicados(resultados);
  switch (dup.length) {
    case 1:
      if (dup[0] === "dollar") {
        calcularSaldo(4);
        crearHistorial(`Two ${dup[0]}s!! You earn 4 coins`, 500);
      } else {
        calcularSaldo(2, unaMoneda);
        unaMoneda
          ? crearHistorial(
              `Two ${dup[0]}s and one dollar!! You earn 3 coins`,
              300
            )
          : crearHistorial(`Two ${dup[0]}s!! You earn 2 coins`, 500);
      }
      break;
    case 2:
      if (dup[0] === "dollar") {
        calcularSaldo(10);
        crearHistorial(`Three ${dup[0]}s!! You earn 10 coins`, 500);
      } else {
        calcularSaldo(5);
        crearHistorial(`Three ${dup[0]}s!! You earn 5 coins`, 500);
      }
      break;
    default:
      calcularSaldo(-1, unaMoneda);
      unaMoneda
        ? crearHistorial(`One dollar!! You earn 1 coin`, 500)
        : crearHistorial(`No luck! Try again`, 500);
  }
};
const encuentraDuplicados = (arr) => {
  let sortedArr = arr.slice().sort();
  let duplicados = [];
  for (let i = 0; i < sortedArr.length - 1; i++) {
    if (sortedArr[i + 1] === sortedArr[i]) {
      duplicados.push(sortedArr[i]);
    }
  }
  return duplicados;
};
const calcularSaldo = (valor, unaMoneda = 0) => {
  const saldo = document.getElementById("monedas").innerText;
  const saldoActual = (document.getElementById("monedas").innerText =
    +saldo + valor + unaMoneda);
  return saldoActual;
};

const crearHistorial = (text, time = 0) => {
  setTimeout(() => {
    var li = document.createElement("li");
    var textNode = document.createTextNode(text);
    li.appendChild(textNode);
    var ul = document.getElementById("historial");
    //orden ascendente
    ul.insertBefore(li, ul.childNodes[0]);
    var firstUlElement = document.getElementsByTagName("ul")[0];
    firstUlElement.style.fontSize = "150%";
    firstUlElement.style.color = "purple";
    var list = document.getElementsByTagName("li");
    list[1].style.color = "black";
    list[1].style.fontSize = "70%";
  }, time);
};
const cobrarSuma = () => {
  if (document.getElementById("cobrar").innerText === "Collect Money") {
    crearHistorial("You have retrieved your money... see you soon");
    alert(
      `You've earned ${document.getElementById("monedas").innerText} dollars!`
    );
    introMonedas(document.getElementById("monedas").innerText);
  }
  if (document.getElementById("cobrar").innerText === "Restart Records")
    location.reload();
  document.getElementById("cobrar").innerText = "Restart Records";
  document.getElementById("cobrar").style.color = "red";
};
