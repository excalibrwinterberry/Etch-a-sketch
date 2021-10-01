const n = 50
const container = document.getElementsByClassName("container")[0]

function changeColor(event){
    //    document.getElementById(`${event.target.id}`).classList.toggle('chosen')

    document.getElementById(`${event.target.id}`).style.backgroundColor = "black"
}

container.style.gridTemplateColumns = `repeat(${n}, 2fr)`
container.style.gridTemplateRows = `repeat(${n}, 2fr)`

for(let i=1; i<=n*n; i++){
    let cell = document.createElement('div')
    cell.setAttribute('id', i)
    container.appendChild(cell)
}

for(let i=1; i<=n*n; i++){
    let cell = document.getElementById(`${i}`)
    cell.addEventListener('mouseenter', changeColor)
}