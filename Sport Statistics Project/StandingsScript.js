//populating the table
const tbody = document.querySelector('tbody')
let scoreData = JSON.parse(localStorage.getItem('scoreData')) || [];

function updateTable(){
    let allStats = getAllStats();

    allStats = getNoSortPos(allStats)

    addElements(allStats);
}

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

function addElements(stats) {
    tbody.innerHTML = '';
    stats.forEach((stat, i)=>{
        let row = document.createElement("tr");
        for(const a in stat){
            let td = document.createElement("td");
            td.innerHTML = stat[a]
            row.appendChild(td);
        }
        tbody.appendChild(row)
    })
}

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

function getAllStats() {
    let teams = getTeams();
    let allStats = []

    teams.forEach((team) =>{
        let teamStat = getTeamStats(team);
        allStats.push(teamStat)
    })

    return allStats
}

let isOn = true
function decending(sort) {
    let allStats = getAllStats();
    allStats = getNoSortPos(allStats);
    
    if(isOn){
        allStats = sort(allStats)
        tbody.innerHTML = '';
        addElements(allStats);
        isOn = false;
    }else{
        tbody.innerHTML = '';
        updateTable();
        isOn = true;
    }
}


function pos() {
    decending((stat)=>{
        stat.sort((a, b) =>{
            if(a.pos<b.pos){
                return 1;
            }else
                return -1;
            
        })

        return stat
    });
}

function plyd() {
    decending((stat)=>{
        stat.sort((a, b) =>{
            if(a.plyd>b.plyd){
                return 1;
            }else
                return -1;
            
        })

        return stat
    });
}

function win(){
    decending((stat)=>{
        stat.sort((a, b) =>{
            if(a.win>b.win){
                return 1;
            }else
                return -1;
            
        })

        return stat
    });
}

function draw() {
    decending((stat)=>{
        stat.sort((a, b) =>{
            if(a.draw<b.draw){
                return 1;
            }else
                return -1;
            
        })

        return stat
    });
}

function loss() {
    decending((stat)=>{
        stat.sort((a, b) =>{
            if(a.loss<b.loss){
                return 1;
            }else
                return -1;
            
        })

        return stat
    });
}

function gf(){
    decending((stat)=>{
        stat.sort((a, b) =>{
            if(a.gf>b.gf){
                return 1;
            }else
                return -1;
            
        })

        return stat
    });
}

function ga(){
    decending((stat)=>{
        stat.sort((a, b) =>{
            if(a.ga>b.ga){
                return 1;
            }else
                return -1;
            
        })

        return stat
    });
}

function gd(){
    decending((stat)=>{
        stat.sort((a, b) =>{
            if(a.gd>b.gd){
                return 1;
            }else
                return -1;
            
        })

        return stat
    });
}

updateTable();