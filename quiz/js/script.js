let form = document.querySelector('.form')
let nameU = document.querySelector('.name')
let cat = document.querySelector('.selectCat')

form.addEventListener('submit',()=> {
    localStorage.setItem('name',nameU.value)
    localStorage.setItem('cat',cat.value)
})