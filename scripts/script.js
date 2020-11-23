///// URL ENCODING





function setQueryVariable(key, value) {
    // Construct URLSearchParams object instance from current URL querystring.
    var queryParams = new URLSearchParams(window.location.search);
  
    // Set new or modify existing parameter value. 
    queryParams.set(key, value);
    
    // Replace current querystring with the new one.
    history.replaceState(null, null, "?"+queryParams.toString());
}


function setQueryVariableNot(key, value) {



  //https://stackoverflow.com/questions/486896/adding-a-parameter-to-the-url-with-javascript
  key = encodeURIComponent(key);
  value = encodeURIComponent(value);

  // kvp looks like ['key1=value1', 'key2=value2', ...]
  var kvp = document.location.search.substr(1).split("&");
  let i = 0;

  for (; i < kvp.length; i++) {
    if (kvp[i].startsWith(key + "=")) {
      let pair = kvp[i].split("=");
      pair[1] = value;
      kvp[i] = pair.join("=");
      break;
    }
  }

  if (i >= kvp.length) {
    kvp[kvp.length] = [key, value].join("=");
  }

  // can return this or...
  let params = kvp.join("&");

  //history.replaceState(null, null, params);
  document.location.pathname = params;
  // reload page with new params
  //document.location.search = params;
}

function getQueryVariableOld(variable) {
  // http://da-software.blogspot.com/2012/02/obtener-parametros-de-la-url-con-jquery.html
  // https://es.stackoverflow.com/questions/445/c%C3%B3mo-obtener-valores-de-la-url-get-en-javascript
  // Estoy asumiendo que query es window.location.search.substring(1);
  // var query = "product_id=32&cat_id=1&sessionid=123";
  var query = window.location.search.substring(1);

  var vars = query.split("&");
  alert(vars);
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

function getQueryVariable(variable) {
  // http://da-software.blogspot.com/2012/02/obtener-parametros-de-la-url-con-jquery.html
  // https://es.stackoverflow.com/questions/445/c%C3%B3mo-obtener-valores-de-la-url-get-en-javascript
  // Estoy asumiendo que query es window.location.search.substring(1);
  // var query = "product_id=32&cat_id=1&sessionid=123";
  var query = window.location.search.substring(1);

  var vars = query.split("&");
  //alert(vars);
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      //console.log(pair[1]);
      //console.log(typeof pair[1]);
      return Number(pair[1]);
    }
  }
  return null;
}

///// CALCULO IMC
function calcIMC(peso, altura) {
  return peso / (altura * altura);
}
function getClasificacionIMC(IMC) {
  switch (IMC) {
    case (IMC < 18, 5):
      resultado = "Insuficiencia ponderal";
      break;
    case (IMC >= 18, 5 | (IMC < 25.0)):
      resultado = "Intervalo normal";
      break;

    case (IMC >= 25.0) | (IMC < 30.0):
      resultado = "PreObesidad";
      break;
    case (IMC >= 30.0) | (IMC < 35.0):
      resultado = "Obesidad de clase 1";
      break;
    case (IMC >= 35.0) | (IMC < 40.0):
      resultado = "Obesidad de clase 2";
      break;
    case IMC >= 40.0:
      resultado = "Obesidad de clase 3";
      break;
    default:
      break;
  }
  return resultado;
}
///// CALCULO METABOLISMO BASAL
function calcMetabolismoBasal(peso, altura) {
  return peso / (altura * altura);
}

///// EMOJI SLIDER
document.addEventListener("DOMContentLoaded", () => {
  const emoji = document.querySelector(".emoji"),
    slider = document.querySelector(".slider"),
    tempOutput = document.querySelector(".temperature-output"),
    imcTipo = document.querySelector(".imc-tipo"),
    imcClasi = document.querySelector(".imc-clasificacion"),
    displayTemp = (temperature) => {
      slider.value = temperature;
      //Display temperature
      tempOutput.textContent = temperature;

      //Display emoji
      /*
        if (temperature >= 0 && temperature <= 8) {
          emoji.textContent = '😕😬';
          emoji.setAttribute('aria-label', 'freezing face');
        } else if (temperature > 8 && temperature <= 16) {
          emoji.textContent = '😅';
          emoji.setAttribute('aria-label', 'cold face');
        } else if (temperature > 16 && temperature <= 24) {
          emoji.textContent = '😊';
          emoji.setAttribute('aria-label', 'happy face');
        } else if (temperature > 24 && temperature <= 32) {
          emoji.textContent = '😅';
          emoji.setAttribute('aria-label', 'warm face');
        } else {
          emoji.textContent = '😬';
          emoji.setAttribute('aria-label', 'hot face');
        }
      };
      */
      //console.log(temperature);
      switch (true) {
        case temperature <= 16.0:
          emoji.textContent = "😕";
          emoji.setAttribute("aria-label", "freezing face");

          imcTipo.textContent = "delgadez severa";
          imcClasi.textContent = "Bajo Peso < 18.50";
          break;
        case temperature > 16.0 && temperature < 17.0:
          emoji.textContent = "😬";
          emoji.setAttribute("aria-label", "freezing face");

          imcTipo.textContent = "delgadez moderada";
          imcClasi.textContent = "Bajo Peso < 18.50";
          break;
        case temperature >= 17.0 && temperature < 18.5:
          emoji.textContent = "😅";
          emoji.setAttribute("aria-label", "delgadez aceptable");

          imcTipo.textContent = "delgadez aceptable";
          imcClasi.textContent = "Bajo Peso < 18.50";
          break;
        case temperature >= 18.5 && temperature < 25.0:
          emoji.textContent = "😊";
          emoji.setAttribute("aria-label", "happy face");

          imcTipo.textContent = "normal";
          imcClasi.textContent = "Normal 18.50 - 24.99";
          var calc = ((24.99 - 18.5) / 2 + 18.5) * 2;
          //console.log(calc);
          break;
        case temperature >= 25.0 && temperature < 30.0:
          emoji.textContent = "😅";
          emoji.setAttribute("aria-label", "pre-obeso");

          imcTipo.textContent = "Sobrepeso";
          imcClasi.textContent = "pre-obeso (riesgo) > 25.00";
          break;
        case temperature >= 30.0 && temperature < 35.0:
          emoji.textContent = "😬";
          emoji.setAttribute("aria-label", "Obeso tipo 1");

          imcTipo.textContent = "Obeso";
          imcClasi.textContent = "Obeso tipo 1 (riesgo moderado) 30.00 - 34.99";
          break;
        case temperature >= 35.0 && temperature < 40.0:
          emoji.textContent = "😕";
          emoji.setAttribute("aria-label", "Obeso tipo 2");

          imcTipo.textContent = "Obeso";
          imcClasi.textContent = "Obeso tipo 2 (riesgo severo) 35.00 - 39.99";
          break;
        case temperature >= 40.0:
          emoji.textContent = "😕";
          emoji.setAttribute("aria-label", "Obeso tipo 3");

          imcTipo.textContent = "Obeso";
          imcClasi.textContent = "Obeso tipo 3 (riesgo muy severo) > 40.00";
          break;

        default:
          emoji.textContent = "😊";
          emoji.setAttribute("aria-label", "normal");
          imcClasi.textContent = "Normal 18.50 - 24.99";
          break;
      }
    };

  slider.addEventListener("input", () => displayTemp(slider.value));

  //CodePen preview window
  if (location.pathname.includes("fullcpgrid")) {
    let temperature = 0.0;

    const interval = setInterval(() => {
      //Remove interval if max temperature is reached
      if (temperature === 40) clearInterval(interval);

      //Update slider value
      slider.value = temperature;

      //Display temperature and emoji
      displayTemp(temperature);

      //Increase temperature
      temperature++;
    }, 95);
  }

  ///// EMOJI SLIDER

  var valor_peso = 0;
  var valor_altura = 0;
  var valor_imc = 0;

  //// CALC


  function calcandput() {
    valor_peso = labelpeso.value;
    valor_altura = labelaltura.value;

    //console.log(event);

    //console.log("valor_altura");
    //console.log(valor_altura);
    //console.log("valor_peso");
    //console.log(valor_peso);

    valor_imc = calcIMC(valor_peso, valor_altura).toFixed(2);
    //console.log("valor_imc");
    //console.log(valor_imc);
    //slider.value = valor_imc;
    displayTemp(valor_imc); 
  }
  labelpeso = document.querySelector(".val-peso");
  labelpeso.value = getQueryVariable("peso");
  labelaltura = document.querySelector(".val-altura");
  labelaltura.value = getQueryVariable("altura");
  labelsubmiter = document.querySelector(".submiter");

  if (labelpeso.value != "" || labelaltura.value != "") {
    valor_peso = labelpeso.value;
    valor_altura = labelaltura.value;

    //console.log('tenemos algo en la entrada');    
    
    valor_imc = calcIMC(valor_peso, valor_altura).toFixed(2);
    //console.log("valor_imc");
    //console.log(valor_imc);

    displayTemp(valor_imc);
    
  }

// Setup our function to run on various events
var pesoFunction = function (event) {
  setQueryVariable("peso", event.target.value);
  //URLSearchParams.set("peso", event.target.value);
  calcandput()
};

// Add our event listeners
labelpeso.addEventListener('change', pesoFunction);
labelpeso.addEventListener('input', pesoFunction);
labelpeso.addEventListener('paste', pesoFunction);

// Setup our function to run on various events
var alturaFunction = function (event) {
  setQueryVariable("altura", event.target.value);
  //URLSearchParams.set("peso", event.target.value);
  calcandput()
};

// Add our event listeners
labelaltura.addEventListener('change', pesoFunction);
labelaltura.addEventListener('input', alturaFunction);
labelaltura.addEventListener('paste', pesoFunction);


// Add our event listeners
//labelaltura.addEventListener('change', alturaFunction, false);
//labelaltura.addEventListener('input', alturaFunction, false);
//labelaltura.addEventListener('paste', alturaFunction, false);




  labelsubmiter.addEventListener("click", (event) => {
    valor_peso = labelpeso.value;
    valor_altura = labelaltura.value;

    //console.log(event);

    //console.log("valor_altura");
    //console.log(valor_altura);
    //console.log("valor_peso");
    //console.log(valor_peso);

    valor_imc = calcIMC(valor_peso, valor_altura).toFixed(2);
    //console.log("valor_imc");
    //console.log(valor_imc);

    displayTemp(valor_imc);
    //const resultado = document.querySelector('.resultado');
    //resultado.textContent = `Te gusta el sabor ${event.target.value}`;
  });
  /**/
});
