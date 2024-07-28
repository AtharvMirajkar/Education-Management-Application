import React, { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import FileUploadComponent from "./FileUploadComponent";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { API_URL } from "../../constants";

const FacultyExams = () => {
  const { userData } = useUser();
  const [questions, setQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);

  // Function to fetch questions
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/questions`);

      // Filter questions where courseFaculty matches userData.fullName
      const filteredQuestions = response.data.filter(
        (question) => question.courseFaculty === userData.fullName
      );
      setQuestions(filteredQuestions);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleFileUpload = (file) => {
    console.log(file);
  };

  const toggleQuestionForm = () => {
    setShowQuestionForm(true);
    setShowFileUpload(false);
  };

  const toggleFileUpload = () => {
    setShowFileUpload(true);
    setShowQuestionForm(false);
  };

  return (
    <div className="margin-top-bottom">
      <h2 className="text-center display-6">Manage your Exam</h2>
      <div className="text-center m-4">
        <button className="btn btn-primary me-2" onClick={toggleQuestionForm}>
          Add Question
        </button>
        <button className="btn btn-primary" onClick={toggleFileUpload}>
          Upload File
        </button>
      </div>
      {showQuestionForm && <QuestionForm fetchQuestions={fetchQuestions} />}
      {showFileUpload && (
        <FileUploadComponent fetchQuestions={fetchQuestions} />
      )}
      <QuestionList questions={questions} fetchQuestions={fetchQuestions} />
    </div>
  );
};

export default FacultyExams;
