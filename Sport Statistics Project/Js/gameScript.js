// Get the form and list the elements
const form = document.getElementById('scoreForm');
const list = document.getElementById('scoreList');

// Check if local storage has existing scores
let scoreData = JSON.parse(localStorage.getItem('scoreData')) || [];

//this function updates the list and saves it to the local storage
function updateList() {
    let date = new Date(document.getElementById("date").value);
    let time = date.getTime()
    list.innerHTML = '';
    const listItem = document.createElement('strong');
    listItem.innerHTML = document.getElementById("date").value;
    list.appendChild(listItem);
    scoreData.forEach((score, index) => {
        if(score.date === time){
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>${score.team1} ${score.team1Score} - ${score.team2Score} ${score.team2}  -</span> <a href="#" onclick="removeScore(${index})">Remove</a>`;
            list.appendChild(listItem);
        }
        
    });
    localStorage.setItem('scoreData', JSON.stringify(scoreData));
}

/* this function adds 
the games inputed from the form into the list*/
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
    

    let date = new Date(document.getElementById("date").value).getTime();
    let dateFull = document.getElementById("date").value


    if (!isNaN(team1Score) && !isNaN(team2Score)) {
        const score = { team1, team1Score, team2, team2Score, date, dateFull};
        scoreData.push(score);
        team1ScoreInput.value = '';
        team2ScoreInput.value = ''; 
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

