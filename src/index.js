const beerURL = `http://localhost:3000/beers`
const beerList = document.querySelector('#list-group')
const indivBeer = document.getElementsByClassName('list-group-item')
const beerDetail = document.querySelector('#beer-detail')
// const editBtn = document.querySelector('#edit-beer')
// console.log(editBtn)


// {
// id: 1,
// name: "Buzz",
// tagline: "A Real Bitter Experience.",
// first_brewed: "09/2007",
// description: "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
// image_url: "https://images.punkapi.com/v2/keg.png",
// food_pairing: [
// "Spicy chicken tikka masala",
// "Grilled chicken quesadilla",
// "Caramel toffee cake"
// ],
// brewers_tips: "The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.",
// contributed_by: "Sam Mason <samjbmason>"
// },


let beerDesc;
function renderBeer() {
  fetch(beerURL)
    .then(res => res.json())
    .then(data => {
      data.forEach(beer => {
				// console.log(beer.description)
        beerList.innerHTML += `
			<li id='${beer.id}' data-img=${beer.image_url} data-tagline=${beer.tagline}
			data-desc=${beer.description} class="list-group-item">${beer.name}</li>
			`
      })
    })
}
renderBeer()

// STEP 2--3------------------------//
document.addEventListener('click', (e) => {
  if (e.target.className === 'list-group-item') {

		// I tried to save the description and name as datasets but could only retrive the first word.  Was working on a solution.

    let beerId = (e.target.previousElementSibling.id)
    let beerName = e.target.innerText
    let beerImage = e.target.previousElementSibling.dataset.image_url
    let beerTagLine = e.target.previousElementSibling.dataset.tagline
    let beerDesc = e.target.previousElementSibling.dataset.desc

		console.log(e.target.previousElementSibling)

    beerDetail.innerHTML = `
					<h1>${beerName}</h1>
					<img src="${beerImage}">
					<h3>${beerTagLine}</h3>
					<textarea>${beerDesc}</textarea>
					<button id="edit-beer" data-id=${beerId} class="btn btn-info">
					  Save
					</button>
					`
    const editBtn = document.querySelector('#edit-beer')

    editBtn.addEventListener('click', (e) => {
      if (e.target.id === 'edit-beer') {

        let descInput = document.querySelector('#edit-beer').value

        fetch(beerURL + '/' + e.target.dataset.id, {
          method: 'PATCH',
          body: JSON.stringify({
            description: descInput
          }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then(res=>res.json())
					.then(renderBeer)
					editBtn.remove()
      }
    })
  }
})



//
