const apiKey = "&appid=482b3fe0ecdcec6630cfc5620a7c4d8a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
const units = "&units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card");

async function checkWeather(city){
    
    const response = await fetch(apiUrl + `q=${city}` + apiKey + units);

    if (response.status == 404 || city === ""){
        document.querySelector(".error").style.display="block";
        document.querySelector(".error").style.transition=".5s";
        document.querySelector(".weather").style.display="none";
        card.style.height="26.5vh";
        card.style.transition=".3s";
        document.querySelector(".defaultText").style.marginTop="30px";
        document.querySelector(".defaultText").style.display="flex";

        setInterval(() => {
            let emoji = document.querySelector(".invalidEmoji");
            if(emoji.style["visibility"]=="hidden"){
                emoji.style["visibility"]="visible";
            }
            else
            {
                emoji.style["visibility"]="hidden";
            }
        }, 500);
    }
    else{

        var data = await response.json();
        
        document.querySelector(".error").style.display="none";
        card.style.height="80vh";
        card.style.transition=".5s";
        document.querySelector(".weather").style.display="flex";
        document.querySelector(".defaultText").style.display="none";

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " kmph";

        let weatherDetails = await data.weather[0].main.toLowerCase();
        weatherIcon.src = `./images/${weatherDetails}.png`;

        let startColor = "#ff9f9f";
        let endColor = "#2478c2";

        if (weatherDetails == "clear"){ //done
            startColor="#ffffff";
            endColor="#C85400";
        }
        else if (weatherDetails == "clouds"){ //done
            startColor="#CACACA";
            endColor="#00164B";
        }
        else if (weatherDetails == "drizzle"){ //done
            startColor="gray";
            endColor="black";
        }
        else if (weatherDetails == "haze"){ //done
            startColor="#c2c2c2";
            endColor="#262626";
        }
        else if (weatherDetails == "mist"){ //done
            startColor="#8A6A6A";
            endColor="#003B86";
        }
        else if (weatherDetails == "rain"){ //done
            startColor="#00A3E1";
            endColor="#424242";
        }
        else if (weatherDetails == "snow"){ //done
            startColor="aqua";
            endColor="blue";
        }
        else if (weatherDetails == "thunderstorm"){ //done
            startColor="#4a4a4a";
            endColor="#00009b";
        }
        else if (weatherDetails == "smoke"){ //done
            startColor="black";
            endColor="#816388";
        }
        else{
            startColor = "#ff9f9f";
            endColor = "#2478c2";
        }

        await changeColor(startColor, endColor);
        searchBox.value= "";
        searchBox.setAttribute("placeholder", city);
}
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

window.addEventListener("keydown", (e)=>{
    if (e.key === "Enter"){
        searchBtn.click();
        searchBox.setAttribute("inputmode", "none"); 
    }
});

async function changeColor(startColor, endColor){
    card.style.background= `linear-gradient(135deg, ${startColor}, ${endColor})`;
}