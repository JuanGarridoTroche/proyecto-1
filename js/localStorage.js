"use strict";

//Create a fake scoreboard and keep it in localStorage using stringify
let scoreBoard = [
    {"name": "Pepe", "score": 40, "time": 60},
    {"name": "Paco", "score": 30, "time": 70},
    {"name": "Pepe", "score": 20, "time": 50},
    {"name": "Pepe", "score": 10, "time": 30},
    {"name": "Pepe", "score": 12, "time": 100},
    {"name": "Manolo", "score": 15, "time": 70}
];
localStorage.setItem("scoreboard", JSON.stringify(scoreBoard));

//Retrieve the scoreboard and parse so it becomes an array of objects again
let scoreBoardLS = JSON.parse(localStorage.getItem("scoreboard"));

//print positions ordered by score
console.log("Best players by score");
scoreBoardLS.sort((a, b) => {
    return a.score - b.score;
});
for(let i = 0; i < scoreBoardLS.length; i++){
    console.log("Position: " + (i+1) + " Player: " + scoreBoardLS[i].name + " Points: " + scoreBoardLS[i].score + " Time: " + scoreBoardLS[i].time);
}

//print positions ordered by time
console.log("");
console.log("Best players by time");
scoreBoardLS.sort((a, b) => {
    return a.time - b.time;
});
for(let i=0; i<scoreBoardLS.length; i++){
    console.log("Position: " + (i+1) + " Player: " + scoreBoardLS[i].name + " Points: " + scoreBoardLS[i].score + " Time: " + scoreBoardLS[i].time);
}
