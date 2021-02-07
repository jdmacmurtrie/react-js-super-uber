import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { selectors } from "../heroes.js";

import InfoBlock from "../components/InfoBlock";

import { customerFields } from "./InformationForm";

class Summary extends Component {
  uniquePowers = () => {
    const { heroes } = this.props;
    const allPowers = heroes
      .filter((hero) => hero.quantity)
      .map((hero) => hero.powers)
      .flat();

    return [...new Set(allPowers)];
  };

  heroQuantities = () => {
    const { heroes } = this.props;

    return heroes
      .sort((a, b) => b.quantity - a.quantity)
      .map((hero) => ({ name: `${hero.name}/${hero.secretIdentity}`, quantity: hero.quantity }));
  };

  render() {
    const { customerData, numberOfHeroes } = this.props;

    return (
      <Fragment>
        <h2 className="summary-heading summary-page-heading">Hero Request Summary</h2>
        <section className="summary-information-container">
          <h3 className="summary-heading">Customer Information</h3>
          <div className="summary-information">
            {customerFields.map((field) => (
              <InfoBlock
                key={field.id}
                className="summary-information-block"
                heading={field.label}
                detail={customerData[field.id]}
              />
            ))}
          </div>
        </section>
        <section className="summary-information-container">
          <h3 className="summary-heading">Heroes Requested</h3>
          <div className="summary-hero-request">
            {this.heroQuantities().map(({ name, quantity }) => (
              <div key={name} className="summary-quantity">
                <div className="summary-quantity-name">{name}</div>
                <div>x{quantity}</div>
              </div>
            ))}
          </div>
          <h5 className="summary-total">Total Heroes: {numberOfHeroes}</h5>
          <h3 className="summary-heading">Unique Powers</h3>
          <div className="summary-hero-request">
            {this.uniquePowers().map((power) => (
              <div key={power}>{power}</div>
            ))}
          </div>
          <h5 className="summary-total">Total Powers: {this.uniquePowers().length}</h5>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  customerData: state.customer,
  heroes: selectors.getHeroes(state),
  numberOfHeroes: selectors.getNumberOfHeroes(state),
  squadData: selectors.getSquadData(state),
});

export default connect(mapStateToProps)(Summary);
