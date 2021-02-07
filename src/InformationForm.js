import React, { Component } from "react";
import FormInput from "./components/FormInput";

export default class InformationForm extends Component {
  constructor() {
    super();

    this.formFields = [
      { id: "name", label: "Name *", required: true },
      { id: "phoneNumber", label: "Phone Number" },
      { id: "email", label: "Email *", required: true },
      { id: "zipCode", label: "Zip Code" },
    ];

    this.state = {
      name: "",
      phoneNumber: "",
      email: "",
      zipCode: "",
      invalidFields: [],
    };
  }

  handleChange = ({ target }, id) => {
    this.setState({ [id]: target.value });
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
    const { handleSubmit } = this.props;
    const { email, phoneNumber, zipCode } = this.state;
    const requiredFields = this.formFields.filter((field) => field.required);
    const requiredErrors = requiredFields.map((field) =>
      Boolean(this.state[field.id].trim()) ? "" : field.id
    );

    const phoneError = this.validatePhone(phoneNumber) ? "" : "phoneNumber";
    const emailError = this.validateEmail(email) ? "" : "email";
    const zipError = this.validateZip(zipCode) ? "" : "zipCode";

    const allInvalidFields = [...requiredErrors, phoneError, emailError, zipError].filter(
      (field) => field
    );

    if (allInvalidFields.length) {
      this.setState({ invalidFields: allInvalidFields });
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
        {this.formFields.map((field) => (
          <FormInput
            key={field.id}
            handleChange={this.handleChange}
            showError={invalidFields.includes(field.id)}
            value={this.state[field]}
            {...field}
          />
        ))}
        <button onClick={this.handleSubmit}>Continue</button>
      </section>
    );
  }
}
