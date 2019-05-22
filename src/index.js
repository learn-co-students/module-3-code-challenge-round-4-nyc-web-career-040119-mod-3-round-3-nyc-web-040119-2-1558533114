const beers = 'http://localhost:3000/beers'
// fetch&display a list of beer names
const ul = document.getElementById("list-group")
const detail = document.getElementById("beer-detail")
fetch(beers)
.then(res=>res.json())
.then(beers=>{
  beers.forEach(beer=>{
    // console.log(beer)
    renderBeer(beer)
  })
})

function renderBeer(beer){
  ul.innerHTML += `<li id='${beer.id}' class="list-group-item">${beer.name}</li>`
}
// when click a beer name, reveal more info about it
//add beer details to <div id="beer-detail">
ul.addEventListener('click', e=>{
  // console.log(e.target.id)
  let beerId = e.target.id
  fetch(`${beers}/${beerId}`)
  .then(res=>res.json())
  .then(beer=>{
    detail.innerHTML =
    `<h1>${beer.name}</h1>
    <img src=${beer.image_url}>
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id="${beer.id}" class="btn btn-info">
      Save
    </button>`
  })
})
// when looking at details of a beer, edit the description of it
// click 'Save' button, PATCH `http://localhost:3000/beers/:id`
detail.addEventListener('click',e=>{
     let beerId = e.target.id
     // console.log(e.target.previousElementSibling.value)
     let input = e.target.previousElementSibling
     fetch(`${beers}/${beerId}`,{
       method: 'PATCH',
        body: JSON.stringify({
          description: input.value
        }),
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
     })
})
