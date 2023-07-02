//slide toggle
var btn = document.getElementById("btn");
var slide = document.getElementById("slide");
var srch = document.getElementById("srch")
var searchBtn= document.getElementById("search-btn")

searchBtn.addEventListener("click",()=>{

  let choice= document.getElementById("choice")
  if(srch.value){
    choice.innerHTML+=`<option  selected>${srch.value}</option>`
    srch.value=""
  }


})


btn.addEventListener('click', () => {
  slide.classList.toggle("hidden");
});

var fnc=()=>{
    axios.get("https://api.aladhan.com/v1/calendarByCity/2023/7?city=Medea&country=Algerie&method=1")
    .then(response=>{
    let athans=response.data.data
    // console.log(athans.data)
    
// if(athans.date.readable=)
    // if(athans[0].date.readable=='01 Jul 2023'){
    for(var athan of athans){
      if(athan.date.readable=='01 Jul 2023')
     console.log(athan.timings.Fajr)
    
    }
    

    })
}
fnc()