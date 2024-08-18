let sqmt = document.getElementById("ttlsq");
let sqOfMat;
let tprc = document.getElementById("ttlprc");
let ttlprice;
let feildest = document.querySelector(".feildestplace");
let hidd = document.querySelector(".wraper");
let histit = document.querySelector(".hissec");
let hist = document.querySelector(".hiswrap");
let historyAraay = [
    {
        "heightM": "15",
        "widthM": "10",
        "heightunit": "feet",
        "widthunit": "feet",
        "squrefeet": "1005.00",
        "unitprice": "12",
        "amount": "12060",
        "Date": "17/08/2024"
    },{
        "heightM": "10",
        "widthM": "66",
        "heightunit": "feet",
        "widthunit": "inch",
        "squrefeet": "1005.00",
        "unitprice": "12",
        "amount": "12060",
        "Date": "18/08/2024"
    },{
        "heightM": "15",
        "widthM": "1",
        "heightunit": "feet",
        "widthunit": "meter",
        "squrefeet": "49.21",
        "unitprice": "50",
        "amount": "2461",
        "Date": "16/08/2024"
    },
    {
        "heightM": "15",
        "widthM": "10",
        "heightunit": "feet",
        "widthunit": "feet",
        "squrefeet": "1005.00",
        "unitprice": "12",
        "amount": "12060",
        "Date": "18/08/2024"
    },{
        "heightM": "10",
        "widthM": "66",
        "heightunit": "feet",
        "widthunit": "inch",
        "squrefeet": "1005.00",
        "unitprice": "12",
        "amount": "12060",
        "Date": "15/08/2024"
    },{
        "heightM": "15",
        "widthM": "1",
        "heightunit": "feet",
        "widthunit": "meter",
        "squrefeet": "49.21",
        "unitprice": "50",
        "amount": "2461",
        "Date": "15/08/2024"
    }
];

let newtoday = new Date().toISOString().slice(0, 10);
let sliceDay = newtoday.split("-");
let today = sliceDay[2] + "/" + sliceDay[1] + "/" + sliceDay[0];

function claculatResult() {
  let heightOfMat = document.getElementById("Length").value;
  let widthOfMat = document.getElementById("width").value;
  let heightLength = document.getElementById("heightlength").value;
  let widthLength = document.getElementById("widthlength").value;
  let priceOfMat = document.getElementById("Price").value;

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
  console.log(sqOfMat.toFixed(2));
  sqmt.innerText = sqOfMat.toFixed(2);
  console.log(ttlprice.toFixed(0));
  tprc.innerText = ttlprice.toFixed(0);
  saveHistory(heightOfMat, widthOfMat, heightLength, widthLength, priceOfMat);
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
    "squrefeet": sqOfMat.toFixed(2),
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
    let sortedDArray = dateSort();
    sortedDArray.forEach((date)=>{
        let eachDate = `<fieldset><legend>${date}</legend>`;
        historyAraay.forEach((val)=>{
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