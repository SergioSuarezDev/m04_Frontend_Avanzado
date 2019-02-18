import '../styles/detail.scss';
import api from './api';
import './beerForm';
import defaultImage from '../images/default-beer.png';

const { getBeerDetail } = api();

const detailTemplate = ({ beerId, name, description, image, ingredients, likes, comment }) => `
<header id="${beerId}">
    <div class="title-section">
      <h1>${name}</h1>
    </div>
    <div class="image-container">
      <img src="${image ? image : defaultImage}" />
    </div>
  </header>
  <div class="content">
  <p><h4>Description:</h4> </p>
    ${description}
  <br/><br/><p><h4>Ingredients:</h4> </p>
    ${renderIngredientsInfo(ingredients)}
  <br/><p>

  </p>

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
    document.getElementById('likesCount').innerHTML = Beer.beer.likes;
    document.getElementById('commentsList').innerHTML = renderComments(Beer.beer.comment);

  } catch (e) {
    console.error(e);
  }
};

const renderComments = (comment) => {
  let cms;
  if(comment && comment.length !==0){
    cms = comment.map(comment => (`${comment.comment}`)).join(', ');
  } else {cms = 'Not comments'}
  return cms;
}

renderDetail();

