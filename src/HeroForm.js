import React, { Component } from "react";
import { HeroService } from "./heroService";
import newHeroes from "./newHeroes.json";

import FormInput from "./components/FormInput";
import InfoBlock from "./components/InfoBlock";

export default class HeroForm extends Component {
  constructor() {
    super();

    this.squadInformation = [
      {
        heading: "Squad Name",
        id: "squadName",
      },
      {
        heading: "Home Town",
        id: "homeTown",
      },
      {
        heading: "Year Founded",
        id: "formed",
      },
      {
        heading: "Secret Base",
        id: "secretBase",
      },
    ];

    this.state = { heroes: [], searchInput: "", searchResults: [], squadData: {} };
  }

  componentDidMount() {
    const service = new HeroService();
    service.getHeros(this.mergeHeroes);
  }

  mergeHeroes = (squadData) => {
    const allHeroes = [...squadData.members, ...newHeroes];
    const heroesAsProducts = allHeroes.map((hero, index) => ({
      ...hero,
      id: index,
      quantity: 0,
    }));

    this.setState({ squadData, heroes: heroesAsProducts, searchResults: heroesAsProducts });
  };

  handleChangeQuantity = (id, value) => {
    const newList = [...this.state.heroes];
    const hero = newList.find((hero) => hero.id === id);

    const newQuantity =
      hero.quantity + value < 0 || hero.quantity + value > 10
        ? hero.quantity
        : hero.quantity + value;

    // remove any leading zeros
    const trimmedQuantity = String(newQuantity).replace(/^0+/, "");
    // set back to type Number and change value
    hero.quantity = Number(trimmedQuantity);

    this.setState({ heroes: newList });
  };

  handleSearch = ({ target }) => {
    const { value } = target;
    const { heroes } = this.state;

    const filteredHeroes = heroes.filter((hero) => {
      const keywords = hero.powers.map((power) => power.toLowerCase().split(" ")).flat();

      return keywords.find((word) => word === value.toLowerCase());
    });

    const results = filteredHeroes.length ? filteredHeroes : heroes;
    this.setState({ searchResults: results, searchInput: target.value });
  };

  render() {
    const { heroes, searchInput, searchResults, squadData } = this.state;
    const list = searchResults.length < heroes.length ? searchResults : heroes;

    return (
      <section className="form">
        <div className="squad-information">
          {this.squadInformation.map(({ heading, id }) => (
            <InfoBlock
              key={id}
              className="squad-information-block"
              detail={squadData[id]}
              heading={heading}
            />
          ))}
        </div>
        <FormInput
          className="search-input"
          label="Search by Power"
          handleChange={this.handleSearch}
          value={searchInput}
        />
        <div className="hero-table">
          <div className="hero-table-row ">
            <h3 className="hero-name hero-table-heading-item">Name/Secret Identity</h3>
            <h3 className="powers-list-item heading-item">Powers</h3>
            <h3>Quantity</h3>
          </div>
          {list.map(({ id, name, secretIdentity, powers, quantity }, index) => (
            <div className="hero-table-row" key={index}>
              <div className="hero-name">
                {name}/{secretIdentity}
              </div>
              <div className="powers-list">
                {powers.map((power, index) => (
                  <span key={index} className="powers-list-item">
                    {power}
                  </span>
                ))}
              </div>
              <div className="number-input">
                <button
                  className="number-input-adjust"
                  onClick={() => this.handleChangeQuantity(id, -1)}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="0"
                  max="10"
                  value={quantity}
                  onChange={({ target }) => this.handleChangeQuantity(id, target.value)}
                />
                <button
                  className="number-input-adjust"
                  onClick={() => this.handleChangeQuantity(id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
