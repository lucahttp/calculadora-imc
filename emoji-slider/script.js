document.addEventListener("DOMContentLoaded", () => {
  const emoji = document.querySelector(".emoji"),
    slider = document.querySelector(".slider"),
    tempOutput = document.querySelector(".temperature-output"),
    imcTipo = document.querySelector(".imc-tipo"),
    imcClasi = document.querySelector(".imc-clasificacion"),

    displayTemp = (temperature) => {
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

          imcTipo.textContent = "delgadez severa"
          imcClasi.textContent = "Bajo Peso < 18.50";
          break;
        case temperature > 16.0 && temperature < 17.0:
          emoji.textContent = "😬";
          emoji.setAttribute("aria-label", "freezing face");

          imcTipo.textContent = "delgadez moderada"
          imcClasi.textContent = "Bajo Peso < 18.50";
          break;
        case temperature >= 17.0 && temperature < 18.5:
          emoji.textContent = "😅";
          emoji.setAttribute("aria-label", "delgadez aceptable");

          imcTipo.textContent = "delgadez aceptable"
          imcClasi.textContent = "Bajo Peso < 18.50";
          break;
        case temperature >= 18.5 && temperature < 25.0:
          emoji.textContent = "😊";
          emoji.setAttribute("aria-label", "happy face");

          imcTipo.textContent = "normal"
          imcClasi.textContent = "Normal 18.50 - 24.99";
          var calc = ((24.99-18.50)/2+18.50)*2
          console.log(calc);
          break;
        case temperature >= 25.0 && temperature < 30.0:
          emoji.textContent = "😅";
          emoji.setAttribute("aria-label", "pre-obeso");
          
          imcTipo.textContent = "Sobrepeso"
          imcClasi.textContent = "pre-obeso (riesgo) > 25.00";
          break;
        case temperature >= 30.0 && temperature < 35.0:
          emoji.textContent = "😬";
          emoji.setAttribute("aria-label", "Obeso tipo 1");

          imcTipo.textContent = "Obeso"
          imcClasi.textContent = "Obeso tipo 1 (riesgo moderado) 30.00 - 34.99";
          break;
        case temperature >= 35.0 && temperature < 40.0:
          emoji.textContent = "😕";
          emoji.setAttribute("aria-label", "Obeso tipo 2");

          imcTipo.textContent = "Obeso"
          imcClasi.textContent = "Obeso tipo 2 (riesgo severo) 35.00 - 39.99";
          break;
        case temperature >= 40.0:
          emoji.textContent = "😕";
          emoji.setAttribute("aria-label", "Obeso tipo 3");

          imcTipo.textContent = "Obeso"
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
});
