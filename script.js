function setGrid(containerTag,n){
    eraser.checked = false
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


function changeColor(event){
    document.getElementById(`${event.target.id}`).style.backgroundColor = drawColor
}

function revertColor(tag){
    document.getElementById(`${tag.id}`).style.backgroundColor = defaultColor
}

function revertColorEvent(event){
    document.getElementById(`${event.target.id}`).style.backgroundColor = defaultColor
}

function eraserEvent(event) {
    const grid = [...container.children]
    console.log("eraser event triggered")
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

let n =16

const dimensionTag = document.getElementById("dimension")

const dimensionDisplay = document.getElementById("rangeValue")
dimensionDisplay.textContent = n

const container = document.getElementsByClassName("container")[0]

const drawColor = "black"
const defaultColor = "LightGray"

const eraser = document.getElementById("eraser")
eraser.addEventListener("change", eraserEvent)



setGrid(container, n)

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
