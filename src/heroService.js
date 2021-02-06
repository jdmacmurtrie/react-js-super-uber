const apiUrl = "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";

export class HeroService {
  getHeros = (retrieveData) => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        retrieveData(responseData);
      });
  };
}
