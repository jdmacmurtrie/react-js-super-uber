const apiUrl = "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";

export class HeroService {
  getHeroes = (retrieveData) => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        retrieveData(data);
      });
  };
}
