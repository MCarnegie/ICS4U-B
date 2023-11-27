const url = window.location.search;
const searchParams = new URLSearchParams(url);
let team = searchParams.get("team");
const list= document.getElementById('list');

let scoreData = JSON.parse(localStorage.getItem('scoreData'));
let num_games = getGamesFromTeam(team).length;
let num_games_per_page = 2;
let curr_page = 1;
let max_page = num_games % num_games_per_page == 0 ? num_games / num_games_per_page : (num_games / num_games_per_page) + 1;


function addGames(maxData){
    maxData = maxData.slice((curr_page-1)*num_games_per_page, (curr_page-1)*num_games_per_page+num_games_per_page)
    list.innerHTML = '';
    let week = getWeeks(maxData);
    week.forEach((week)=>{
        let label = document.createElement('strong')
        
        label.innerHTML = "Week " + week + ":";
        
        
        let list = document.createElement("ul")
        maxData.forEach((game)=>{
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
        if(!(list.children.length === 0)){
            container.appendChild(label);
            container.appendChild(list);
        }
        
    })
    
}

function getWeeks(maxData){
    let arr = [];
    const weekInputStart = document.getElementById('weekStart');
    const weekStart = parseInt(weekInputStart.value);
    const weekInputEnd = document.getElementById('weekEnd');
    const weekEnd = parseInt(weekInputEnd.value);

    maxData.forEach((game)=>{
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

function getGamesFromTeam(team){
    let arr = [];
    scoreData.forEach((game)=>{
        if(team === game.team1 || team === game.team2){
            arr.push(game)
        }
    })
    return arr;
}
function updatePagination(){
    const ul = document.querySelector("#pagination");
    for(let page = 1; page<=max_page; page++){
        const li = document.createElement('li');
        li.innerHTML = `<a class="pagination-link" aria-label="Goto page ${page}">${page}</a>`
        li.addEventListener("click", (e)=>{
           curr_page = parseInt(e.target.innerHTML);
           addGames(scoreData); 
        })
        ul.append(li);
    }

}

addGames(scoreData);
updatePagination();

