    const KJ = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
    const Lewica = [true, true, true, true, true, true, true, true, false, false, true, true, false, true, true, true, true, true, false, false, true]
    const pointsDecription = [[...KJ], [...Lewica]]

    const form = document.querySelector(".form-wrapper")
    const questionsWrapper = document.querySelector(".question-wrapper")
    const questionsBox = [...document.querySelectorAll(".question-box")]
    const scoreWrapper = document.querySelector(".score-wrapper")
    const scoreText = [...document.querySelectorAll(".score-text span")]
    const next = document.querySelector(".next-btn")
    const prev = document.querySelector(".prev-btn")
    const restart = document.querySelector(".restart-btn")
    const submitBtn = document.querySelector(".submit-btn")
    const inputsTrue = [...document.querySelectorAll(".input-true")]
    const inputsFalse = [...document.querySelectorAll(".input-false")]
    const totalQuestions = inputsTrue.length
    let points = [0, 0]
    let activeQuestion = 0;
    let isTrue = false
    const questionWidth = questionsBox[0].getBoundingClientRect().width

    questionsWrapper.style.width = `${totalQuestions*100}vw`
    
    function addPoints(){
        for(let i=0; i<pointsDecription.length; i++){
            if(isTrue && pointsDecription[i][activeQuestion] || !isTrue && !pointsDecription[i][activeQuestion]){
                points[i] = points[i]+1 
            }
        }
        isTrue = false
    }
    
    function activeButtons(){
        if(activeQuestion < totalQuestions-1){
            next.disabled = false
        } else{
            next.disabled = true
        }
    
        if(activeQuestion === totalQuestions-1){
            submitBtn.disabled = false
        }
    }
    
    restart.addEventListener("click", ()=>{
        for(let i = 0; i<totalQuestions-1; i++){
            points[i]=0
        }
        activeQuestion = 0
        questionsWrapper.style.transform = `translateX(0)`
        scoreWrapper.classList.remove("active")
    })
    
    next.addEventListener("click", ()=>{
        addPoints()
        activeQuestion++;
        questionsWrapper.style.transform = `translateX(-${activeQuestion*questionWidth}px)`
        next.disabled = true
        if(activeQuestion > 0){
            prev.disabled = false
        } else{
            prev.disabled = true
        }
    
        if(activeQuestion === totalQuestions-1 && (inputsFalse[totalQuestions-1].checked || inputsTrue[totalQuestions-1].checked)){
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
            isTrue = true
            activeButtons();
        })
    })
    
    inputsFalse.map((input)=>{
        input.addEventListener("change",(e)=>{
            isTrue = false
            activeButtons();
        })
    })
    
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        addPoints();
        for(let i=0; i<pointsDecription.length; i++){
            scoreText[i].innerHTML = (points[i]/totalQuestions*100).toFixed(2)
        }
        scoreWrapper.classList.add("active")
    })