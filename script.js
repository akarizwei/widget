let weather = [
    {
        date: 1559419200000,
        temperature: {
            night: 16,
            day: 26,
        },
        cloudiness: 'Ясно',
        snow: false,
        rain: false,
    },
    {
        date: 1559505600000,
        temperature: {
            night: 19,
            day: 29,
        },
        cloudiness: 'Облачно',
        snow: false,
        rain: true,
    },
    {
        date: 1559592000000,
        temperature: {
            night: 12,
            day: 21,
        },
        cloudiness: 'Облачно',
        snow: false,
        rain: false,
    },
    {
        date: 1559678400000,
        temperature: {
            night: 16,
            day: 26,
        },
        cloudiness: 'Переменная облачность',
        snow: true,
        rain: false,
    },
    {
        date: 1559764800000,
        temperature: {
            night: -1,
            day: 2,
        },
        cloudiness: 'Облачно',
        snow: true,
        rain: true,
    },
];

let addition = 1,
    length = weather.length - 3;

let nextBtn = document.getElementById('next');
nextBtn.addEventListener('click', nextClick);

let prevBtn = document.getElementById('prev');
prevBtn.addEventListener('click', prevClick);

function nextClick() {
    addition+=1;
    if(addition >= length){
        nextBtn.setAttribute("disabled","");
        nextBtn.classList.add('inactive');
        addition = length;
    }
    prevBtn.removeAttribute("disabled");
    prevBtn.classList.remove('inactive');
    setWeatherData();
}

function prevClick() {
    addition-=1;
    if (addition <= 0){
        prevBtn.setAttribute("disabled","");
        prevBtn.classList.add('inactive');
        addition = 0;
    }
    nextBtn.removeAttribute("disabled");
    nextBtn.classList.remove('inactive');
    setWeatherData();
}



const a = document.querySelectorAll(".info");

function setWeatherData(){
    a.forEach(function(element, index){
        index = index + addition;
        let innerCollection = element.getElementsByTagName('*');
        let date = new Date(weather[index]["date"]);

        innerCollection[0].innerHTML=date.toLocaleString('ru', {weekday: 'long', month: 'long', day: 'numeric'});
        innerCollection[2].innerHTML="Днём: " + weather[index]["temperature"]["day"] + "°";
        innerCollection[3].innerHTML="Ночью: " + weather[index]["temperature"]["night"] + "°";
        innerCollection[4].innerHTML=weather[index]["cloudiness"];

        if (weather[index]["snow"] === true && weather[index]["rain"] === true){
            innerCollection[5].innerHTML= "Снег с дождем";
            innerCollection[1].classList.add("imgsnow");
            innerCollection[1].classList.remove("imgrain", "imgcloud", "imgsun", "imgvariative");

        } else if (weather[index]["snow"] === true && weather[index]["rain"] === false){
            innerCollection[5].innerHTML= "Снег";
            innerCollection[1].classList.add("imgsnow");
            innerCollection[1].classList.remove("imgrain", "imgcloud", "imgsun", "imgvariative");
        } else if (weather[index]["rain"] === true && weather[index]["snow"] === false){
            innerCollection[5].innerHTML= "Дождь";
            innerCollection[1].classList.add("imgrain");
            innerCollection[1].classList.remove("imgsnow", "imgcloud", "imgsun", "imgvariative");
        } else {
            innerCollection[5].innerHTML= "Без осадков";
            if (weather[index]["cloudiness"] === "Ясно"){
                innerCollection[1].classList.add("imgsun");
                innerCollection[1].classList.remove("imgsnow", "imgcloud", "imgrain", "imgvariative");
            } else if (weather[index]["cloudiness"] === "Облачно"){
                innerCollection[1].classList.add("imgcloud");
                innerCollection[1].classList.remove("imgsnow", "imgsun", "imgrain", "imgvariative");
            } else {
                innerCollection[1].classList.add("imgvariative");
                innerCollection[1].classList.remove("imgsnow", "imgsun", "imgrain", "imgcloud");
            }


        }
    })
}

setWeatherData();
