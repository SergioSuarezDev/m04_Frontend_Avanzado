import '../styles/detail.scss';
import '../styles/detail.scss';
import api from './api';
import './beerForm';
import defaultImage from '../images/default-beer.png';

const { getBeerDetail } = api();

const detailTemplate = ({ beerId, name, description, image, ingredients, likes, comments }) => `
<header id="${beerId}">
    <div class="title-section">
      <h1>${name}</h1>
    </div>
    <div class="image-container">
      <img src="${image ? image : defaultImage}" />
    </div>
  </header>
  <div class="content">
  <p>Description: </p>
    ${description}
  <br/><br/><p>Ingredients: </p>
    ${renderIngredientsInfo(ingredients)}
  <br/><p>

  </p>
  <br/><p>Comments: </p>
    <span id="comments">${renderComments(comments)} </span>
  <br/>
  </div>
`;

const renderIngredientsInfo = (ingredients) => {
  let malt, hops, yeast;({ malt, hops, yeast } = ingredients);
  return `${renderIngredients(malt)} ${renderIngredients(hops)} ${renderIngredients(yeast)}`
}

const renderIngredients = (type) => {
  let ingredients;
      if (Array.isArray(type) && type.length !== 0) {ingredients = type.map((ing) => (`<li>${ing.name}</li>`)).join('');}
      else if (!Array.isArray(type)) {ingredients = `<li>${type}</li>`}
  return ingredients;
}

const renderDetail = async () => {
  try {
    const [, id] = window.location.search ? window.location.search.split('=') : [];
    const Beer = await getBeerDetail(id);
    const BeerHTML = detailTemplate(Beer.beer);
    document.getElementById('detail').innerHTML = BeerHTML;
  } catch (e) {
    console.error(e);
  }
};

const renderComments = (comments) => {
  let cms;
  if(comments && comments.length !==0){
    cms = comments.map(comment => (`<p>${comment.comment}</p>`)).join('');
  } else {cms = 'Not comments'}
  return cms;
}

renderDetail();

