import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actions } from "../customer.js";

import Button from "../components/Button";
import FormInput from "../components/FormInput";

export const customerFields = [
  { id: "name", label: "Name", required: true },
  { id: "phoneNumber", label: "Phone Number" },
  { id: "email", label: "Email", required: true },
  { id: "zipCode", label: "Zip Code" },
];
class InformationForm extends Component {
  constructor() {
    super();

    this.state = {
      invalidFields: [],
    };
  }

  handleChange = ({ target }, id) => {
    this.props.updateCustomer({ [id]: target.value });
  };

  validatePhone = (phone) => {
    const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    return regex.test(Number(phone)) || phone.trim() === "";
  };

  validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  validateZip = (zip) => (zip.length === 5 && Number(zip)) || zip.trim() === "";

  handleSubmit = () => {
    /*
      Per instructions, validations only happen upon submit.  There are two side effects of this:
      1) Error messages will remain until submit is clicked, even if correct info is entered.
      2) User may return to edit this form after Hero Form has been opened, thus skipping the validation.
    */
    const { email, handleSubmit, phoneNumber, zipCode } = this.props;
    const requiredFields = customerFields.filter((field) => field.required);
    const requiredFieldErrors = requiredFields.map((field) =>
      Boolean(this.props[field.id].trim()) ? "" : field.id
    );

    const phoneError = this.validatePhone(phoneNumber) ? "" : "phoneNumber";
    const emailError = this.validateEmail(email) ? "" : "email";
    const zipError = this.validateZip(zipCode) ? "" : "zipCode";

    const invalidFields = [...requiredFieldErrors, phoneError, emailError, zipError].filter(
      (field) => field
    );

    if (invalidFields.length) {
      this.setState({ invalidFields });
      handleSubmit(false);

      return;
    }

    this.setState({ invalidFields: [] });
    handleSubmit(true);
  };

  render() {
    const { invalidFields } = this.state;

    return (
      <section onSubmit={this.handleSubmit} className="form">
        {customerFields.map((field) => (
          <FormInput
            key={field.id}
            handleChange={this.handleChange}
            showError={invalidFields.includes(field.id)}
            value={this.props[field.id]}
            {...field}
          />
        ))}
        <Button onClick={this.handleSubmit}>Continue</Button>
      </section>
    );
  }
}

const mapStateToProps = (state) => state.customer;
const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InformationForm);
