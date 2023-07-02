//slide toggle
var btn = document.getElementById("btn");
var slide = document.getElementById("slide");
var srch = document.getElementById("srch")
var searchBtn= document.getElementById("search-btn")
var Select=document.getElementById("choice")



searchBtn.addEventListener("click",()=>{
 
    
  var selectedIndex = Select.selectedIndex;
  
    if (selectedIndex !== -1) {
      var selectedOption = Select.options[selectedIndex];
      var selectedValue = Select.value;
      var selectedText = Select.options[selectedIndex].text;
      Select.options[selectedIndex].removeAttribute("selected");
      console.log("Selected Value: " + selectedValue);
      console.log("Selected Text: " + selectedText);
    } else {
      console.log("No option selected.");
    }

  
  // let Count=Select.options.length
  // for(let i=0;i<Count;i++){
  //   if(Select.value!=option[i].value && option[i].disabled == true )
  //   option[i].disabled =false 
  // }


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