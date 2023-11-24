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
            let t = "" + stat[a];
            let td = document.createElement("td");
            td.innerHTML = stat[a];
            if(a === "team"){
                
                let a = document.createElement('a')
                a.appendChild(td)
                a.href = `teamGames.html?team=${t}`

                row.appendChild(a);
            }else{
                 row.appendChild(td);
            }
           
        }

        tbody.appendChild(row);
    })
}

function inRange(week, weekStart, weekEnd){
    if(parseInt(week)>=weekStart && parseInt(week)<=weekEnd){
        return true;
    }else{
        return false;
    }
}

function getTeams() {
    const weekInputStart = document.getElementById('weekStart');
    const weekStart = parseInt(weekInputStart.value);
    const weekInputEnd = document.getElementById('weekEnd');
    const weekEnd = parseInt(weekInputEnd.value);

   
    let arr =[]
    scoreData.forEach((team)=>{
        let isinRange = inRange(team.week, weekStart, weekEnd);
        if(!arr.includes(team.team1) && isinRange){
            arr.push(team.team1)
        }
        if(!arr.includes(team.team2) && isinRange){
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
        allStats = sort(allStats, 1)
        tbody.innerHTML = '';
        addElements(allStats);
        isOn = false;
    }else{
        allStats = sort(allStats, -1)
        tbody.innerHTML = '';
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
                return num;
            }else
                return num*-1;
            
        })

        return stat
    });
}

function win(){
    decending((stat, num)=>{
        stat.sort((a, b) =>{
            if(a.win>b.win){
                return num;
            }else
                return num*-1;
            
        })

        return stat
    });
}

function draw() {
    decending((stat, num)=>{
        stat.sort((a, b) =>{
            if(a.draw>b.draw){
                return num;
            }else
                return num*-1;
            
        })

        return stat
    });
}

function loss() {
    decending((stat, num)=>{
        stat.sort((a, b) =>{
            if(a.loss>b.loss){
                return num;
            }else
                return num*-1;
            
        })

        return stat
    });
}

function gf(){
    decending((stat, num)=>{
        stat.sort((a, b) =>{
            if(a.gf>b.gf){
                return num;
            }else
                return num*-1;
            
        })

        return stat
    });
}

function ga(){
    decending((stat, num)=>{
        stat.sort((a, b) =>{
            if(a.ga>b.ga){
                return num;
            }else
                return num*-1;
            
        })

        return stat
    });
}

function gd(){
    decending((stat, num)=>{
        stat.sort((a, b) =>{
            if(a.gd>b.gd){
                return num;
            }else
                return num*-1;
            
        })

        return stat
    });
}

updateTable();