const DEAFULT_SIZE = 16;
let currentSize = '';
let color = 'black';

const blackButton = document.querySelector('#black');
const rainbowButton = document.querySelector('#rainbow');
const clearButton = document.querySelector('#clear-grid');
const grid = document.querySelector('.grid');

//Take slide bar values
const sizeValue = document.querySelector('#sizeValue');
const sizeSlider = document.querySelector('#sizeSlider');
const buttons = document.querySelectorAll('button');

//Events
blackButton.onclick = (e) => activeButton(e.target.getAttribute('id'));
rainbowButton.onclick = (e) => activeButton(e.target.getAttribute('id'));
clearButton.onclick = (e) => activeButton(e.target.getAttribute('id'));
sizeSlider.onmousemove = (e) => updateSizeText(e.target.value);
sizeSlider.onchange = (e) => updateGrid(e.target.value);

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function updateSizeText(size){
    sizeValue.innerHTML = `${size} x ${size}`;
}

function updateGrid(newSize){
    clearGrid();
    createGrid(newSize);
}

function clearGrid(){
    grid.innerHTML = ''; // Clear the grid
}

function createGrid(size){

    currentSize = size;

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    const gridBox = document.createElement('div');
    gridBox.classList.add('grid-box');
    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-box');
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        grid.appendChild(gridElement);
      }
}

function changeColor(e){
    if (e.type === 'mouseover' && !mouseDown) return
    
    if(color == 'black'){
        e.target.style.backgroundColor = `black`;
    }else if(color == 'rainbow'){
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }

}

function activeButton(id){
    if(id == 'black'){
        rainbowButton.classList.remove('active');
        blackButton.classList.add('active');
        color = 'black';
    }
    if(id == 'rainbow'){
        blackButton.classList.remove('active');
        rainbowButton.classList.add('active');
        color = 'rainbow';
    }
    if(id == 'clear-grid'){
        updateGrid(currentSize);
    }
}

window.onload = () => {
    createGrid(DEAFULT_SIZE);
    activeButton(color);
}
