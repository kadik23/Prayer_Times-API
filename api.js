var btn = document.getElementById("btn");
var slide = document.getElementById("slide");
var srch = document.getElementById("srch");
var searchBtn = document.getElementById("search-btn");
var Select = document.getElementById("choice");


var cities={
"medea":"DZ-26",
"alger":"DZ-16",
"oran":"DZ-31",
"constantine":"DZ-25",
"blida":"DZ-09"
}

// Get the current date and time

var currentDate = new Date();
var day = currentDate.getDate().toString().padStart(2, '0'); // Add leading zeros
var monthIndex = currentDate.getMonth();
var year = currentDate.getFullYear();

function updateClock(){
  var currentDate = new Date();
  // Get the current hour
  var currentHour = currentDate.getHours();
  // Get the current minutes
  var currentMinutes = currentDate.getMinutes().toString().padStart(2, "0");
  document.getElementById("hour").textContent=`${currentHour}:${currentMinutes}`
}



// Create an array of month names
var monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Get the month name using the month index
var month = monthNames[monthIndex];

// Construct the desired date format
var formattedDate = day + ' ' + month + ' ' + year;


//___________________ if add city to select.option________________________________________
searchBtn.addEventListener("click", () => {
      // alert(Select.options.length);

      for (let i = 0; i < Select.options.length; i++) {
        if (Select.options[i].textContent === srch.value) {
          fnc(srch.value);
          srch.value = "";

          var selectedIndex = Select.selectedIndex;

          if (selectedIndex !== -1) {
            let selectedOption = Select.options[selectedIndex];
            selectedOption.removeAttribute("selected");
          } else {
            console.log("No option selected.");
            Select.options[i].selected = true;
          }

          break;
        }
      }

      if (srch.value) {
        var selectedIndex = Select.selectedIndex;

        if (selectedIndex !== -1 && Select.options[selectedIndex].textContent === srch.value) {
          // Entered value is already the selected option
          fnc(srch.value);
          srch.value = "";
        } else {
          let choice = document.getElementById("choice");
          choice.innerHTML += `<option selected>${srch.value}</option>`;
          fnc(srch.value);
          srch.value = "";
        }
      }
});

// click right arrow_________________________________
btn.addEventListener("click", () => {
    slide.classList.toggle("hidden");
    btn.classList.toggle("pos-change")
});


// GET-API-Request
var fnc = (city) => {

    var length = Object.keys(cities).length
      for(let i=0;i<length;i++){
        var keys = Object.keys(cities);  // Get an array of keys
        var cityName = keys[i];
        if(cityName==city){
          var cityCode = cities[cityName];
        }
      }

    // http://api.aladhan.com/v1/timingsByCity/:date?country=DZ&city=DZ-26
    axios.get(
        `https://api.aladhan.com/v1/calendarByCity?city=${cityCode}&country=Algerie&method=1`
    )
    .then((response) => {
      let athans = response.data.data;
      for (var athan of athans) {
        if (athan.date.readable == formattedDate) {
          // console.log(athan.date.hijri.day+" "+athan.date.hijri.month.ar+" "+athan.date.hijri.year);
          // console.log(athan.date.hijri.weekday.ar)
          document.getElementById("date").innerHTML=athan.date.hijri.weekday.ar+"<br>"+athan.date.hijri.day+" "+athan.date.hijri.month.ar+" "+athan.date.hijri.year;
          updateClock()
          setInterval(updateClock, 1000);

          var apiResponse = athan.timings.Fajr;
          var alfajr = apiResponse.split(" ")[0];
          document.getElementById("alfajr").innerHTML=`<h3 class="mawa9it">${alfajr}</h3><h4>الفجر</h4> ` 


          apiResponse = athan.timings.Sunset;
          var Sunset = apiResponse.split(" ")[0];
          document.getElementById("sunset").innerHTML=`<h3 class="mawa9it">${Sunset}</h3><h4>الشروق</h4> ` 


           apiResponse = athan.timings.Dhuhr;
          var Dhuhr = apiResponse.split(" ")[0];
          document.getElementById("alduhr").innerHTML=`<h3 class="mawa9it">${Dhuhr}</h3><h4>الظهر</h4> ` 

           
           apiResponse = athan.timings.Asr;
          var Asr = apiResponse.split(" ")[0];
          document.getElementById("alasr").innerHTML=`<h3 class="mawa9it">${Asr}</h3><h4>العصر</h4> ` 

           apiResponse = athan.timings.Maghrib;
          var Maghrib = apiResponse.split(" ")[0];
          document.getElementById("almaghreb").innerHTML=`<h3 class="mawa9it">${Maghrib}</h3><h4>المغرب</h4> ` 

           apiResponse = athan.timings.Isha;
          var Isha = apiResponse.split(" ")[0];
          document.getElementById("al-ishaa").innerHTML=`<h3 class="mawa9it">${Isha}</h3><h4>العشاء</h4> ` 
        }
      }
    });
};


// auto get-API
  var selectedIndex = Select.selectedIndex;
  let selectedOption = Select.options[selectedIndex];
  fnc(selectedOption.textContent)

