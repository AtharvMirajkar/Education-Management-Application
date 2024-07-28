import React, { useState, useEffect } from "react";
import { Button, Spinner } from "reactstrap";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { API_URL } from "../../constants";

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userData } = useUser();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/courses`)
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center margin-top-bottom vh-100">
        <Spinner
          color="primary"
          style={{
            height: "3rem",
            width: "3rem",
            marginTop: "120px",
          }}
        >
          Loading...
        </Spinner>
      </div>
    );
  }

  return (
    <div
      className="container min-vh-100 text-center d-flex flex-column gap-4 margin-top-bottom"
      style={{ marginTop: "150px" }}
    >
      <h2 className="display-6">Student Courses</h2>
      <p className="fs-4 mt-2">
        Hello, {userData.fullName}, Your enrolled courses are as follows
      </p>
      <div className="table-responsive col-md-12 col-sm-12 col-lg-8 mx-auto">
        <table className="table table-striped table-bordered ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Faculty</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>{course._id.substring(course._id.length - 6)}</td>
                <td>{course.name}</td>
                <td>{course.faculty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentCourses;
