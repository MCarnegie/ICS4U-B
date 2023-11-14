// // Get the form and list elements
const form = document.getElementById('scoreForm');
const list = document.querySelector('tbody');

// Check if local storage has existing scores
let scoreData = JSON.parse(localStorage.getItem('scoreData')) || [];

// Function to update the list and save to local storage
function updateList() {   
        list.innerHTML = ''
        
        scoreData.forEach((stats, i)=>{
            const listRow = document.createElement('tr');
            stats.forEach((item, index) => {
                let listitem = document.createElement('td');
                listitem.textContent = ""+ item
                listRow.appendChild(listitem);
                
            });
            listRow.lastChild.innerHTML = `<a href="#" onclick="removeScore(${i})">Remove</a>`
            list.appendChild(listRow);
        })
        
        localStorage.setItem('scoreData', JSON.stringify(scoreData));
        //listitem.innerHTML = `</span> <a href="#" onclick="removeScore(${index})">Remove</a>`
        

}

// Function to add game scores from the form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let arr = []
    let data = document.getElementById("data")
    
    let index = 0
    while(index<data.children.length){
        arr.push(data.children[index].value)
        index++;
    }
    const score = arr;
    scoreData.push(score);
    index = 0;
    while(index<data.children.length){
        data.children[index].value = ''
        index++;
    }
    updateList();
    
});

// Function to remove a score from the list
function removeScore(index) {
    scoreData.splice(index, 1);
    updateList();
}

// Initial list population
updateList();