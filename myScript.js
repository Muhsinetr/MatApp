let sqmt = document.getElementById("ttlsq");
let sqOfMat;
let tprc = document.getElementById("ttlprc");
let ttlprice;
let feildest = document.querySelector(".feildestplace");
let hidd = document.querySelector(".wraper");
let histit = document.querySelector(".hissec");
let hist = document.querySelector(".hiswrap");
let historyAraay = [];

let newtoday = new Date().toISOString().slice(0, 10);
let sliceDay = newtoday.split("-");
let today = sliceDay[2] + "/" + sliceDay[1] + "/" + sliceDay[0];

function claculatResult() {
  let heightOfMat = document.getElementById("Length").value;
  let widthOfMat = document.getElementById("width").value;
  let heightLength = document.getElementById("heightlength").value;
  let widthLength = document.getElementById("widthlength").value;
  let priceOfMat = document.getElementById("Price").value;
if(heightOfMat && widthOfMat){
  if (heightLength == "feet") {
    switch (widthLength) {
      case "feet":
        sqOfMat = heightOfMat * widthOfMat;
        break;
      case "inch":
        sqOfMat = heightOfMat * (widthOfMat / 12);
        break;
      case "meter":
        sqOfMat = heightOfMat * (widthOfMat * 3.280839895013123);
        break;
    }
  } else if (heightLength == "inch") {
    switch (widthLength) {
      case "feet":
        sqOfMat = (heightOfMat / 12) * widthOfMat;
        break;
      case "inch":
        sqOfMat = (heightOfMat / 12) * (widthOfMat / 12);
        break;
      case "meter":
        sqOfMat = (heightOfMat / 12) * (widthOfMat * 3.280839895013123);
        break;
    }
  } else {
    switch (widthLength) {
      case "feet":
        sqOfMat = heightOfMat * 3.280839895013123 * widthOfMat;
        break;
      case "inch":
        sqOfMat = heightOfMat * 3.280839895013123 * (widthOfMat / 12);
        break;
      case "meter":
        sqOfMat =
          heightOfMat * 3.280839895013123 * (widthOfMat * 3.280839895013123);
        break;
    }
  }
  ttlprice = sqOfMat * priceOfMat;
  sqmt.innerText = sqOfMat.toFixed(2);
  tprc.innerText = ttlprice.toFixed(0);
  saveHistory(heightOfMat, widthOfMat, heightLength, widthLength, priceOfMat);
  setlocal();
  
}
}

function saveHistory(
  heightOfMat,
  widthOfMat,
  heightLength,
  widthLength,
  priceOfMat
) {
  let newObj = {
    "heightM": heightOfMat,
    "widthM": widthOfMat,
    "heightunit": heightLength,
    "widthunit": widthLength,
    "squrefeet": sqOfMat.toFixed(1),
    "unitprice": priceOfMat,
    "amount": ttlprice.toFixed(0),
    "Date": today,
  };
  historyAraay.push(newObj);
  console.log(historyAraay);
  recentCheck();
}

function recentCheck() {

    feildest.innerHTML = "";
  for (let i = 0; i < historyAraay.length; i++) {
    if(historyAraay[i].Date == today){
    let recentitems = `<div class="checks">
        <p>Height &nbsp&nbsp&nbsp&nbsp:&nbsp ${historyAraay[i].heightM} ${historyAraay[i].heightunit}</p>
        <p>Width  &nbsp&nbsp&nbsp&nbsp :&nbsp ${historyAraay[i].widthM} ${historyAraay[i].widthunit}</p>
        <p>Squre feet :&nbsp ${historyAraay[i].squrefeet}</p>
        <p>Unit price :&nbsp ${historyAraay[i].unitprice}</p>
        <p>Price &nbsp&nbsp&nbsp&nbsp&nbsp:&nbsp ${historyAraay[i].amount}/-</p>
    </div>`;
    feildest.insertAdjacentHTML("afterbegin", recentitems);
}
  }
}


function addHistory(){
  histit.innerHTML = "";
    let sortedDArray = dateSort();
    sortedDArray.slice().reverse().forEach((date)=>{
        let eachDate = `<fieldset><legend>${date}</legend>`;
        historyAraay.slice().reverse().forEach((val)=>{
            if(val.Date == date){
        let dateData = `<div class="matdatas">
        <p>Height &nbsp&nbsp&nbsp&nbsp:&nbsp ${val.heightM} ${val.heightunit}</p>
        <p>Width  &nbsp&nbsp&nbsp&nbsp :&nbsp ${val.widthM} ${val.widthunit}</p>
        <p>Squre feet :&nbsp ${val.squrefeet}</p>
        <p>Unit price :&nbsp ${val.unitprice}</p>
        <p>Price &nbsp&nbsp&nbsp&nbsp&nbsp:&nbsp ${val.amount}/-</p>
        </div>`;
        eachDate = eachDate + dateData;
            }
        });
        eachDate = eachDate + `</fieldset>`;
        // hist.insertAdjacentElement("afterbegin", eachDate);
        histit.innerHTML = histit.innerHTML + eachDate;
        
    });
}

function dateSort(){
    let sortedDateArray = [];
      historyAraay.forEach((val)=>{
        sortedDateArray.push(val.Date);
      });
      let sortedDArray =  [...new Set(sortedDateArray)];
      return sortedDArray
      
    }
function goHistory(){
        hidd.style.display = "none";
        hist.style.display = "block";
        addHistory();
}
function goBack(){
    hidd.style.display = "block";
    hist.style.display = "none";
}

function setlocal() {
  let localSave = JSON.stringify(historyAraay);
  localStorage.setItem("PastCheck", localSave);
}

function callLocalstroage() {
  if (localStorage.getItem("PastCheck")) {
    let lget = localStorage.getItem("PastCheck");
    historyAraay = JSON.parse(lget);
    recentCheck();
  }
  
}
callLocalstroage();
function clearLocal() {
  let msg = prompt('Please enter "ok" to clear all History', "");
  if (msg == "ok") {
    historyAraay = [];
    setlocal();
    addHistory();
  }
};

/////////Service worker registration

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("srworker.js").then(registration=>{
      console.log("Service worker registered")
      console.log(registration);
  }).catch(error=>{
      console.log("Service worker error")
      console.log(error)
  })
}else{
  alert("Service worker not working")
}