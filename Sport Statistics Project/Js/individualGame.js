const url = window.location.search;
const searchParams = new URLSearchParams(url);
let team = searchParams.get("team");
const list= document.getElementById('list');

let scoreData = JSON.parse(localStorage.getItem('scoreData'));
let num_games = getGamesFromTeam(team).length;
let num_games_per_page = 10;
let curr_page = 1;
let max_page = num_games % num_games_per_page == 0 ? num_games / num_games_per_page : (num_games / num_games_per_page) + 1;
let spefData = getGamesFromTeam(team);

/*this function adds the games of the specifc team to a list*/
/*it updates pagination based on the amount of teams in the date range*/
function addGames(spefData){
    let date = getDates(spefData);
    if(date.length>0){changeNumGames();}
    spefData = getDatesInRange(spefData)
    spefData = spefData.slice((curr_page-1)*num_games_per_page, (curr_page-1)*num_games_per_page+num_games_per_page)
    list.innerHTML = '';
    
        
    date.forEach((date)=>{
        let label = document.createElement('strong')
        label.innerHTML = date + ":";
        let list = document.createElement("ul")
        spefData.forEach((game)=>{
            if((team === game.team1 || team === game.team2) && game.dateFull === date){
                let li = document.createElement("li")
                li.innerHTML = `<span>${team === game.team1?game.team1:game.team2} 
                ${team === game.team1?game.team1Score:game.team2Score} - 
                ${team === game.team1?game.team2Score:game.team1Score} 
                ${team === game.team1?game.team2:game.team1} - 
                ${team === game.team1 && game.team1Score>game.team2Score? team + " won":team === game.team2 && game.team2Score>game.team1Score?team + " won":team + " lost"}</span>`
                list.appendChild(li);
            }
        });
        let container = document.getElementById("list")
        if(!(list.children.length === 0)){
            container.appendChild(label);
            container.appendChild(list);
        }
        
    })
    
}

/*this gets all the dates of the team*/
function getDates(spefData){
    let arr = [];
    
    const dateInputStart = new Date(document.getElementById('dateStart').value).getTime();
    const dateInputEnd = new Date(document.getElementById('dateEnd').value).getTime();


    spefData.forEach((game)=>{
        if(!arr.includes(game.dateFull) && inRange(game.date, dateInputStart, dateInputEnd)){
            arr.push(game.dateFull)
        }
    })

    return arr;
}

/*this checks to see if the date is inrange of the starting and ending date*/
function inRange(date, dateStart, dateEnd){
    if(date>=dateStart && date<=dateEnd){
        return true;
    }else{
        return false;
    }
}

/*this gets all the games in score data that have the team*/
function getGamesFromTeam(team){
    let arr = [];
    scoreData.forEach((game)=>{
        if(team === game.team1 || team === game.team2){
            arr.push(game)
        }
    })
    return arr;
}

/*this function updates the pagination based on the date range*/
function updatePagination(){
    max_page = num_games % num_games_per_page == 0 ? num_games / num_games_per_page : (num_games / num_games_per_page) + 1;
    const ul = document.querySelector("#pagination");
    ul.innerHTML = '';
    for(let page = 1; page<=max_page; page++){
        const li = document.createElement('li');
        li.innerHTML = `<a class="pagination-link" aria-label="Goto page ${page}">${page}</a>`
        li.addEventListener("click", (e)=>{
           curr_page = parseInt(e.target.innerHTML);
           addGames(spefData); 
        })
        ul.append(li);
    }

}


addGames(spefData);
updatePagination();

/*this function changes teh variable num_games for pagination*/
function changeNumGames(){
    num_games = getDatesInRange(spefData).length;
    updatePagination();
}

/*this function gets all the games that 
have their date in range of the start and end date*/
function getDatesInRange(spefData){
    let arr = [];
    
    const dateInputStart = new Date(document.getElementById('dateStart').value).getTime();
    const dateInputEnd = new Date(document.getElementById('dateEnd').value).getTime();


    spefData.forEach((game)=>{
        if(inRange(game.date, dateInputStart, dateInputEnd)){
            arr.push(game)
        }
    })

    return arr;
}