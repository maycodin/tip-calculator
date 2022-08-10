let billEl = document.querySelector('#Bill');
let noOfPeopleEl = document.querySelector('#people');
let tipPercents = document.querySelectorAll('.cal-tip');
let tipAmountPerPersonEl = document.querySelector('#tip-per-person');
let totalAmountPerPersonEl = document.querySelector('#total-per-person')
let resetBtnEl = document.querySelector('.tip-reset-btn')
let cantBeZero = document.querySelector('.cal-input-2')


let billAmount = 0;
let noOfPeople = 0;
let tipPercent = 0;

billEl.addEventListener('keyup', e => {
    billAmount = Number(e.target.value);
    tipCalculator();
})

resetBtnEl.addEventListener('click', e => {
    billAmount = "$0.00";
    noOfPeople = "$0.00";
    resetValues(billAmount, noOfPeople)
    
})


noOfPeopleEl.addEventListener('keyup', e => {
    noOfPeople = Number(e.target.value);
    tipCalculator();
   
})
Array.from(tipPercents).forEach(tipPercentEl => {
    tipPercentEl.addEventListener('click', e => {
        // e.target.classList.add("active");
        if (e.target.innerText.includes('%')){
        tipPercent = Number(e.target.innerText.replace('%', ''))
        applyActiveClass(e.target.innerText);
        tipCalculator();
    }
    })
})

function tipCalculator (){
    let tipAmount = billAmount * (tipPercent / 100);
    let totalAmount = billAmount + tipAmount;
    let tipAmountPerPerson = tipAmount / noOfPeople;
    let totalAmountPerPerson = totalAmount / noOfPeople;
    
    

    
    updateValues({
        tipAmountPerPerson, 
        totalAmountPerPerson
    });
}

function updateValues({tipAmountPerPerson, totalAmountPerPerson}){
    tipAmountPerPersonEl.innerText = tipAmountPerPerson == Infinity ? 0 : tipAmountPerPerson.toFixed(2);
    totalAmountPerPersonEl.innerText = totalAmountPerPerson == Infinity ? 0 : totalAmountPerPerson.toFixed(2);
    if (noOfPeopleEl.value === '0') {
        instruct();
    } else{
        inverse();
    }
}

function resetValues(billAmount, noOfPeople) {
    tipAmountPerPersonEl.innerText = billAmount;
    totalAmountPerPersonEl.innerText = noOfPeople;
    billEl.value = null;
    noOfPeopleEl.value = null;
    Array.from(tipPercents).forEach((tipPercentEl) => {
    tipPercentEl.classList.remove('active')})
    inverse();
    

}

function applyActiveClass(innerTextpect){
    Array.from(tipPercents).forEach((tipPercentEl) => {
        if (tipPercentEl.innerText == innerTextpect){
            tipPercentEl.classList.add('active')
        } else {
            tipPercentEl.classList.remove('active')
        }
    })

}
function instruct(){
    cantBeZero.innerHTML += '<span style="text-align: center;color: green;">Can\'t be Zero<span>'
}
function inverse(){
    cantBeZero.innerHTML = 'Number of people'
}
