import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { HeroService } from "../heroService";
import { actions, selectors } from "../heroes.js";

import FormInput from "../components/FormInput";
import InfoBlock from "../components/InfoBlock";

class HeroForm extends Component {
  constructor() {
    super();

    this.squadInformation = [
      { heading: "Squad Name", id: "squadName" },
      { heading: "Home Town", id: "homeTown" },
      { heading: "Year Founded", id: "formed" },
      { heading: "Secret Base", id: "secretBase" },
    ];

    this.state = { searchInput: "", searchResults: [] };
  }

  componentDidMount() {
    const service = new HeroService();
    service.getHeroes(this.props.loadData);
  }

  componentDidUpdate(prevProps) {
    const { heroes } = this.props;
    if (prevProps.heroes.length !== heroes.length) {
      this.setState({ searchResults: heroes });
    }
  }

  handleSearch = ({ target }) => {
    const { value } = target;
    const { heroes } = this.props;

    const filteredHeroes = heroes.filter((hero) => {
      const keywords = hero.powers.map((power) => power.toLowerCase().split(" ")).flat();

      return keywords.find((word) => word === value.toLowerCase());
    });

    const results = filteredHeroes.length ? filteredHeroes : heroes;
    this.setState({ searchResults: results, searchInput: target.value });
  };

  render() {
    const { squadData, updateHero } = this.props;
    const { searchInput, searchResults } = this.state;

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
            <h3 className="powers-list-item hero-table-heading-item">Powers</h3>
            <h3 className="hero-table-heading-item">Quantity</h3>
          </div>
          {searchResults.map(({ id, name, secretIdentity, powers, quantity }, index) => (
            <div className="hero-table-row" key={index}>
              {/* {name row} */}
              <div className="hero-name">
                {name}/{secretIdentity}
              </div>

              {/* {powers row} */}
              <div className="powers-list">
                {powers.map((power, index) => (
                  <span key={index} className="powers-list-item">
                    {power}
                  </span>
                ))}
              </div>

              {/* {quantity row} */}
              <div className="number-input">
                <button className="number-input-adjust" onClick={() => updateHero(id, -1)}>
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="0"
                  max="10"
                  value={quantity}
                  onChange={({ target }) => updateHero(id, target.value)}
                />
                <button className="number-input-adjust" onClick={() => updateHero(id, 1)}>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);

const mapStateToProps = (state) => ({
  squadData: selectors.getSquadData(state),
  heroes: selectors.getHeroes(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroForm);
