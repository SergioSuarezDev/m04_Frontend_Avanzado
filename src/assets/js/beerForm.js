import api from './api';

const beerForm = document.getElementById('beer-form');
const beerInput = document.getElementById('beer');
const likeForm = document.getElementById('likeForm');
const cms = document.getElementById('commentsList');

const { createComment } = api();
const { addLike } = api();

beerInput.addEventListener('change', (evt) => {
  beerInput.value = evt.target.value;
});

beerForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  try {
    const [, id] = window.location.search ? window.location.search.split('=') : [];
    const comments = await createComment(id, beerInput.value);
   cms.innerHTML =  cms.innerText + ", " + beerInput.value;
  } catch (e) {
    console.error(e);
  }
});

likeForm.addEventListener('click', async (evt) => {
  evt.preventDefault();
  try {
    const [, id] = window.location.search ? window.location.search.split('=') : [];
    const like = await addLike(id);
    document.getElementById('likesCount').innerHTML =  like.beer.likes;
  } catch (e) {
    console.error(e);
  }
});



