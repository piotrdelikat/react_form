import React, { Component } from 'react';
import { Control, Form } from 'react-redux-form';
import { connect } from 'react-redux';
import axios from 'axios';


class EventForm extends Component {

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
  };

  handleSubmit(event) {
    axios.post('/', {
      firstName: event.firstName,
      lastName: event.lastName,
      email: event.email,
      date: event.date,
    })
    .then((response) => {
      if (response.status === 200) {
        console.log(response)
        this.props.submit(response.data);
      }
    })
    .catch((error) => {
      this.props.errorOnSubmit();
    });
  };

  render () {
    let today = this.getCurrentDate();

    let form;
    let errorMessage;

    if (this.props.reducer.error) {
      errorMessage = (
          <p className='error-message'>Something goes wrong...please try again</p>
      );
    };

    if (!this.props.reducer.isSubmited) {
      form = (
        <Form model="userChoice" onSubmit={(userChoice) => this.handleSubmit(userChoice)}>
          <div className="form-group">
            <label htmlFor="userChoice.firstName">First name:</label>
            <Control.text model="userChoice.firstName" id="userChoice.firstName" pattern="[A-z]{1,15}" title="First name should only contain letters. e.g. John" required />
          </div>
          <div className="form-group">
            <label htmlFor="userChoice.lastName">Last name:</label>
            <Control.text model="userChoice.lastName" id="userChoice.lastName" pattern="[A-z\-]{1,30}" title="The last name should only contain letters or letters joined by dash. e.g. Scott" required />
          </div>
          <div className="form-group">
            <label htmlFor="userChoice.email">Email address:</label>
            <Control.text model="userChoice.email" id="userChoice.email" type="email" title="Please submit a valid email adress e.g. john@scott.co" required />
          </div>
          <div className="form-group">
            <label htmlFor="userChoice.date">Select the event date that suits you best:</label>
            <Control.text model="userChoice.date" id="userChoice.date" type="date" min={today} required />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
      </Form>
      );
      } else {
        form = (
          <p className="submit-message">
            Thank you {this.props.state.firstName} for choosing the date. You have chosen {this.props.state.date} as a best date for the next JavaScript event.
            We will respond to you at {this.props.state.email} with more info.
          </p>
      );
    }
    return (
      <div>
        {form}
        {errorMessage}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state: state.userChoice,
           reducer: state.reducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submit: () => dispatch({ type: 'FORM_SUBMITED' }),
    errorOnSubmit: () => dispatch({ type: 'SUBMIT_ERROR' })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
