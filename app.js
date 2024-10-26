const BaseURL = "https://v6.exchangerate-api.com/v6/b93a8c3e79bb3cad58e1eaec/latest/"; 

const btn = document.getElementById("ex-btn");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


const dropdowns = document.querySelectorAll('.dropdown select'); 


for(let select of dropdowns){
    for(let code in countryList){
        let newOption = document.createElement('option');
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === 'from' && code === "USD"){
            newOption.selected = true;
        }
        if(select.name === 'to' && code === "BDT"){
            newOption.selected = true;
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        UpdateFlag(evt.target);
    })
}

// const preventSameCurrency = () => {
//     //enable all option first
//     console.log(fromCurr);
//     for(let option of fromCurr.options){
//         console.log(option);
//     }
// }

// preventSameCurrency();

const UpdateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode]; // country code will be BD, IN, EU
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}


btn.addEventListener('click', async (evt) => {
    evt.preventDefault();
    updateExchangeValue();
})

const updateExchangeValue = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal <= 0){
        alert("Please enter a valid amount");
        amtVal = 1;
        amount.value = 1;
    }

    const URL = `${BaseURL}/${fromCurr.value}`;
    let response = await fetch(URL);
    
    let data = await response.json();
    console.log(data);
    // let convertionRate = response.conversion_rates[toCurr.value];
    let convertionRate = data.conversion_rates[toCurr.value];
    // console.log(convertionRate);
    let finalAmount = amount.value * convertionRate;
    console.log(finalAmount.toFixed(2));
    msg.innerHTML = `<h3> ${amount.value} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value} </h3>`;
}


window.addEventListener('load', async () => {
    updateExchangeValue();
})