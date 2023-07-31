const boxes = document.querySelectorAll('.box')
const gameInfo = document.querySelector('.game-info')
const newGameBtn = document.querySelector('.btn')

let currentPlayer;
let gameGrid;

const winningPosition= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// initialize game
function initGame (){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    // IU empty
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        box.classList.remove('win');
    })
    newGameBtn.classList.remove('active');
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X"){
        currentPlayer = "O"; 
    }
    else currentPlayer = "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkWin() {
    let answer="";

    winningPosition.forEach((position) =>{
        // winning condition
        if( (gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[0]]===gameGrid[position[2]]) ){
            if(gameGrid[position[0]]==="X") answer="X";
            else answer="O";

            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');

            // disable pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents='none';
            })
        }
    })

    // we have winner
    if(answer!==""){
        gameInfo.innerText=`Player - ${answer} Won🎉`;
        newGameBtn.classList.add('active');
        return;
    }
    // check game tie
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!=="") fillCount++;
    })

    if(fillCount===9){
        gameInfo.innerText="Game Tied!";
        newGameBtn.classList.add('active')
    }
}

function handleClick(index) {
    if(gameGrid[index] ===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]= currentPlayer;
        boxes[index].style.pointerEvents="none";
        swapTurn();
        checkWin();
    }
}

boxes.forEach((box, index) =>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener('click',initGame);