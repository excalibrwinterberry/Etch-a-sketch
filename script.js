//setiing up grid everytime the user changes the dimensions
function setGrid(containerTag,n){
    eraser.checked = false
    brushStroke[0].checked = true 
    container.innerHTML = ""
    container.style.gridTemplateColumns = `repeat(${n}, 2fr)`
    container.style.gridTemplateRows = `repeat(${n}, 2fr)`
    for(let i=1; i<=n*n; i++){
        let cell = document.createElement('div')
        cell.setAttribute('id', i)
        cell.addEventListener('mouseenter', changeColor)
        containerTag.appendChild(cell)
    }
    
}

//event handler to change the color to black
function changeColor(event){
    document.getElementById(`${event.target.id}`).style.backgroundColor = drawColor
}

//for clear tag to set all the color of cells to default
function revertColor(tag){
    document.getElementById(`${tag.id}`).style.backgroundColor = defaultColor
}

//event handler for eraser event to convert color of brush to default
function revertColorEvent(event){
    document.getElementById(`${event.target.id}`).style.backgroundColor = defaultColor
}

//handling eraser event
function eraserEvent(event) {
    const grid = [...container.children]
    if(event.target.checked){
        grid.forEach((cell)=>{
            cell.addEventListener("mouseenter", revertColorEvent)
        })
    }else{
        grid.forEach((cell)=>{
            cell.removeEventListener("mouseenter", revertColorEvent)
        })
    }
}

//when brush stroke is set to rainbow
function rainbowEvent(event) {
    document.getElementById(`${event.target.id}`).style.backgroundColor = rainbowColors[visited]
    visited = (visited === 6) ? 0 : visited+1
}

let n =16
let visited = 0

const rainbowColors = ["violet", "indigo", "blue", "green", "yellow", "orange", "red"]

const dimensionTag = document.getElementById("dimension")

const dimensionDisplay = document.getElementById("rangeValue")
dimensionDisplay.textContent = n

const container = document.getElementsByClassName("container")[0]

const drawColor = "black"
const defaultColor = "LightGray"

const eraser = document.getElementById("eraser")
eraser.addEventListener("change", eraserEvent)

const brushStroke = document.querySelectorAll('input[name="brush"]')


//setting up initial grid on load
setGrid(container, n)

//changing dimension as per user input
dimensionTag.oninput = function() {
    n = parseInt(this.value)
    dimensionDisplay.textContent = n
    setGrid(container, n)
}



//clear button
document.querySelector("#clear").addEventListener("click", (e)=>{
    const grid = [...container.children]

    grid.forEach((cell)=>{
        revertColor(cell)
    })
    
})

//rainbow 

brushStroke.forEach((strokes)=>{
    strokes.addEventListener('change', (event)=>{
        eraser.checked = false
        const grid = [...container.children]
        if(event.target.value === "rainbow"){
            grid.forEach((cell)=>{
                cell.addEventListener("mouseenter", rainbowEvent)
            })

        }else{
            grid.forEach((cell)=>{
                cell.removeEventListener("mouseenter", rainbowEvent)
            })
        }
    })
})
