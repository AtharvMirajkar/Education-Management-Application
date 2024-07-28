import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";

const AssignmentCourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container d-flex flex-column min-vh-100">
      <h2 className="display-6 text-center margin-top-bottom">
        Assignments Section
      </h2>
      <div className="row col-md-10 mx-auto">
        {courses.map((course) => (
          <div key={course._id} className="col-lg-4 col-md-6 mb-5">
            <div className="card h-100 text-center">
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">{course.description}</p>
              </div>
              <div className="card-footer">
                <Link
                  to={`/assignment/${course.name}`} // Navigate to exam with course name as parameter
                  className="btn btn-primary"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentCourseList;
