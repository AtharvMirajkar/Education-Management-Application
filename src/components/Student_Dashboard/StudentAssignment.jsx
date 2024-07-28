import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { Button, Spinner } from "reactstrap";
import { API_URL } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const AssignmentList = () => {
  const { courseName } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useUser(); // userData contains _id and fullName for submissions

  useEffect(() => {
    fetchAssignments();
  }, [courseName]); // Fetch assignments whenever courseName changes

  const fetchAssignments = async () => {
    try {
      setLoading(true);

      // Fetch assignments
      const assignmentsResponse = await axios.get(
        `${API_URL}/api/assignments/${courseName}`
      );

      // Fetch submissions for the current user
      const submissionsResponse = await axios.get(
        `${API_URL}/api/submissions/${userData._id}`
      );

      // Fetch grades
      const gradesResponse = await axios.get(`${API_URL}/api/grades`);

      // Combine assignments with submission status and grades
      const assignmentsWithStatus = assignmentsResponse.data.map(
        (assignment) => {
          // Find submission for the current assignment
          const submission = submissionsResponse.data.find(
            (submission) => submission.assignmentId === assignment._id
          );

          // Find grade for the submission (if submission exists)
          const grade = submission
            ? gradesResponse.data.find(
                (grade) => grade.submissionId === submission._id
              )
            : null;

          return {
            ...assignment,
            submitted: !!submission, // Check if submission exists for the current user
            fileUrl: submission ? submission.fileUrl : null, // Get file URL from submission
            grade: grade ? grade.grade : "--",
            gradedAt: grade ? grade.gradedAt : "--",
            gradedBy: grade ? grade.gradedBy : "--",
          };
        }
      );

      setAssignments(assignmentsWithStatus);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      // Handle error (e.g., show error message)
    }
  };

  const handleFileChange = (e, assignmentId) => {
    const file = e.target.files[0];

    if (!file) return;

    // Update the state with the selected file for the corresponding assignmentId
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment._id === assignmentId
          ? { ...assignment, file: file }
          : assignment
      )
    );
  };

  const handleFileSubmit = async (assignmentId) => {
    const assignment = assignments.find(
      (assignment) => assignment._id === assignmentId
    );

    if (!assignment || !assignment.file) {
      alert("Please select a file to submit.");
      return;
    }

    const formData = new FormData();
    formData.append("file", assignment.file);
    formData.append("assignmentId", assignmentId);
    formData.append("userId", userData._id);
    formData.append("userName", userData.fullName);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // Submit the file
      const response = await axios.post(
        `${API_URL}/api/submissions`,
        formData,
        config
      );

      toast.success("Submission successful!");

      // Update assignment status after successful submission
      const updatedAssignments = assignments.map((assignment) =>
        assignment._id === assignmentId
          ? { ...assignment, submitted: true }
          : assignment
      );
      setAssignments(updatedAssignments);
    } catch (error) {
      console.error("Error submitting assignment:", error);
      if (error.response) {
        console.log("Error response:", error.response.data);
      }
      alert("Error submitting assignment. Please try again.");
    }
  };

  if (loading) {
    return (
      <div
        className="container text-center min-vh-100"
        style={{ marginTop: "180px" }}
      >
        <h1 className="mb-4 display-6">Submit your assignments</h1>
        <Spinner
          color="primary"
          style={{ height: "3rem", width: "3rem", marginTop: "80px" }}
        >
          Loading...
        </Spinner>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="container min-vh-100" style={{ marginTop: "180px" }}>
        <h1 className="mb-5 text-center display-6">{courseName} Assignments</h1>
        <p className="text-center fs-5 m-4 animated-text margin-top-bottom">
          Assignments not found for this course.
        </p>
      </div>
    );
  }

  return (
    <div className="container min-vh-100" style={{ marginTop: "180px" }}>
      <h1 className="mb-5 text-center display-6">{courseName} Assignments</h1>
      <p className="text-center fs-5 m-4">
        Submit your assignmnts before Due Date
      </p>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="text-center">
              <th>Section</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Submitted</th>
              <th>Action</th>
              <th>Grade</th>
              <th>Graded At</th>
              <th>Graded By</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id} className="text-center">
                <td>{assignment.section}</td>
                <td>{assignment.description}</td>
                <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                <td>{assignment.submitted ? "Yes" : "No"}</td>
                <td>
                  {assignment.submitted ? (
                    <button className="btn my-btn2 btn-sm px-2">
                      <a
                        href={assignment.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                          color: "white",
                        }}
                      >
                        View Submitted File
                      </a>
                    </button>
                  ) : (
                    <div>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, assignment._id)}
                        accept=".pdf, .png, .jpg, .jpeg"
                        multiple={false}
                      />
                      <button
                        type="button"
                        className="btn btn-success btn-sm px-4 m-2"
                        onClick={() => handleFileSubmit(assignment._id)}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </td>
                <td>{assignment.grade}</td>
                <td>
                  {assignment.gradedAt !== "--"
                    ? new Date(assignment.gradedAt).toLocaleString("en-US", {
                        timeZone: "Asia/Kolkata",
                        hour12: true,
                      })
                    : "--"}
                </td>
                <td>{assignment.gradedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AssignmentList;
