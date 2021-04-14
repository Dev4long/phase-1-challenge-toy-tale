let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

let toyOl = document.querySelector('#toy-collection')
let toyForm = document.querySelector('.add-toy-form')


fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then((toysArray) => {
    toysArray.forEach(function(toyObject){
      turnToyObjectToHtml(toyObject)
  
})
})


toyForm.addEventListener('submit', function(evt){
  evt.preventDefault()
  let whatUserTyped = evt.target.name.value
  let whatUserImg = evt.target.image.value

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      name: whatUserTyped,
      image: whatUserImg,
      likes: 0
    })
  })
      .then(response => response.json())
      .then((newlyCreatedToy) => {
        turnToyObjectToHtml(newlyCreatedToy)
      })
    })



function turnToyObjectToHtml(toyPOJO) {
  console.log(toyPOJO)


  let outerLi = document.createElement("div")
    outerLi.className = "card"

  let toyNameH = document.createElement('h2')
    toyNameH.innerText = toyPOJO.name
    
  let toyImage = document.createElement('img')
    toyImage.src = toyPOJO.image
    toyImage.className = "toy-avatar"

  let toyLikes = document.createElement('p')
    toyLikes.innerText = `${toyPOJO.likes} Likes`

  let likeButton = document.createElement('button')
    likeButton.className = 'like-btn'
    likeButton.id = toyPOJO.id
    likeButton.innerHTML = "Like"

  outerLi.append(toyNameH, toyImage, toyLikes, likeButton)

  outerLi.dataset.id = toyPOJO.id

  toyOl.append(outerLi)


likeButton.addEventListener('click', (evt) => {
  fetch(`http://localhost:3000/toys/${toyPOJO.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  body: JSON.stringify({
    likes: toyPOJO.likes + 1
  })
})
    .then(response => response.json())
    .then((updatedToyObj) => {
      toyLikes.innerHTML = `${updatedToyObj.likes} Likes`

      toyPOJO.likes = updatedToyObj.likes
    })
})


}