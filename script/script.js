
// Текущий месяц
let carentMonth = new Date().getMonth()
// Текущий день
let carentDate = new Date().getDate()

function getFuel(){

    const hours = document.querySelector('#hours')  
    const minutes = document.querySelector('#minutes') 
    const from = document.querySelector('#from')

    let beginHours = document.getElementById('elem1').value
    let beginMinutes = document.getElementById('elem2').value
    let endHours = document.getElementById('elem3').value
    let endMinutes = document.getElementById('elem4').value
//Начальная точка отсчета
    let carentDayBegin = new Date(2022, `${carentMonth}`, `${carentDate}`,`${beginHours}`,`${beginMinutes}`)
//Финальная точка отсчета
    let carentDayEnd = new Date(2022, `${carentMonth}`, `${carentDate}`,`${endHours}`,`${endMinutes}`)

// Если больше суток то..
    if(carentDayBegin > carentDayEnd){
        carentDayEnd = new Date(2022, `${carentMonth}`, `${carentDate + 1}`,`${endHours}`,`${endMinutes}`)
    }

//Расчет
    let giff = carentDayEnd - carentDayBegin
// Часы
    let hoursCalc = Math.floor(giff / 1000 / 60 / 60 % 60)
//Минуты
    let minutesCalc = Math.floor(giff / 1000 / 60 % 60)

// Итого часов
    hours.innerText = hoursCalc < 10 ? '0' + hoursCalc : hoursCalc

// Итого минут
    minutes.innerText = minutesCalc < 10 ? '0' + minutesCalc : minutesCalc
// Итоги "C"
    from.innerText = `${beginHours} : ${beginMinutes}`

    calcFuelDt(hoursCalc, minutesCalc)
    calcFuelAb(hoursCalc, minutesCalc, carentDayEnd)
}

function calcFuelDt(hours, minutes){
    const dt = document.querySelector('#dt')

    let result = (hours * 4) + (minutes * 4 / 60)

    dt.innerText = result.toFixed(1) + " л"
}

function calcFuelAb(hours, minutes, carentDayEnd){

    const ab = document.querySelector('#ab')
    const halfFuel = document.querySelector('#half-fuel')
    const worked = document.querySelector('#worked')
    const till = document.querySelector('#till')
    const fromtill = document.querySelector('#from-till')

// Всего топлива ( 50 )
    let result = (hours * 5.2) + (minutes * 5.2 / 60)

// Половину топлива переводим в часы ((50 / 2) /5.2) == 4.85
    let half = ((result / 2) / 5.2).toFixed(2)

// Часов наработано
    let oneHours = Math.trunc(half)

// Минут наработано
    let oneMinutes = ((half % 1) * 10 * 6).toFixed(0)

    let tillTime = new Date(2022, `${carentMonth}`, `${carentDate}`, `${oneHours}`, `${oneMinutes}`)

// Получаем время оканчания первого 
    let all = carentDayEnd - tillTime

// Часы оканчания первого
    let oneHoursSecond = Math.floor(all / 1000 / 60 / 60 % 60)

// Минуты оканчания первого
    let oneMinutesSecond = Math.floor(all / 1000 / 60 % 60)
    oneMinutesSecond = oneMinutesSecond < 10 ? '0' + oneMinutesSecond : oneMinutesSecond

    ab.innerText = result.toFixed(2) + " л"

// Условие разделения на 2
    if(result > 36){
        halfFuel.innerText = (result /2).toFixed(2) + " л"
        worked.innerText = `${oneHours}ч  ${oneMinutes}м`
        till.innerText = `${oneHoursSecond} : ${oneMinutesSecond}`
    } else {
        halfFuel.innerText = 'Не надо'
        worked.innerText = 'Не надо'
        fromtill.innerText = ''
    }
}
// autofocus
function mover(e, prev, current, next){
    let length = document.getElementById(current).value.length
    let maxLength = document.getElementById(current).getAttribute("maxlength")

    if(length == maxLength){
        if(next !== ""){
            document.getElementById(next).focus()
        }
    }
    if(e.key == "Backspace", length == 0){
        if(prev !== ""){
            document.getElementById(prev).focus()
        }
    }
    if(next == "" && length == 2 ){
        getFuel()
    }
}

//nightwall

let shift = document.querySelector('.toggle')
let shiftOn = document.querySelector('.toggle__on')
let nightElemBody = document.querySelector('body')
let nightElemEngine = document.querySelector('.engine')
let nightElemOptionsBlock = document.querySelector('.options__block')
let nightElemOptionsHeader = document.querySelector('.options__header')
let nightElemEngineOptionsTj = document.querySelector('.engine__options-TJ')
let nightElemEngineOptionsAb = document.querySelector('.engine__options-AB')
let nightElemEngineOptionsHalf = document.querySelector('.options__block-half')
let nightElemEngineOptionsWorked = document.querySelector('.options__block-worked')
let nightElemInerMain = document.querySelector('.inner__main')


shift.onclick = () =>{
    shiftOn.classList.toggle('shift')
    shift.classList.toggle('background')
    nightElemBody.classList.toggle('night__body')
    nightElemEngine.classList.toggle('night__engine')
    nightElemOptionsBlock.classList.toggle('night__engine')
    nightElemOptionsHeader.classList.toggle('night__engine')
    nightElemEngineOptionsTj.classList.toggle('night__engine')
    nightElemEngineOptionsAb.classList.toggle('night__engine')
    nightElemEngineOptionsHalf.classList.toggle('night__engine')
    nightElemEngineOptionsWorked.classList.toggle('night__engine')
    nightElemInerMain.classList.toggle('night__iner-elem')
}

