var btn = document.querySelector('#btn')
btn.addEventListener('click', handleSubmit)
function handleSubmit(e) {
  e.preventDefault();
  var age = parseInt(document.querySelector('#age').value)
  var sex = parseInt(document.querySelector('#sex').value)
  var cigs = parseInt(document.querySelector('#cigs').value)
  var diabetes = parseInt(document.querySelector('#diabetes').value)
  var cholestrol = parseInt(document.querySelector('#cholestrol').value)
  var sBP = parseInt(document.querySelector('#sBP').value)
  var dBP = parseInt(document.querySelector('#dBP').value)
  var heartRate = parseInt(document.querySelector('#heartRate').value)
  var glucose = parseInt(document.querySelector('#glucose').value)
  console.log(typeof (age), typeof (sex), typeof (cigs), typeof (diabetes), typeof (cholestrol), typeof (sBP), typeof (dBP), typeof (heartRate), typeof (glucose))
  console.log(diabetes)
  document.querySelector('.nl-form').style.display = 'none';
  document.querySelector('.loader').style.display = 'block';
  setTimeout(() => {
    fetch(`https://heartapi.herokuapp.com/predict?age=${age}&sex=${sex}&cigs=${cigs}&chol=${cholestrol}&sBP=${sBP}&dia=${diabetes}&dBP=${dBP}&gluc=${glucose}&hRate=${heartRate}`)
      .then(res => res.json())
      .then(data => {
        prediction = parseFloat(data['probability'][0][1]).toFixed(5);
        console.log(prediction)
        document.querySelector('.loader').style.display = 'none';
        if (cigs > 0 & prediction > 0.07) {
          document.querySelector('.clearfix').innerHTML = `
            <p class="nl-form">Quit Smoking Today<br>Predicted probability of having a coronary heart disease (Heart Attack)is ${prediction * 100} % <br>Please Consult Cardiologist</p>`;

        }
        else if (cigs > 1 & prediction < 0.07) {
          document.querySelector('.clearfix').innerHTML = `
            <p class="nl-form">Quit Smoking Today<br>Predicted probability of having a coronary heart disease (Heart Attack) is ${prediction * 100} %</p>`;
        }
        else {
          document.querySelector('.clearfix').innerHTML = `
              <p class="nl-form">Predicted probability of having a coronary heart disease (Heart Attack) is ${prediction * 100} %</p>`;
        }
      })
      .catch(err => {
        console.log(err)
        document.querySelector('.loader').style.display = 'none';
        document.querySelector('.clearfix').innerHTML = `
          <p class="nl-form"> Moye Moye!!!!! </p>`
      })
    var button = document.createElement("buttonagain");
    button.innerHTML = "Predict for Other";
    var again = document.getElementsByTagName("again")[0];
    again.appendChild(button);
    button.addEventListener("click", function () {
      window.location = "predictor.html";
    });
  }, 300);
}
