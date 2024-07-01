import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

function Contact({ onClose }) {
  const [contactType, setContactType] = useState("");
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission, e.g., send feedback to backend
    // console.log({ contactType, feedback , email});
    axios
      .post("/api/feedback", { contactType, feedback, email })
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error processing image:", error);
      });
    setSubmitted(true);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white p-5 rounded shadow-lg max-w-md w-full relative">
        <button
          className="absolute top-2 right-3 text-xl text-black"
          onClick={onClose}
        >
          &times;
        </button>
        {submitted ? (
          <div className="text-center">
            <p>Thank you for your feedback!</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl mb-4">Contact Us</h2>
            <div className="mb-4">
              {/* <label className="block mb-2">Type of Contact</label> */}
              <select
                className="w-full p-2 border rounded"
                value={contactType}
                onChange={(e) => setContactType(e.target.value)}
                required
              >
                <option value="">Select an option</option>
                <option value="suggest-feature">Suggest Feature</option>
                <option value="report-bug">Report Bug</option>
                <option value="ask-question">Ask Question</option>
                <option value="share-feedback">Share Feedback</option>
              </select>
            </div>
            <div className="mb-4">
              <textarea
                className="w-full p-2 border rounded"
                placeholder="What's up?"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded required" />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
