const DEFAULT_SIZE =  16;
const DEFAULT_CHOICE = 'sketch';
DEFAULT_COLOR = '#000000';
const gridContainer = document.querySelector('#grid-container');
const sketchBtn = document.querySelector('.sketch-btn');
const clearBtn = document.querySelector('.clear-btn');
const eraseBtn = document.querySelector('.eraser-btn');
const colorPicker = document.querySelector('#color-picker');
const slideContainer = document.querySelector('.slide-container');
const slider = document.querySelector('.slider');
const output = document.createElement('div');

let currentSize = DEFAULT_SIZE;
let currentChoice = DEFAULT_CHOICE;
let currentColor = DEFAULT_COLOR;

sketchBtn.onclick = () => setChoice('sketch');
eraseBtn.onclick = () => setChoice('erase');
clearBtn.onclick = () => Clear();
colorPicker.oninput = (e) => setColor(e.target.value);

function setChoice (newChoice) {
    Chosen(newChoice);
    currentChoice = newChoice;
}

function setColor (newColor) {
    currentColor = newColor;
}



// Sets the size of the grid
function setGrid(size) {
    gridContainer.style.gridTemplateRows =  `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.addEventListener('mouseover', Draw);
        square.addEventListener('mousedown', Draw);
        gridContainer.appendChild(square);
    }
}


// Will only draw if the mouse is held down
let mouseDown = false;
gridContainer.onmousedown = () => mouseDown = true;
gridContainer.onmouseup = () => mouseDown = false;


// Draw or erase
function Draw(e) {
    if (e.type === 'mouseover' && mouseDown === true) {
        if (currentChoice === 'sketch') {
            e.target.style.backgroundColor = currentColor;
        }

        else if (currentChoice === 'erase') {
            e.target.style.backgroundColor = 'white';
        }
    }
}



// Chosen Mode (sketch or draw)
function Chosen(userChoice) {
    if (userChoice === 'sketch') {
        sketchBtn.style.backgroundColor = '#1e0707';
        eraseBtn.style.backgroundColor = 'white';
    } else if (userChoice === 'erase') {
        eraseBtn.style.backgroundColor = '#1e0707';
        sketchBtn.style.backgroundColor = 'white';
    }
}


function Clear() {
    gridContainer.textContent = '';
    setGrid(currentSize);
}


// Slider to adjust grid size 
slideContainer.appendChild(output);

slider.value = currentSize;
output.textContent = slider.value + " x " + slider.value; // outputs grid size (16 x 16)
output.style.color = "#ff1515";
output.style.marginTop = '15px';
output.style.display = 'flex';
output.style.justifyContent = 'center';

slider.oninput = function () {
    Clear(); // clears sketch everytime size is changed 
    output.textContent = slider.value + " x " + slider.value;
    currentSize = slider.value;
}


window.onload = () => {
    setGrid(DEFAULT_SIZE);
    Chosen(DEFAULT_CHOICE);
}














