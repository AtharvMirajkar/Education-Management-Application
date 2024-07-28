import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Spinner } from "reactstrap";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";

const Exam = () => {
  const { userData } = useUser();
  const { courseName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showExam, setShowExam] = useState(false); // State to manage exam visibility
  const [answers, setAnswers] = useState({}); // State to store user's answers
  const [marks, setMarks] = useState(null); // State to store exam marks
  const [percentage, setPercentage] = useState(null); // State to store exam percentage
  const [examStatus, setExamStatus] = useState(""); // State to store exam status (pass/fail)
  const [showResult, setShowResult] = useState(true); // State to manage result display

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/questions/${courseName}`
        );
        setQuestions(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError("Failed to fetch questions. Please try again later.");
      }
    };

    const fetchExamMarks = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/exam_marks/${userData._id}/${courseName}`
        );
        if (response.data) {
          setMarks(response.data.marks);
          setPercentage(response.data.percentage); // Set percentage from backend response
          setExamStatus(response.data.percentage < 40 ? "Fail" : "Pass");
        } else {
          setMarks(null);
          setPercentage(null);
          setExamStatus("");
        }
      } catch (err) {
        console.error("Error fetching exam marks:", err);
        setMarks(null);
        setPercentage(null);
        setExamStatus("");
      } finally {
        setLoading(false); // Set loading to false after fetching exam marks
      }
    };

    if (courseName) {
      fetchQuestions();
      fetchExamMarks(); // Fetch exam marks when courseName changes
    }

    // if(showResult){
    //   fetchExamMarks();
    // }
  }, [courseName, userData._id]);

  const handleStartExam = () => {
    setShowExam(true); // Show exam questions when start button is clicked
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption,
    });
  };

  const handleSubmitExam = async () => {
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit your answers?"
    );

    if (confirmSubmit) {
      try {
        // Calculate marks
        let calculatedMarks = 0;

        questions.forEach((question) => {
          const questionId = question._id;
          const selectedOptionIndex = answers[questionId]; // Get selected option index from answers object
          const correctAnswerIndex = question.correctAnswer; // Get correct answer index from question object

          // Check if selected option matches the correct answer
          if (
            selectedOptionIndex !== undefined &&
            selectedOptionIndex === correctAnswerIndex
          ) {
            calculatedMarks++;
          }
        });

        // Example endpoint for submitting answers
        const response = await axios.post(`${API_URL}/api/exam_marks`, {
          studentId: userData._id,
          courseName,
          answers,
          marks: calculatedMarks, // Send calculated marks to backend
        });

        // Handle success (e.g., show success message)
        console.log("Answers submitted successfully", response.data);

        setMarks(calculatedMarks); // Update marks in state after submission
        setPercentage(response.data.percentage); // Update percentage from backend response
        setExamStatus(response.data.percentage < 40 ? "Fail" : "Pass");

        // Show exam result after submission
        setShowResult(false);

        // Refresh the page to fetch updated data
        window.location.reload();

        toast.success("You have succesfully submitted the exam");
      } catch (error) {
        // Handle error (e.g., show error message)
        console.error("Error submitting answers", error);
      }
    }
  };

  const handleViewResult = () => {
    // Set showResult to true to display the result
    setShowResult(false);
  };

  const handleBackToExam = () => {
    // Set showResult to false to go back to exam questions
    setShowResult(true);
  };

  if (loading) {
    return (
      <div className="text-center margin-top-bottom">
        <Button color="primary" disabled>
          <Spinner size="sm">Loading...</Spinner>
          <span> Loading</span>
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="text-center min-vh-100 text-danger"
        style={{ marginTop: "180px" }}
      >
        <h4 className="fs-5">{error}</h4>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container text-center d-flex flex-column min-vh-100 justify-content-center animated-text">
        <h2>{`Currently no scheduled exam for ${courseName}`}</h2>
      </div>
    );
  }

  return (
    <div className="container margin-top-bottom">
      <h2 className="text-center m-4">{`Exam for ${courseName}`}</h2>

      {!showExam && (
        <div className="col-lg-8 mx-auto margin-top-bottom">
          <div className="mb-4">
            <h5>General Instructions:</h5>
            <ol>
              <li>This exam consists of multiple-choice questions.</li>
              <li>
                Read each question carefully before selecting your answer.
              </li>
              <li>Choose the best possible answer for each question.</li>
              <li>Only one answer is correct for each question.</li>
            </ol>
          </div>
          <div className="mb-4">
            <h5>Answering Questions:</h5>
            <ol>
              <li>Click on the radio button next to your chosen answer.</li>
              <li>
                You can change your answer by selecting a different option
                before submitting.
              </li>
              <li>
                Ensure you have selected an answer for each question before
                submitting your exam.
              </li>
            </ol>
          </div>
          <div className="mb-4">
            <h5>Exam Submission:</h5>
            <ol>
              <li>
                Once you have answered all questions, click on the "Submit"
                button.
              </li>
              <li>Review your answers before submitting to ensure accuracy.</li>
              <li>
                Your exam will be automatically submitted once the time limit
                expires, if applicable.
              </li>
            </ol>
          </div>

          {/* Condition to display Submit button */}
          {marks === null ? (
            <button className="btn btn-success" onClick={handleSubmitExam}>
              Submit
            </button>
          ) : null}

          <button className="btn btn-primary" onClick={handleStartExam}>
            Start Exam
          </button>
        </div>
      )}

      {showExam && (
        <div className="row mt-5">
          {questions.map((question) => (
            <div key={question._id} className="col-lg-8 mb-4 mx-auto">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{question.question}</h5>
                  <ul className="list-group list-group-flush">
                    {question.options.map((option, index) => (
                      <li key={index} className="list-group-item">
                        <input
                          type="radio"
                          name={`question${question._id}`}
                          id={`option${index}`}
                          onChange={() =>
                            handleAnswerChange(question._id, index)
                          }
                        />
                        <label htmlFor={`option${index}`} className="m-1">
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                  {marks === undefined || marks === null ? null : (
                    <>
                      <div className="mt-3">
                        <p className="mb-0 text-success">
                          <strong>Correct Answer:</strong>{" "}
                          {question.options[question.correctAnswer]}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="col-lg-8 mx-auto">
            {/* Conditional rendering based on showResult state */}

            {marks === undefined || marks === null ? (
              <button className="btn btn-success" onClick={handleSubmitExam}>
                Submit
              </button>
            ) : showResult ? (
              <button className="btn btn-primary" onClick={handleViewResult}>
                View Result
              </button>
            ) : (
              <>
                <button className="btn btn-primary" onClick={handleBackToExam}>
                  Hide Result
                </button>
                {/* Display result details */}
                <p className="mt-3">
                  Your marks: {marks} out of {questions.length}
                </p>
                <p className="mt-3">
                  Percentage: {percentage !== null ? percentage : "-"}%
                  <br />
                  Status: {examStatus}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Exam;
