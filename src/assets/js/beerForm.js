import api from './api';

const beerForm = document.getElementById('beer-form');
const beerInput = document.getElementById('beer');

const { createComment } = api();


beerInput.addEventListener('change', (evt) => {
  beerInput.value = evt.target.value;
});

beerForm.addEventListener('submit', async (evt) => {

  evt.preventDefault();
  try {
    const [, id] = window.location.search ? window.location.search.split('=') : [];
    const quote = await createComment(id, beerInput.value);
    document.getElementById('comments').innerHTML =  beerInput.value;
  } catch (e) {
    console.error(e);
  }

});



