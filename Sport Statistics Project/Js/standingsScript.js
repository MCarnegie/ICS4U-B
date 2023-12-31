// Gets the table body, scoreData, table head, previous headers, and converts the headers into an array
// It also initializes variables that are used later
const tbody = document.querySelector('tbody')
let scoreData = JSON.parse(localStorage.getItem('scoreData')) || [];
let sortedStats;
var w;
let thead = document.querySelector("thead");
let headers = thead.querySelector("tr");
let allHeads = headers.innerHTML;
let arr = Array.from(thead.querySelector("tr").children);

/* This function updates the width of the table if the screen gets to a certain width */
function updateWidth() {
    w = window.innerWidth;
    if(w<=800){
        thead.innerHTML = '';
        let row = document.createElement('tr');
        for(let i = 0; i<arr.length; i++){
            if([0, 1, 3, 5].includes(i)){
                row.appendChild(arr[i])
            }
        }
        thead.appendChild(row)
        updateTable();
        
    }else{
        thead.innerHTML = '';
        let row = document.createElement('tr');
        row.innerHTML = allHeads
        thead.appendChild(row)
        updateTable();
    }
}

/* This function updates the table to sort it by position descending 
   It also saves this state into sortedStats */
function updateTable(){
    let allStats = getAllStats();
    allStats = getNoSortPos(allStats)
    sortedStats = allStats;
    addElements(allStats);
}

/* This function sorts the array of stats into position descending */
function getNoSortPos(allStats){
    allStats.sort((a, b) =>{
        if(a.points>b.points){
            return -1;
        }else{
            return 1;
        }
    }).forEach((stat, i)=>{
        stat.pos = i+1;
    })

    return allStats
}

/* Variables for pagination */
let num_teams = getTeams().length;
let num_teams_per_page = 5;
let curr_page = 1;
let max_page = num_teams % num_teams_per_page == 0 ? num_teams / num_teams_per_page : (num_teams / num_teams_per_page) + 1;

/* This function adds elements to the table based on pagination and width of the table */
function addElements(stats) {
    tbody.innerHTML = '';
    stats = stats.slice((curr_page-1)*num_teams_per_page, (curr_page-1)*num_teams_per_page+num_teams_per_page)
    stats.forEach((stat, i)=>{
        let row = document.createElement("tr");
        for(const a in stat){
            let t = "" + stat[a];
            let td = document.createElement("td");
            td.innerHTML = stat[a];
            if(a === "team"){
                td.innerHTML = ''
                let a = document.createElement('a')
                a.innerHTML = t
                a.href = `teamGames.html?team=${t}`
                td.appendChild(a);
            }
            if(w<=800){
                    if(["pos","team", "win", "loss"].includes(a)){
                        row.appendChild(td);
                    }
            }else{
                     row.appendChild(td);
            }
           
        }

        tbody.appendChild(row);
    })
}

/* This function updates the pagination of the table */
function updatePagination(){
    const ul = document.querySelector("#pagination");
    for(let page = 1; page<=max_page; page++){
        const li = document.createElement('li');
        li.innerHTML = `<a class="pagination-link" aria-label="Goto page ${page}">${page}</a>`
        li.addEventListener("click", (e)=>{
           curr_page = parseInt(e.target.innerHTML);
           addElements(sortedStats)
        })
        ul.append(li);
    }

}


/* This function gets the stats of one team based on all of the games
   and makes it into a class that can be used for the table */
function getTeams() {
    let arr =[]
    scoreData.forEach((team)=>{
        
        if(!arr.includes(team.team1)){
            arr.push(team.team1)
        }
        if(!arr.includes(team.team2)){
            arr.push(team.team2)
        }
            
    })
    return arr;
}


/*this function gets the stats of one team based on all of the games
and makes it into a class that can be used for the table
*/
function getTeamStats(team) {
   let plyd = scoreData.reduce((num, game, index)=>{
        if(team === game.team1 || team=== game.team2){
            num++
            return num;
        }
        return num;           
   }, 0)
   let pos;
   let win = 0;
   let loss = 0;
   let draw = 0;
   let gf = 0;
   let ga = 0;
    
    scoreData.forEach((game, i)=>{
            let score1;
            let score2;
            if(team === game.team1){
                score1 = game.team1Score;
                score2 = game.team2Score;
            }else if(team === game.team2){
                score1 = game.team2Score;
                score2 = game.team1Score;
            }
            if(!(score1 ===undefined) && !(score2 === undefined) ){
                if(score1>score2)
                    win++;
                else if(score1<score2)
                    loss++;
                else
                    draw++;

                gf += score1
                ga += score2
            }
    })
    let gd = gf-ga;
    let points = win*3 + draw;
    return {pos, team, plyd, win, draw, loss, gf, ga, gd, points}
    
    
}

/* This function gets all the stats of every team and puts it into an array */
function getAllStats() {
    let teams = getTeams();
    let allStats = []

    teams.forEach((team) =>{
        let teamStat = getTeamStats(team);

        allStats.push(teamStat)
    })

    return allStats
}

/* The rest of these functions sort the table worth to best or vice versa based on the header clicked. */
let isOn = true
function decending(sort) {
    let allStats = getAllStats();
    allStats = getNoSortPos(allStats);
    
    if(isOn){
        allStats = sort(allStats, 1)
        tbody.innerHTML = '';
        sortedStats = allStats;
        addElements(allStats);
        isOn = false;
    }else{
        allStats = sort(allStats, -1)
        tbody.innerHTML = '';
        sortedStats = allStats;
        addElements(allStats);
        isOn = true;
    }
}


function pos() {
    decending((stat, num)=>{
        stat.sort((a, b) =>{
            if(a.pos<b.pos){
                return num;
            }else
                return num*-1;
            
        })

        return stat
    });
}

function plyd() {
    decending((stat, num)=>{
        stat.sort((a, b) =>{
            if(a.plyd>b.plyd){
                return num *-1;
            }else
                return num;
            
        })

        return stat
    });
}

function win(){
    decending((stat, num)=>{
        stat.sort((a, b) =>{
            if(a.win>b.win){
                return num *-1;
            }else
                return num;
            
        })

        return stat
    });
}

function draw() {
    decending((stat, num)=>{
        stat.sort((a, b) =>{
            if(a.draw>b.draw){
                return num *-1;
            }else
                return num;
            
        })

        return stat
    });
}

function loss() {
    decending((stat, num)=>{
        stat.sort((a, b) =>{
            if(a.loss>b.loss){
                return num *-1;
            }else
                return num;
            
        })

        return stat
    });
}

function gf(){
    decending((stat, num)=>{
        stat.sort((a, b) =>{
            if(a.gf>b.gf){
                return num *-1;
            }else
                return num;
            
        })

        return stat
    });
}

function ga(){
    decending((stat, num)=>{
        stat.sort((a, b) =>{
            if(a.ga>b.ga){
                return num *-1;
            }else
                return num;
            
        })

        return stat
    });
}

function gd(){
    decending((stat, num)=>{
        stat.sort((a, b) =>{
            if(a.gd>b.gd){
                return num *-1;
            }else
                return num;
            
        })

        return stat
    });
}
updateTable();
updatePagination();
