import React, { useEffect, useState } from "react";
import AttendanceData from "./AtendanceData";
import StudentCounter from "../Student_Dashboard/StudentCounter";
import FacultySubject from "./FacultySubject";
import ResultBarChart from "./ResultBarChart";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";

const FacultyDataDashboard = () => {
  const { userData } = useUser();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/courses/${userData.fullName}`
        );
        // Assuming response.data is an array of courses
        setCourses(response.data);
      } catch (error) {
        console.log("Error fetching courses: ", error);
      }
    };

    if (userData.fullName) {
      fetchCourses();
    }
  }, [userData.fullName]);

  return (
    <div className="container margin-top-bottom">
      <h1 className="text-center mb-4 display-6">Faculty Data Dashboard</h1>
      <div className="row">
        <div className="col-lg-7 col-md-12 mb-4 mt-2">
          <div className="card shadow">
            <div className="card-body p-4">
              <AttendanceData />
            </div>
          </div>
        </div>

        <div className="col-lg-5 col-md-12 d-flex">
          <div className="row">
            <div className="col-md-6 col-lg-12 mb-2">
              <div className="card shadow">
                <div className="card-body">
                  <StudentCounter />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-12 mb-2">
              <div className="card shadow">
                <div className="card-body">
                  <FacultySubject />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-12 mb-2 text-center">
              <div className="card shadow">
                <Link
                  to="/faculty_courses"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <div className="card-body">
                    <h4>Your Course as follows</h4>
                    {courses.map((course) => (
                      <h5 className="p-2">{course.name}</h5>
                    ))}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {courses.map((course) => (
          <div key={course._id}>
            <ResultBarChart course={course.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyDataDashboard;
