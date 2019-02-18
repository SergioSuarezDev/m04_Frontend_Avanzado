import striptags from 'striptags';
// import escapeHtml from 'escape-html';
import { openHeader } from './ui';
import api from './api';
import defaultImg from '../images/default-beer.png';
const { getBeers } = api();
const { getBeersYear } = api();

const templateBeer = ({ beerId, name, image, description, ingredients }) => `
  <div id="${beerId}" class="card principal">
    <header class="card-header">
    <a href="detail.html?id=${beerId}"><h2>${name}</h2></a>
    </header>
    <div class="card-content">
      <div class="card-content-image">
      <img class="imgBeer" src="${image ? image : defaultImg}">
      </div>
      <div class="card-content-text">
        <p>${description}</p>
        <div class="rating-container">
          <button class="icon">
          <a href="detail.html?id=${beerId}">
            <i class="fas fa-arrow-circle-right fa-4x"></i>
          </a>
          </button>         
        </div>
      </div>
   </div>
 </div>
`;

const renderBeers = (element, Beers) => {
  const htmlBeers = Beers.map((beer, index) => {
      return templateBeer({...beer});
  }).join('');
  element.innerHTML = htmlBeers;
};

export const renderDOMBeers = async (query, year) => {
  try {
    let fetchBeers;
    if(year) {
      fetchBeers = await getBeersYear(query);
    } else {
      fetchBeers = await getBeers(query);
    }

    const beerSection = document.getElementById('beer-section');
    renderBeers(beerSection, fetchBeers);
  } catch (e) {
    console.error(e);
  }
};



renderDOMBeers();

