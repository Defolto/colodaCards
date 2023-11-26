const getCard = document.getElementById("getCard")
const resetColodaBtn = document.getElementById("resetColoda")
const cards = document.querySelector(".cards")

const masts = ["♥", "♦", "♣", "♠"]
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "валет", "дама", "король", "туз"]

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let coloda = []
function resetColoda() {
    coloda = []

    masts.forEach((mast) => {
        values.forEach((val) => {
            coloda.push({
                mast, val
            })
        })
    })

    coloda.sort(()=>{return getRandom(-1,0)}).sort(()=>{return getRandom(-1,0)})
}

resetColoda()

getCard.addEventListener("click", ()=>{
    if (!coloda.length) {
        alert("колода закончилась")
        return
    }

    const newCard = coloda[0]
    coloda.splice(0, 1)

    let mod= ''
    if (newCard.mast == "♦" || newCard.mast == "♥") {
        mod = "red"
    }

    cards.insertAdjacentHTML('beforeend', `<div class="card ${mod}">
    <p class="mast1">${newCard.mast}</p>
    <p class="mast2">${newCard.mast}</p>
    <p class="value">${newCard.val}</p>
</div>`)
})

resetColodaBtn.addEventListener("click", ()=>{
    cards.innerHTML = ''
    resetColoda()
})

cards.addEventListener('click', (e)=>{
    if (e.target.classList.contains('cards')){
        return
    }

    let infoCard = null
    if (e.target.classList.contains("card")) {
        infoCard = e.target
    } else {
        infoCard = e.target.parentNode
    }

    const mast = infoCard.querySelector(".mast1")
    const val = infoCard.querySelector(".value")
    coloda.push({mast, val})

    infoCard.remove()
})
