const cityForm = document.querySelector('form'),
  card = document.querySelector('.card'),
  time = document.querySelector('img.time'),
  icon = document.querySelector('.icon img'),
  details = document.querySelector('.details');

const updateUI = (data) => {
  
  const cityDets = data.cityDets;
  const weather = data.weather;
  
  details.innerHTML = 
    `<div class="details">
       <h5>${cityDets.EnglishName}</h5>
       
       <div class="condition">${weather.WeatherText}</div>
       <div class="info">
         <span>${weather.Temperature.Metric.Value}</span>
         <span>&deg;C</span>
       </div>
    </div>
  `;

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = weather.IsDayTime ? 'img/day.svg' :  'img/night.svg';
  time.setAttribute('src', timeSrc);

  if(card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

const updateCity = async city => {
 
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  
  return {
    cityDets: cityDets,
    weather: weather
  };
   
};

//  Updating UI 
cityForm.addEventListener('submit', e => {
  //prevent default action
  e.preventDefault();   
   
  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();
  
  //update ui with the new city
  updateCity(city)
    .then(data => updateUI(data))
    .then(err => console.log(err));

    localStorage.setItem('city', city);

});

if(localStorage.getItem('city')) {
  updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
