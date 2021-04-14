let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch('http://localhost:3000/toys')
.then(response => {response.json()})
.then((toysArray) => {
  toysArray.forEach(function(toyObject){
  turnToyObjectToHtml(toyObject)
  
})
})

function turnToyObjectToHtml(toyPOJO) {
  console.log(toyPOJO)
  let outerLi = document.createElementById("li")
    outerLi.className = "toy"

  let toyNameP = document.createElement("p")
    toyNameP.className = "js-toy middle alligned content"

  let likesSpan = document.createElement("likes")
    likesSpan.innerText = toyPOJO.Likes

  let incrementButton = document.createElement("button")
    incrementButton.innerText = "likes"

  let toyImage = document.createElement('img')
    toyImage.src = toyPOJO.image
}