// Get the form and list elements
const form = document.getElementById('scoreForm');
const list = document.getElementById('scoreList');

// Check if local storage has existing scores
let scoreData = JSON.parse(localStorage.getItem('scoreData')) || [];

// Function to update the list and save to local storage
function updateList() {
    list.innerHTML = '';
    scoreData.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${score.team1}: ${score.team1Score} - ${score.team2}: ${score.team2Score} -</span> <a href="#" onclick="removeScore(${index})">Remove</a>`;
        list.appendChild(listItem);
    });
    localStorage.setItem('scoreData', JSON.stringify(scoreData));
}

// Function to add game scores from the form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const team1Select = document.getElementById('team1');
    const team1ScoreInput = document.getElementById('team1Score');
    const team2Select = document.getElementById('team2');
    const team2ScoreInput = document.getElementById('team2Score');

    const team1 = team1Select.value;
    const team1Score = parseInt(team1ScoreInput.value);
    const team2 = team2Select.value;
    const team2Score = parseInt(team2ScoreInput.value);

    if (!isNaN(team1Score) && !isNaN(team2Score)) {
        const score = { team1, team1Score, team2, team2Score };
        scoreData.push(score);
        team1Select.value = 'Team A';
        team1ScoreInput.value = ''; // Clear the input field for Team 1
        team2Select.value = 'Team A';
        team2ScoreInput.value = ''; // Clear the input field for Team 2
        updateList();
    }
});

// Function to remove a score from the list
function removeScore(index) {
    scoreData.splice(index, 1);
    updateList();
}

// Initial list population
updateList();

//populating the table
const tbody = document.querySelector('tbody')

function updateTable(){
    let teams = getTeams();
    let allStats = []

    teams.forEach((team) =>{
        let teamStat = getTeamStats(team);
        allStats.push(teamStat)
    })

    allStats.sort((a, b) =>{
        if(a.points>b.points){
            return -1;
        }else{
            return 1;
        }
    }).forEach((stat, i)=>{
        stat.pos = i+1;
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



updateTable();