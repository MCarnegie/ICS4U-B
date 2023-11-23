const url = window.location.search;
const searchParams = new URLSearchParams(url);
let team = searchParams.get("team");

let scoreData = JSON.parse(localStorage.getItem('scoreData'));
function addGames(){
    let week = getWeeks();
    week.forEach((week)=>{
        let label = document.createElement("label")
        label.innerHTML = "week " + week + ":";
        let list = document.createElement("ul")
        scoreData.forEach((game)=>{
            if((team === game.team1 || team === game.team2) && game.week === week){
                let li = document.createElement("li")
                li.innerHTML = `<span>${team === game.team1?game.team1:game.team2}: 
                ${team === game.team1?game.team1Score:game.team2Score} - 
                ${team === game.team1?game.team2:game.team1}: 
                ${team === game.team1?game.team2Score:game.team1Score} - 
                ${team === game.team1 && game.team1Score>game.team2Score? "won":team === game.team2 && game.team2Score>game.team1Score?"won":"lost"}</span>`
                list.appendChild(li);
            }
        });
        label.appendChild(list);
        let container = document.getElementById("list")
        container.appendChild(label);
    })
    
}

function getWeeks(){
    let arr = [];
    scoreData.forEach((game)=>{
        if(!arr.includes(game.week)){
            arr.push(game.week)
        }
    })

    return arr;
}

addGames();