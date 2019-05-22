const beerURL = `http://localhost:3000/beers`
const beerList = document.querySelector('#list-group')
const indivBeer = document.getElementsByClassName('list-group-item')
const beerDetail = document.querySelector('#beer-detail')

let beerId;
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

	  let beerId = (e.target.previousElementSibling.id)
		
    fetch(beerURL + '/' + beerId)
      .then(res => res.json())
      .then(data => {
        beerDetail.innerHTML = `
						<h1>${data.name}</h1>
						<img src="${data.image_url}">
						<h3>${data.tagline}</h3>
						<textarea id="textArea">${data.description}</textarea>
						<button id="edit-beer" data-id=${data.id} class="btn btn-info">
							Save
						</button>
						`
      })
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
        }).then(res => res.json())
				document.querySelector('#textArea').innerText = ''
      }
    })
  }
})
