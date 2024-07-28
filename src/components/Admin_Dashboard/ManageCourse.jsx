import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../constants";

function ManageCourse() {
  const [courses, setCourses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedCourse, setEditedCourse] = useState({
    id: null,
    name: "",
    faculty: "",
  });
  const [newCourse, setNewCourse] = useState({ name: "", faculty: "" });
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    fetchData();
    fetchFacultyData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/courses`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchFacultyData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/usersData`);
      const facultyData = response.data.filter(
        (user) => user.role === "faculty"
      );
      const facultyNames = facultyData.map((user) => user.fullName);
      setFacultyList(facultyNames);
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    }
  };

  const handleAddCourse = async () => {
    try {
      await axios.post(`${API_URL}/api/courses`, newCourse);
      setShowAddModal(false);
      setNewCourse({ name: "", faculty: "" });
      fetchData();
      toast.success("Course added successfully");
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/courses/${id}`);
      fetchData();
      toast.warn("Course deleted");
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Error deleting course");
    }
  };

  const handleEditCourse = async () => {
    try {
      await axios.put(
        `${API_URL}/api/courses/${editedCourse.id}`,
        editedCourse
      );
      setShowEditModal(false);
      setEditedCourse({ id: null, name: "", faculty: "" });
      fetchData();
      toast("Course edited successfully");
    } catch (error) {
      console.error("Error editing course:", error);
      toast.error("Error editing course");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse({ ...editedCourse, [name]: value });
  };

  const handleEditModalShow = (id, name, faculty) => {
    setEditedCourse({ id, name, faculty });
    setShowEditModal(true);
  };

  return (
    <Container className="margin-top-bottom text-center min-vh-100">
      <h1>Course Management</h1>
      <Button className="my-2" onClick={() => setShowAddModal(true)}>
        Add Course
      </Button>

      {courses.length === 0 ? (
        <p className="fs-4 m-5 animated-text">
          Courses have not been assigned yet
        </p>
      ) : (
        <Table striped bordered hover responsive className="mt-5">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Faculty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>{course._id.substring(course._id.length - 6)}</td>
                <td>{course.name}</td>
                <td>{course.faculty}</td>
                <td>
                  <Button
                    variant="primary"
                    className="btn-sm px-3 m-1"
                    onClick={() =>
                      handleEditModalShow(
                        course._id,
                        course.name,
                        course.faculty
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>{" "}
                  <Button
                    variant="danger"
                    className="btn-sm px-3 m-1"
                    onClick={() => handleDeleteCourse(course._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCourseName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course name"
                name="name"
                value={newCourse.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formFaculty">
              <Form.Label>Faculty</Form.Label>
              <Form.Control
                as="select"
                name="faculty"
                value={newCourse.faculty}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Faculty</option>
                {facultyList.map((faculty, index) => (
                  <option key={index} value={faculty}>
                    {faculty}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCourse}>
            Add Course
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditCourseName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course name"
                name="name"
                value={editedCourse.name}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEditFaculty">
              <Form.Label>Faculty</Form.Label>
              <Form.Control
                as="select"
                name="faculty"
                value={editedCourse.faculty}
                onChange={handleEditInputChange}
              >
                <option value="">Select Faculty</option>
                {facultyList.map((faculty, index) => (
                  <option key={index} value={faculty}>
                    {faculty}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditCourse}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ManageCourse;
