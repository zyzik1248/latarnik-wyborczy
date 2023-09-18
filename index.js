const form = document.querySelector(".form-wrapper")
const questionsWrapper = document.querySelector(".question-wrapper")
const questionsBox = [...document.querySelectorAll(".question-box")]
const scoreWrapper = document.querySelector(".score-wrapper")
const scoreText = document.querySelector(".score-text span")
const next = document.querySelector(".next-btn")
const prev = document.querySelector(".prev-btn")
const restart = document.querySelector(".restart-btn")
const submitBtn = document.querySelector(".submit-btn")
const inputsTrue = [...document.querySelectorAll(".input-true")]
const inputsFalse = [...document.querySelectorAll(".input-false")]
const totalPoints = inputsTrue.length
let points = 0
let activeQuestion = 0;
let value = 0
const questionWidth = questionsBox[0].getBoundingClientRect().width


function activeButtons(){
    if(activeQuestion < totalPoints-1){
        next.disabled = false
    } else{
        next.disabled = true
    }

    if(activeQuestion === totalPoints-1){
        submitBtn.disabled = false
    }
}

restart.addEventListener("click", ()=>{
    points = 0
    activeQuestion = 0
    questionsWrapper.style.transform = `translateX(0)`
    scoreWrapper.classList.remove("active")
})

next.addEventListener("click", ()=>{
    points = points + value
    value = 0;
    activeQuestion++;
    questionsWrapper.style.transform = `translateX(-${activeQuestion*questionWidth}px)`
    next.disabled = true
    if(activeQuestion > 0){
        prev.disabled = false
    } else{
        prev.disabled = true
    }

    if(activeQuestion === totalPoints-1 && (inputsFalse[totalPoints-1].checked || inputsTrue[totalPoints-1].checked)){
        submitBtn.disabled = false
    }
})

prev.addEventListener("click", ()=>{
    activeQuestion--
    questionsWrapper.style.transform = `translateX(-${activeQuestion*questionWidth}px)`
    next.disabled = false
    
    if(activeQuestion > 0){
        prev.disabled = false
    } else{
        prev.disabled = true
    }
    submitBtn.disabled = true
})

inputsTrue.map((input)=>{
    input.addEventListener("change",(e)=>{
        value = 1
        activeButtons();
    })
})

inputsFalse.map((input)=>{
    input.addEventListener("change",(e)=>{
        value = 0
        activeButtons();
    })
})

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    points = points + value
    value = 0
    scoreText.innerHTML = points/totalPoints*100
    scoreWrapper.classList.add("active")
})