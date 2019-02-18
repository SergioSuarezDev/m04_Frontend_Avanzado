import { renderDOMBeers } from './beers';

const searchForm = document.querySelector('#beer-form');
const searchInput =document.querySelector('.input.search');
const yearInput = document.querySelector('.yearInput');
const yearButton = document.querySelector('#yearButton');

searchForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (searchInput.value !== '') {
    renderDOMBeers(searchInput.value);
  }
});

yearButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (yearInput.value !== '') {
    renderDOMBeers(yearInput.value, 'year');
  }
});

