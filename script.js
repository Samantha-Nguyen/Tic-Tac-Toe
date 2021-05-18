const boxes = Array.from(document.getElementsByClassName('box'))
const playText = document.getElementById('playtext')
const board = document.getElementById('gameboard')
const spaces = []
const PLAYER_1 = 'X'
const PLAYER_2 = 'O'
let currentPlayer
let count = 0

// This counts how many times the game board is clicked and at the 9th click, it will recognize it as a tie and tell the users
board.onclick = function () {
  count++
  if (count === 9) {
    playText.innerText = 'Tie!'
  }
}

// This displays the playing board
const drawBoard = () => {
  boxes.forEach((box, index) => {
    let styleString = ''
    // If the box is on top, it will add a border to the bottom
    if (index < 3) {
      styleString += 'border-bottom: 3px solid var(--white);'
    }
    // If the box on the left, it will add a border on the right
    if (index % 3 === 0) {
      styleString += 'border-right: 3px solid var(--white);'
    }
    // If the box is on the right, it will add a border on the right
    if (index % 3 === 2) {
      styleString += 'border-left: 3px solid var(--white);'
    }
    // If the index is on the bottom, it will add a border to the top
    if (index > 5) {
      styleString += 'border-top: 3px solid var(--white);'
    }
    // This will actually draw it and recognize it as a styleString
    box.style = styleString
    // Adds an Event Listener to each box
    box.addEventListener('click', boxClicked)
  })
}

// This logs if a box has already been clicked and checks if there is nothing in there. This makes sure that the box will not be written in if it is clicked again.
const boxClicked = (e) => {
  const id = e.target.id
  console.log('clicked') // Logs the click in the console
  // If there is nothing in the box and it is clicked, the space will be updated with the current player
  if (!spaces[id]) {
    spaces[id] = currentPlayer
    e.target.innerText = currentPlayer

    // If a player has won, the "(currentPlayer)Turn" text will change to write that they have won.
    if (playerHasWon()) {
      playText.innerText = `${currentPlayer} has won!`
      return
    }

    // This line will update the current player each time they make a move.
    currentPlayer = currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1
    playText.innerHTML = `${currentPlayer}'s Turn`
  }
}

// This checks how a player can win. All the ways a player can win are noted down here.
const playerHasWon = () => {
  if (spaces[0] === currentPlayer) {
    if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
      console.log(`${currentPlayer} wins up top.`)
      return true
    }
    if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
      console.log(`${currentPlayer} wins on the left.`)
      return true
    }
    if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
      console.log(`${currentPlayer} wins diagonally from top left to bottom right.`)
      return true
    }
  }
  if (spaces[8] === currentPlayer) {
    if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
      console.log(`${currentPlayer} wins on the right.`)
      return true
    }
    if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
      console.log(`${currentPlayer} wins on the bottom.`)
      return true
    }
  }
  if (spaces[4] === currentPlayer) {
    if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
      console.log(`${currentPlayer} wins vertically in the middle.`)
      return true
    }
    if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
      console.log(`${currentPlayer} wins horizontally in the middle.`)
      return true
    }
  }
  if (spaces[2] === currentPlayer) {
    if (spaces[4] === currentPlayer && spaces[6] === currentPlayer) {
      console.log(`${currentPlayer} wins diagonally from top right to bottom left.`)
      return true
    }
  }
}

// This restarts the game by clearing all the boxes and resetting the title to "X's Turn".
const restart = () => {
  spaces.forEach((space, index) => {
    spaces[index] = null
  })
  boxes.forEach((box) => {
    box.innerText = ''
  })
  count = 0
  playText.innerText = "X's Turn"
  currentPlayer = PLAYER_1
}

// This makes the "Play Again" button ACTUALLY work.
document.getElementById('restartbtn').addEventListener('click', restart)

restart()
drawBoard()
