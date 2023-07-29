const form = document.querySelector(".question-wrapper")
const questionsBox = [...document.querySelectorAll(".question-box")]

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

    const maxPoints = Math.max(...parties.map(party => party.points))
    const wonParty = parties.find(party => party.points === maxPoints)
    alert(wonParty.name)
})