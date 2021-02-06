import React, { Component } from "react";
import { HeroService } from "./heroService";
import newHeroes from "./newHeros.json";

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
        heading: "Secret Base (declassified)",
        id: "secretBase",
      },
    ];

    this.state = { heroes: [], squadData: {} };
  }

  componentDidMount() {
    const service = new HeroService();
    service.getHeros(this.mergeHeroes);
  }

  mergeHeroes = (squadData) => {
    const allHeroes = [...squadData.members, ...newHeroes];
    const heroesAsProducts = allHeroes.map((hero, index) => ({ ...hero, id: index, quantity: 0 }));

    this.setState({ squadData, heroes: heroesAsProducts });
  };

  handleChangeQuantity = (id, value) => {
    const newList = [...this.state.heroes];
    const hero = newList.find((hero) => hero.id === id);
    const newQuantity =
      hero.quantity + value < 0 || hero.quantity + value > 10
        ? hero.quantity
        : hero.quantity + value;

    hero.quantity = newQuantity;

    this.setState({ heroes: newList });
  };

  render() {
    const { heroes, squadData } = this.state;
    return (
      <section className="form">
        <div className={"squad-information"}>
          {this.squadInformation.map(({ heading, id }) => (
            <InfoBlock key={id} heading={heading} detail={squadData[id]} />
          ))}
        </div>
        <div className="hero-table">
          <div className="hero-table-row ">
            <h3 className="hero-name hero-table-heading-item">Name/Secret Identity</h3>
            <h3 className="powers-list-item heading-item">Powers</h3>
            <h3>Quantity</h3>
          </div>
          {heroes.map(({ id, name, secretIdentity, powers, quantity }, index) => (
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
