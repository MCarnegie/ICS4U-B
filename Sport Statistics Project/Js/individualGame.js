const url = window.location.search;
const searchParams = new URLSearchParams(url);
let team = searchParams.get("team");
const list= document.getElementById('list');

let scoreData = JSON.parse(localStorage.getItem('scoreData'));
function addGames(){
    list.innerHTML = '';
    let week = getWeeks();
    week.forEach((week)=>{
        let label = document.createElement('strong')
        label.innerHTML = "Week " + week + ":";
        let list = document.createElement("ul")
        scoreData.forEach((game)=>{
            if((team === game.team1 || team === game.team2) && game.week === week){
                let li = document.createElement("li")
                li.innerHTML = `<span>${team === game.team1?game.team1:game.team2} 
                ${team === game.team1?game.team1Score:game.team2Score} - 
                ${team === game.team1?game.team2Score:game.team1Score} 
                ${team === game.team1?game.team2:game.team1} - 
                ${team === game.team1 && game.team1Score>game.team2Score? team + " won":team === game.team2 && game.team2Score>game.team1Score?team + " won":team + " lost"}</span>`
                list.appendChild(li);
            }
        });
        // label.appendChild(list);
        let container = document.getElementById("list")

        container.appendChild(label);
        container.appendChild(list);
    })
    
}

function getWeeks(){
    let arr = [];
    const weekInputStart = document.getElementById('weekStart');
    const weekStart = parseInt(weekInputStart.value);
    const weekInputEnd = document.getElementById('weekEnd');
    const weekEnd = parseInt(weekInputEnd.value);

    scoreData.forEach((game)=>{
        if(!arr.includes(game.week) && inRange(game.week, weekStart, weekEnd)){
            arr.push(game.week)
        }
    })

    return arr;
}

function inRange(week, weekStart, weekEnd){
    if(parseInt(week)>=weekStart && parseInt(week)<=weekEnd){
        return true;
    }else{
        return false;
    }
}

addGames();

