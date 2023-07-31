const form = document.querySelector(".question-wrapper")
const questionsBox = [...document.querySelectorAll(".question-box")]
const scoreWrapper = document.querySelector(".score-wrapper")
const scores = [...document.querySelectorAll(".score")]

const parties = [
    {
        name: "Republikanie",
        answers: [true, false, false],
        points: 0,
    },
    {
        name: "Socjaldemokraci",
        answers: [true, false, true],
        points: 0,
    },
    {
        name: "Liberałowie",
        answers: [false, true, false],
        points: 0,
    },
]

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    for(let i=0; i<questionsBox.length; i++){
        parties.map((party)=>{
            if(party.answers[i] === e.target[`q${i+1}-a1`].checked){
                party.points++
            }
        })
    }

    parties.sort((partyA, partyB)=>{
        return partyB.points - partyA.points
    })

    parties.map((party, index)=>{
        scores[index].innerHTML = `${party.name} ${(party.points/questionsBox.length*100).toFixed(2)}%`
    })

    scoreWrapper.classList.add("active")
})