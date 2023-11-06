//    apikey 5gxWDeKhHKegqTJsy3rRvi:3g3ofM4mt1CM8MFfktVqnJ


// Element Seçimi 

const city = document.querySelectorAll(".form-select")[0];
const district = document.querySelectorAll(".form-select")[1];
const cards = document.querySelector(".cards-area");

const cityElement = document.querySelector(".cities");
const districtElement = document.querySelector(".districts");



const url = "https://api.collectapi.com/health/"
const headers = {
    "content-type":"application/json",
    "authorization":"apikey 5gxWDeKhHKegqTJsy3rRvi:3g3ofM4mt1CM8MFfktVqnJ"
}


eventListener();

function eventListener(){
    document.addEventListener("DOMContentLoaded",addOptionForCity);
    city.addEventListener("change",() => addOptionForDistrict(city.value));
    district.addEventListener("change", () => getData(city.value,district.value))
}


async function getCites(){
    this.url = url +"districtList/";
    const responese = await fetch(this.url,{method:"GET",headers:headers});
    const cityList = await responese.json();
    return cityList;
}

async function getDistrict(city){
     if(city !== undefined){
        this.url = url + "districtList?il=" + city;
        const responese = await fetch(this.url,{method:"GET",headers:headers});
        const districtList = await responese.json();
        return districtList;
     }
     else{
        return [];
     }
}

async function addOptionForCity(){
    const cities = await getCites();
    cities.result.forEach(city => {
        const optionItem = document.createElement("option");
        optionItem.value = city.text;
        optionItem.innerText = city.text;
        cityElement.parentElement.appendChild(optionItem);
    });
}

async function addOptionForDistrict(city){

    while (districtElement.parentElement.childElementCount !== 1) {
        districtElement.parentElement.removeChild(districtElement.parentElement.lastChild);
    }

    while (districtElement.parentElement.childElementCount === 1) {
        const districts = await getDistrict(city);
        districts.result.forEach(district => {
        const optionItem = document.createElement("option");
        optionItem.value = district.text;
        optionItem.innerText = district.text;
        districtElement.parentElement.appendChild(optionItem);
        });
    }

}

async function getData(city,district){
    while (cards.childElementCount !== 0) {
        cards.removeChild(cards.lastChild)
    }
    apiUrl =  url + "dutyPharmacy?ilce="+ district +"&il="+ city;
    const responese = await fetch(apiUrl,{method:"GET",headers:headers})
    const datas = await responese.json();

    datas.result.forEach(data => {
        const findCard = document.createElement("div");
        findCard.className = "find-card text-light shadow";
        findCard.innerHTML = `
        
                            <p class="find-card-title">${data.name}</p>
                            <p >${data.address}</p>
                            <p>${data.phone}</p>
                            <i class="fa-solid fa-location-dot" style="color: #ff0000; font-size: 40px; cursor: pointer;" onclick="window.open('https://google.com/maps/search/${data.loc}', '_blank')"><span style="font-size: 16px; color: white;">Tıkla</span></i>

                        
        `
        cards.appendChild(findCard);
    });

}

