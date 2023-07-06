var btn = document.getElementById("btn");
var slide = document.getElementById("slide");
var srch = document.getElementById("srch");
var searchBtn = document.getElementById("search-btn");
var selectElement = document.getElementById("choice");

var cities=["Alger","Medea","Oran"];
for(let city of cities){
  selectElement.innerHTML+=`<option>${city}</option>`;
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
  let inputValue =capitalizeFirstLetter(srch.value) 
      for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].textContent === inputValue) {
          selectElement.value=inputValue;
          srch.value=""
          break;
        }
      }
      
      if (srch.value) {
        choice.innerHTML += `<option selected>${inputValue}</option>`;
        srch.value = "";
      }
      
      fnc(selectElement.value);     
});



//change in option selected
choice.addEventListener("change",()=>{
  fnc(selectElement.value)
})



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
      let params={        
        country:"DZ",
        city:city
      }
    // http://api.aladhan.com/v1/timingsByCity/:date?country=DZ&city=DZ-26
    axios.get(
        `http://api.aladhan.com/v1/timingsByCity`,{
      params:params
      }
    )
    .then((response) => {
      let athans = response.data.data;
      // for (var athan of athans) {
      //   if (athan.date.readable == formattedDate) {
          // console.log(athan.date.hijri.day+" "+athan.date.hijri.month.ar+" "+athan.date.hijri.year);
          // console.log(athan.date.hijri.weekday.ar)
          document.getElementById("date").innerHTML=athans.date.hijri.weekday.ar+"<br>"+athans.date.hijri.day+" "+athans.date.hijri.month.ar+" "+athans.date.hijri.year;
          updateClock()
          setInterval(updateClock, 1000);

          var apiResponse = athans.timings.Fajr;
          var alfajr = apiResponse.split(" ")[0];
          change_prayer_time("alfajr",alfajr,"الفجر")

          apiResponse = athans.timings.Sunrise;
          var Sunrise = apiResponse.split(" ")[0];
          change_prayer_time("sunrise",Sunrise,"الشروق")

           apiResponse = athans.timings.Dhuhr;
          var Dhuhr = apiResponse.split(" ")[0];
          change_prayer_time("alduhr",Dhuhr,"الظهر")
           
           apiResponse = athans.timings.Asr;
          var Asr = apiResponse.split(" ")[0];
          change_prayer_time("alasr",Asr,"العصر")

           apiResponse = athans.timings.Maghrib;
          var Maghrib = apiResponse.split(" ")[0];
          change_prayer_time("almaghreb",Maghrib,"المغرب")

           apiResponse = athans.timings.Isha;
          var Isha = apiResponse.split(" ")[0];
          change_prayer_time("al-ishaa",Isha,"العشاء")
      
    });
};


// auto get-API
  fnc(selectElement.value)


  function capitalizeFirstLetter(word) {
    var lowercaseWord = word.toLowerCase();
    var capitalizedWord = lowercaseWord.charAt(0).toUpperCase() + lowercaseWord.slice(1);
    return capitalizedWord;
  }


  function change_prayer_time(id,data,prayer_name){
    document.getElementById(id).innerHTML=`<h3 class="mawa9it">${data}</h3><h4>${prayer_name}</h4> ` 
  }