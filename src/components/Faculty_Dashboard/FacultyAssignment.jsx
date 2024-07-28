import React, { useState, useEffect } from "react";
import axios from "axios";
import AssignmentCheck from "./AssignmentCheck";
import { useUser } from "../../context/UserContext";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";

const API = `${API_URL}/api/assignments`;

const FacultyAssignment = () => {
  const { userData } = useUser();
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]); // State for courses dropdown
  const [formData, setFormData] = useState({
    section: "",
    description: "",
    dueDate: "",
    userId: userData._id,
    courseName: "", // New field for courseName in formData
  });
  const [editingAssignmentId, setEditingAssignmentId] = useState(null);

  useEffect(() => {
    fetchAssignments();
    fetchCourses(); // Fetch courses when component mounts or userData.fullName changes
  }, [userData.fullName]);

  const fetchAssignments = () => {
    axios
      .get(`${API_URL}/api/assignments/faculty/${userData._id}`)
      .then((response) => {
        setAssignments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
      });
  };

  const fetchCourses = () => {
    axios
      .get(`${API_URL}/api/courses/${userData.fullName}`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAssignmentId) {
      axios
        .put(`${API}/${editingAssignmentId}`, {
          ...formData,
          userId: userData._id,
        })
        .then(() => {
          fetchAssignments();
          resetForm();
          toast.success("Assignment updated successfully");
        })
        .catch((error) => {
          console.error("Error updating assignment:", error);
          toast.error("Failed to update assignment. Please try again later.");
        });
    } else {
      axios
        .post(API, { ...formData, userId: userData._id })
        .then(() => {
          fetchAssignments();
          resetForm();
          toast.success("Assignment added successfully");
        })
        .catch((error) => {
          console.error("Error adding assignment:", error);
          toast.error("Failed to update assignment. Please try again later.");
        });
    }
  };

  const handleEdit = (assignment) => {
    setFormData({
      section: assignment.section,
      description: assignment.description,
      dueDate: assignment.dueDate,
      userId: userData._id,
      courseName: assignment.courseName, // Assuming assignment has a courseName field
    });
    setEditingAssignmentId(assignment._id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API}/${id}`, {
        data: { userId: userData._id },
      })
      .then(() => {
        fetchAssignments();
        resetForm();
        toast.warn("Assignment deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting assignment:", error);
        toast.error("Failed to delete assignment. Please try again later.");
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      section: "",
      description: "",
      dueDate: "",
      userId: userData._id,
      courseName: "",
    });
    setEditingAssignmentId(null);
  };

  // Function to group assignments by courseName
  const groupAssignmentsByCourse = () => {
    const groupedAssignments = {};
    assignments.forEach((assignment) => {
      const courseName = assignment.courseName;
      if (!groupedAssignments[courseName]) {
        groupedAssignments[courseName] = [];
      }
      groupedAssignments[courseName].push(assignment);
    });
    return groupedAssignments;
  };

  // Render different tables for each course
  const renderTables = () => {
    const groupedAssignments = groupAssignmentsByCourse();
    return Object.keys(groupedAssignments).map((courseName) => (
      <div key={courseName} className="mt-5">
        <h3 className="text-center mb-4">{courseName} Assignments</h3>
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center">
            <thead>
              <tr>
                <th>Section</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedAssignments[courseName].map((assignment) => (
                <tr key={assignment._id}>
                  <td>{assignment.section}</td>
                  <td>{assignment.description}</td>
                  <td>{assignment.dueDate}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm px-4 m-2"
                      onClick={() => handleEdit(assignment)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm px-3 m-2"
                      onClick={() => handleDelete(assignment._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ));
  };

  return (
    <div className="container margin-top-bottom col-lg-8">
      <h2 className="m-5 display-6 text-center">Add/Edit Assignments</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-2">
          <label htmlFor="course">Course:</label>
          <select
            className="form-control"
            id="course"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="section">Section:</label>
          <input
            type="text"
            className="form-control"
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn my-btn2 mt-2 text-center">
          {editingAssignmentId ? "Update" : "Submit"}
        </button>
        {editingAssignmentId && (
          <button
            type="button"
            className="btn my-btn2 m-2 mt-3"
            style={{ backgroundColor: "#677583" }}
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Render tables for each course */}
      {assignments.length > 0 && renderTables()}

      {/* Display AssignmentCheck component */}
      {/* <AssignmentCheck assignments={assignments} /> */}
    </div>
  );
};

export default FacultyAssignment;
