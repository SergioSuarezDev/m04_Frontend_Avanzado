
const API_KEY = 'ZGCCN38-M1F4TVT-HXYCT45-BWNKT2J';
const api = (API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1') => {
const SEARCH_API_URL = `${API_URL}/beers?limit=10&search=`;
const BEERS_URL = `${API_URL}/beers`;
  
return {

    getBeers: async (query) => {
      try {
        const requestUrl = query ? `${SEARCH_API_URL}${query}` : BEERS_URL;
        const response = await fetch(requestUrl, {
          method: 'GET',        
          headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY,
          },
        });
        const datos = await response.json();

        const mapDatos = datos.beers.map((dato) => {
          return dato;
        });
        return mapDatos;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },

    getBeersYear: async (query) => {
      try {
        const requestUrl = query ? `${SEARCH_API_URL}` : BEERS_URL;
        const response = await fetch(requestUrl, {
          method: 'GET',        
          headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY,
          },
        });
        const datos = await response.json();
        var beersFiltered = [];

        if (datos.beers.length > 0) {
          datos.beers.map(function (beer) {
            let yFb = beer.firstBrewed.split('/')[1];
            if (yFb === query) {
              beersFiltered.push(beer);
            }
          });
        }

        return beersFiltered;

      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    getBeerDetail: async (id) => {
      try {
        const response = await fetch(`${BEERS_URL}/${id}`, {
          method: 'GET',        
          headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY,
          },
        });
        const beer = await response.json();
        return beer;
      } catch(e) {
        console.error(e);
      }
    },

    createComment: async (id, comment) => {
      try {
        const response = await fetch(`${BEERS_URL}/${id}/comment`, {
          method: 'POST',
          body: JSON.stringify({
            comment: comment,
          }),
          headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY,
          },
        });
        console.log(response);
        if (!response.ok) {
          throw 'Error';
        }
        const comments = await response.json();
        return comments.beer;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    addLike: async(id) => {
      try {
        const response = await fetch(`${BEERS_URL}/${id}/like`, {
          method: 'POST',        
          headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY,
          },
        });
        const beer = await response.json();
        return beer;
      } catch(e) {
        console.error(e);
      }
    },

  };
};

export default api;
