import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { selectors } from "../heroes.js";

import InformationForm from "./InformationForm";
import HeroForm from "./HeroForm";
import Button from "../components/Button";
import Drawer from "../components/Drawer";

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { infoComplete: false, infoDrawer: true, heroDrawer: false };
  }

  toggleDrawer = (id, status) => {
    this.setState({ [id]: status });
  };

  handleInformationSubmit = (infoComplete) => {
    this.setState({ infoComplete });

    if (infoComplete) {
      this.setState({ infoDrawer: false, heroDrawer: true });
    }
  };

  render() {
    const { numberOfHeroes } = this.props;
    const { infoComplete, infoDrawer, heroDrawer } = this.state;
    const formComplete = infoComplete && numberOfHeroes;

    return (
      <Fragment>
        <Drawer
          open={infoDrawer}
          heading="Customer Information"
          toggleDrawer={(status) => this.toggleDrawer("infoDrawer", status)}
        >
          <InformationForm handleSubmit={this.handleInformationSubmit} />
        </Drawer>
        <Drawer
          open={infoComplete && heroDrawer}
          toggleDrawer={() => this.toggleDrawer("heroDrawer")}
          heading="Select Heroes"
        >
          <HeroForm />
        </Drawer>
        <Link to="/summary">
          <Button disabled={!formComplete}>Request Heroes</Button>
        </Link>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  numberOfHeroes: selectors.getNumberOfHeroes(state),
});

export default connect(mapStateToProps)(FormContainer);
