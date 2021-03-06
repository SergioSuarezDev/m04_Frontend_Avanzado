import api from './api';

const beerForm = document.getElementById('beer-form');
const beerInput = document.getElementById('beer');
const commentButton = document.querySelector('.commentButton');
const yearForm = document.getElementById('yearButton');
const likeForm = document.getElementById('likeForm');
const cms = document.getElementById('commentsList');

const { createComment } = api();
const { addLike } = api();

beerInput.addEventListener('change', (evt) => {
  beerInput.value = evt.target.value;
});

commentButton.addEventListener('click', async (evt) => {
  evt.preventDefault();
  try {
    const [, id] = window.location.search ? window.location.search.split('=') : [];
    const comments = await createComment(id, beerInput.value);
   cms.innerHTML =  cms.innerText + ", " + beerInput.value;
   beerInput.value = "";
  } catch (e) {
    console.error(e);
  }
});



likeForm.addEventListener('click', async (evt) => {
  evt.preventDefault();
  try {
    const [, id] = window.location.search ? window.location.search.split('=') : [];
    const like = await addLike(id);
    let lk =  document.getElementById('likesCount');
    let lkplus = parseInt(lk.innerText) + 1;
    lk.innerHTML =  lkplus;
  } catch (e) {
    console.error(e);
  }
});



