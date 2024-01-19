import { useState ,useEffect} from 'react'
import Logo from './assets/Logo.png'
import Search from './assets/icons8-search-80.png'
import './App.css'
import axios from "axios"

function App() {

  const [isActive, setIsActive] = useState(true);
  const [newDate, setNewDate] = useState(null);
  const [cities, setCities] = useState(["Alger","Medea","Oran"]);
  const [athanTime, setAthanTime] = useState([
    {ar:"الفجر",an:"Fajr",time:""},
    {ar:"الشروق",an:"Sunrise",time:""},
    {ar:"الظهر",an:"Dhuhr",time:""},
    {ar:"العصر",an:"Asr",time:""},
    {ar:"المغرب",an:"Maghrib",time:""},
    {ar:"العشاء",an:"Isha",time:""}
  ]);
  const [newCity,setNewCity] = useState("")
  const [currentTime, setCurrentTime] = useState(getFormattedTime());
  const [selectElement, setSelectElement] = useState(""); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 1000);

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() =>GetAthanData(selectElement),[selectElement]);
  useEffect(() => {
    console.log("New date updated:", newDate);
  }, [newDate]);

  var srch = document.getElementById("srch");
  // var searchBtn = document.getElementById("search-btn");

  // Get the current date and time
  var currentDate = new Date();
  var day = currentDate.getDate().toString().padStart(2, '0'); // Add leading zeros
  var monthIndex = currentDate.getMonth();
  var year = currentDate.getFullYear();
  var monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  // Get the month name using the month index
  var month = monthNames[monthIndex];
  // Construct the desired date format
  var formattedDate = day + ' ' + month + ' ' + year;

  function updateClock(){
    var currentDate = new Date();
    // Get the current hour
    var currentHour = currentDate.getHours();
    // Get the current minutes
    var currentMinutes = currentDate.getMinutes().toString().padStart(2, "0");
  }

  function getFormattedTime() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes().toString().padStart(2, '0');
    return `${currentHour}:${currentMinutes}`;
  }

  function addNewCity(){
    let City =capitalizeFirstLetter(newCity) 
    const indexOfElement = cities.indexOf(City);
    if (indexOfElement == -1) {
      setCities( [...cities, City]);
      setNewCity("")    
    }
    setSelectElement(City)
    GetAthanData(selectElement);     
  }

  const OpenSideBar = () => setIsActive(!isActive)

  // GET-API-Request
  var GetAthanData = (city) => {
    var length = Object.keys(cities).length
    for(let i=0;i<length;i++){
      var key = Object.keys(cities);  // Get an array of keys
      var cityName = key[i];
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
      var T = athans.timings
      setNewDate(athans.date.hijri)
      console.log(newDate)
      getFormattedTime()
      setInterval(getFormattedTime, 1000);
      setAthanTime(prevAthanTime => prevAthanTime.map(prayer => {
        return {
          ...prayer,
          time: T[prayer.an]
        };
      }));
    });
  };
      
  function capitalizeFirstLetter(word) {
    var lowercaseWord = word.toLowerCase();
    var capitalizedWord = lowercaseWord.charAt(0).toUpperCase() + lowercaseWord.slice(1);
    return capitalizedWord;
  }

  return (
    <>
      <div id="container" style={{ height: "100vh", display: "flex", flexDirection: "row", justifyContent: "center",alignItems: "center", position: "relative" }}>
          <div id="sideBar" className={`${isActive ? 'hidden' : ''} sideBar`} >
              <div className="logo">
                <img src={Logo} alt="logo" style={{ marginLeft: '15px', cursor: 'pointer' }} />
                  <div className="search-div">
                      <input type="text" className="srch" placeholder="Enter your religion" value={newCity} onChange={(e) => setNewCity(e.target.value) }/>
                      <button id="search-btn" className="srch-btn" onClick={addNewCity}>
                          <img src={Search} alt="Search" className="srch-img" id="do-srch"/>
                      </button>
                  </div>
              </div>
              <select value={selectElement} onChange={(e) => setSelectElement(e.target.value)} >
              {cities.map((city, index) => (
                <option key={index}>{city}</option>
              ))}
              </select>
              <a href="#" className="aboutUs">About Us</a>
          </div> 
          <button id="btn" className={`${isActive ? 'pos-change' : ''} btn`} onClick={OpenSideBar}>
              <span className="material-symbols-outlined">
                  arrow_forward_ios
              </span>
          </button>
      </div>

      <div id="main-left" className="main">
        <h1 className="title">مواقيت الصلاة</h1>
        <ul id="lists">
        {Object.entries(athanTime).map(([key, value], index) => (
          <li key={index}><h3 className='mawa9it'> {value.time}</h3><h4>{value.ar}</h4></li>
        ))}
        </ul>
      </div>

      <div className="main-right">
        {/* Full Date */}
        <p><strong id="date">{newDate?.weekday.ar}<br/>{newDate?.day} {newDate?.month.ar} {newDate?.year}</strong></p>
        <h1 style={{ marginTop: "0" }}>{currentTime}</h1>
      </div>
    </>
  )
}

export default App
