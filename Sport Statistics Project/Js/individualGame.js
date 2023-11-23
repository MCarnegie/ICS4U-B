const url = window.location.search;
const searchParams = new URLSearchParams(url);
let team = searchParams.get("team");

let scoreData = JSON.parse(localStorage.getItem('scoreData'));
function addGames(){
    scoreData.forEach((game)=>{
        let list = document.querySelector("ul")
        if(team === game.team1 || team === game.team2){
            let li = document.createElement("li")
            li.innerHTML = `<span>${team === game.team1?game.team1:game.team2}: 
            ${team === game.team1?game.team1Score:game.team2Score} - 
            ${team === game.team1?game.team2:game.team1}: 
            ${team === game.team1?game.team2Score:game.team1Score} - 
            ${team === game.team1 && game.team1Score>game.team2Score? "won":"lost"}</span>`
            list.appendChild(li);
        }
    });
}

addGames();