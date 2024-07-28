import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";

const QuestionList = ({ questions, fetchQuestions }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/questions/${id}`);
      fetchQuestions(); // Fetch updated list of questions after deletion
      toast.warn("Question deleted");
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  const handleDeleteAll = async (courseName) => {
    try {
      await axios.delete(`${API_URL}/api/questions/${courseName}`);
      fetchQuestions(); // Fetch updated list of questions after deletion
      toast.warn("All questions deleted");
    } catch (err) {
      console.error("Error deleting all questions:", err);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Question Bank</h2>
        <p className="text-center animated-text mt-5">
          No questions available.
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Question Bank</h2>

      {/* <div className="mb-3">
        <button
          className="btn btn-danger mb-3"
          onClick={() => handleDeleteAll(questions[0].courseName)}
        >
          Delete All
        </button>
      </div> */}

      <div className="row">
        {questions.map((question) => (
          <div key={question._id} className="col-lg-6 mb-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title">{question.question}</h5>
                <span
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(question._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {question.options.map((option, index) => (
                    <li key={index} className="list-group-item">
                      <input type="radio" disabled />{" "}
                      <span className="m-2">{option}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3">
                  <p className="mb-0">
                    <strong>Correct Answer:</strong>{" "}
                    {question.options[question.correctAnswer]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
