import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./FeedbackList.css";

const FeedbackList = () => {
  const [isListShown, setListStatus] = useState(false);
  const feedbacks = useSelector((state) => state.feedbacks);

  const handleClick = () => {
    setListStatus(true);
  };

  return (
    <div className="feedback-list">
      {!isListShown ? (
        <button onClick={handleClick} className="list-btn">
          Show Feedbacks
        </button>
      ) : feedbacks.length ? (
        <div className="table">
          <div className="head">
            <div>First Name</div>
            <div>Last Name</div>
            <div>Email</div>
            <div>Message</div>
          </div>
          {feedbacks.map(({ firstName, lastName, email, message }) => (
            <div key={Date.now()} className="row">
              <div>{firstName}</div>
              <div>{lastName}</div>
              <div>{email}</div>
              <div>{message}</div>
            </div>
          ))}
        </div>
      ) : (
        <h2>Feedbacks list is empty.</h2>
      )}
    </div>
  );
};

export default FeedbackList;
