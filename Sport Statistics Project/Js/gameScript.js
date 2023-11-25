// Get the form and list elements
const form = document.getElementById('scoreForm');
const list = document.getElementById('scoreList');

// Check if local storage has existing scores
let scoreData = JSON.parse(localStorage.getItem('scoreData')) || [];

// Function to update the list and save to local storage
function updateList() {
    const weekInput = document.getElementById('week');
    const week = weekInput.value;
    list.innerHTML = '';
    const listItem = document.createElement('strong');
    listItem.innerHTML = 'Week: ' + week;
    list.appendChild(listItem);
    scoreData.forEach((score, index) => {
        if(score.week === week){
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>${score.team1} ${score.team1Score} - ${score.team2Score} ${score.team2}  -</span> <a href="#" onclick="removeScore(${index})">Remove</a>`;
            list.appendChild(listItem);
        }
        
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
    const weekInput = document.getElementById('week');

    const team1 = team1Select.value;
    const team1Score = parseInt(team1ScoreInput.value);
    const team2 = team2Select.value;
    const team2Score = parseInt(team2ScoreInput.value);
    const week = weekInput.value;

    if (!isNaN(team1Score) && !isNaN(team2Score)) {
        const score = { team1, team1Score, team2, team2Score, week};
        scoreData.push(score);
        //team1Select.value = 'Team A';
        team1ScoreInput.value = ''; // Clear the input field for Team 1
        //team2Select.value = 'Team A';
        team2ScoreInput.value = ''; // Clear the input field for Team 2
        updateList();
        updateTable();
    }
});

// Function to remove a score from the list
function removeScore(index) {
    scoreData.splice(index, 1);
    updateList();
    updateTable();
}

// Initial list population
updateList();
