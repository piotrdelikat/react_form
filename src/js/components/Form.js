import React, { Component } from 'react';
import axios from 'axios';


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      date: "",
      isSubmited: false,
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
  }

  getCurrentDate() {
    const currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
      if (day<10) {
        day ='0'+ day;
      }
      if (month<10) {
        month='0'+ month;
      }
    return year + "-" + month + "-" + day
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post('/', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      date:this.state.date,
    })
    .then((response) => {
      if (response.status === 200) {
        this.setState({
          isSubmited: true
        });
      }
    })
    .catch((error) => {
      this.setState({
        error: true
      });
    })
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render () {
    let today = this.getCurrentDate();

    let form;
    let errorMessage;

    if (this.state.error) {
      errorMessage = (
        <div>
          <h1>Something goes wrong...please try again</h1>
        </div>
      );
    };

    if (!this.state.isSubmited) {
      form = (
        <form className="mx-auto" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Your first name: </label>
            <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} pattern="[A-z]{1,15}" title="First name should only contain letters. e.g. John" required  />
          </div>
          <div className="form-group">
            <label>Your last name: </label>
            <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} pattern="[A-z\d-]{1,30}" title="The last name should only contain letters or letters joined by dash. e.g. Scott" required  />
          </div>
          <div className="form-group">
          <label>Email adress: </label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} title="Please submit a valid email adress e.g. john@scott.co" required />
          </div>
          <div className="form-group">
            <label>Select the event date that suits you best:</label>
            <input type="date" name="date" min={today} onChange={this.handleChange} required />
          </div>
          <button type="submit" value="Confirm" className="btn btn-primary">Submit</ button>
        </form>
      );
      } else {
        form = (
      <p className="submit-message">
        Thank you {this.state.firstName} for choosing the date. You have chosen {this.state.date} as a best date for the next JavaScript event.
        We will respond to you at {this.state.email} with more info about the event.
      </p>
      );
    }
    return (
      <div className="row">
        {form}
        {errorMessage}
      </div>
    );
  }
}

export default Form
