const key = '2A5AF34JDAmAknGQw66VxGVzcdkHxs1f';
const proxy = 'https://cors-anywhere.herokuapp.com/';
// get weather information
const getWeather = async (id) => {
  const base = `${proxy}http://dataservice.accuweather.com/currentconditions/v1/`;
  const query = `${id}?apikey=${key}`;
  
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

// get city information
const getCity = async (city) => {
  const base = `${proxy}http://dataservice.accuweather.com/locations/v1/cities/search`;
  const query = `?apikey=${key}&q=${city}`;
  
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];   
};

//https://crossorigin.me/
//https://cors-anywhere.herokuapp.com/