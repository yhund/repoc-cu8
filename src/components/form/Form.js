import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addFeedback } from "../../redux/feedback/action";
import { isInputEmpty, isMessageLengthValid, isValidEmail } from "../../utils";

import "./Form.css";

const Form = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [isTouched, setTouchedStatus] = useState(initialValues);
  const [isSubmitted, setSubmitStatus] = useState(false);
  const dispatch = useDispatch();

  const handleFormInput = (event) => {
    setFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouchedStatus((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addFeedback(formValues));
    setFormValues(initialValues);
    setTouchedStatus(initialValues);
    setSubmitStatus(true);

    setTimeout(() => {
      setSubmitStatus(false);
    }, 2500);
  };

  const isFirstNameValid = !isInputEmpty(formValues.firstName);
  const isLastNameValid = !isInputEmpty(formValues.lastName);
  const hasErrorMessage =
    !isMessageLengthValid(formValues.message) && !!isTouched.message;
  const isMessageFieldEmpty =
    isInputEmpty(formValues.message) && !!isTouched.message;

  const hasErrorEmail = !isValidEmail(formValues.email) && !!isTouched.email;
  const isEmailFieldEmpty = isInputEmpty(formValues.email) && !!isTouched.email;

  const isButtonDisabled =
    !isFirstNameValid ||
    !isLastNameValid ||
    !isMessageLengthValid(formValues.message) ||
    isInputEmpty(formValues.message) ||
    hasErrorEmail ||
    isInputEmpty(formValues.email);

  return (
    <div className="form-component">
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleFormInput}
          onBlur={handleBlur}
          value={formValues.firstName}
          name="firstName"
          className="input"
          type="text"
          aria-label="first-name"
          placeholder="First Name"
          required
        />
        {!isFirstNameValid && !!isTouched.firstName && (
          <p className="form-error">This field is required!</p>
        )}
        <input
          onChange={handleFormInput}
          onBlur={handleBlur}
          value={formValues.lastName}
          name="lastName"
          className="input"
          type="text"
          aria-label="last-name"
          placeholder="Last Name"
          required
        />
        {!isLastNameValid && !!isTouched.lastName && (
          <p className="form-error">This field is required!</p>
        )}
        <input
          onChange={handleFormInput}
          onBlur={handleBlur}
          value={formValues.email}
          name="email"
          className="input"
          type="email"
          aria-label="email"
          placeholder="Email"
          required
        />
        {isEmailFieldEmpty ? (
          <p className="form-error">This field is required!</p>
        ) : hasErrorEmail ? (
          <p className="form-error">Please provide valid email.</p>
        ) : null}
        <textarea
          onChange={handleFormInput}
          onBlur={handleBlur}
          name="message"
          value={formValues.message}
          className="input"
          placeholder="Message"
          required
          aria-label="textarea"
        />
        {isMessageFieldEmpty ? (
          <p className="form-error">This field is required!</p>
        ) : hasErrorMessage ? (
          <p className="form-error">
            The minimum length of message is 10 characters.
          </p>
        ) : null}
        <button
          disabled={isButtonDisabled}
          className="submit-button"
          type="submit"
          aria-label="submit-button"
        >
          Submit
        </button>
      </form>

      <div
        aria-label="submit-message"
        className="submit-message"
        style={{
          right: isSubmitted ? 0 : "-360px",
          transition: "right 0.5s ease",
        }}
      >
        <p>Your feedback has been saved!</p>
      </div>
    </div>
  );
};

export default Form;
