import React, { Component, Fragment } from "react";

import InformationForm from "./InformationForm";
import HeroForm from "./HeroForm";
import Drawer from "./components/Drawer";

export default class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { infoComplete: true, infoDrawer: false, heroDrawer: true };
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
    const { infoComplete, infoDrawer, heroDrawer } = this.state;

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
      </Fragment>
    );
  }
}
