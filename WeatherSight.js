const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const input = document.querySelector('.search-box input');
const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');
const APIKey = '658767b0ae936b022f59a69f44868419';

const locationIcon = document.querySelector('.fa-location-dot');
locationIcon.addEventListener('click', async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${APIKey}`);
        const json = await response.json();
        input.value = json.name;
        const searchBtn = document.querySelector('.search-box button');
        searchBtn.click();
      } catch (error) {
        console.error(error);
      }
    });
  }
});

search.addEventListener('click', async () => {
    const city = input.value;
  
    const accessKey = "LWo0sjUqthMa5iOKRuO21rDIwEV2mdnelI_XF9Vw1lo";
    fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${accessKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const imageUrl = data.results[randomIndex].urls.full;
        document.body.style.backgroundImage = `url('${imageUrl}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
      } else {
        console.log("Nenhuma imagem encontrada.");
      }
    })
    .catch(error => console.error("Erro ao buscar imagem:", error));
  
    if (city === '') {
        return;
    }
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
        const json = await response.json();
        
        if (response.ok) {
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Haze':
                    image.src = 'images/haze.png';
                    break;
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                case 'Fog':
                    image.src = 'images/fog.png';
                    break;
                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        } else if (json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
        } else {
            throw new Error('Something went wrong.');
        }
    } catch (error) {
        console.error(error);
    }
});
