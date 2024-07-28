import React from "react";
import { Link } from "react-router-dom";
import StudentCounter from "../Student_Dashboard/StudentCounter";
import CoursesCount from "../Student_Dashboard/CoursesCount";
import FacultySubject from "../Faculty_Dashboard/FacultySubject";
import GenderPieChart from "../Student_Dashboard/GenderPieChart";
import CalendarComponent from "../Student_Dashboard/CalendarComponent";
import CourseDetailsChart from "./CourseDetailsChart";
import AttendanceChart from "./AttendanceChart";

const AdminDataDashboard = () => {
  return (
    <div className="container margin-top-bottom">
      <h1 className="text-center mb-4 display-6">
        Admin Data Visualization Dashboard
      </h1>

      {/* First row: StudentCounter and CoursesCount */}
      <div className="row justify-content-around mb-4">
        <div className="col-lg-4 col-md-12 mb-4">
          <Link to="/admin/user_list" style={{ textDecoration: "none" }}>
            <div className="card shadow">
              <div className="card-body">
                <StudentCounter />
              </div>
            </div>
          </Link>
        </div>
        <div className="col-lg-4 col-md-12 mb-2">
          <Link to="/admin/user_list" style={{ textDecoration: "none" }}>
            <div className="card shadow">
              <div className="card-body">
                <FacultySubject />
              </div>
            </div>
          </Link>
        </div>
        <div className="col-lg-4 col-md-12 mb-4">
          <Link to="/admin/manage_courses" style={{ textDecoration: "none" }}>
            <div className="card shadow">
              <div className="card-body">
                <CoursesCount />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Second row: SubjectBarChart and GenderPieChart */}
      <div className="row justify-content-around mb-4">
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card shadow p-2 pb-4">
            <CourseDetailsChart />
          </div>
        </div>

        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card shadow p-2 pb-4">
            <AttendanceChart />
          </div>
        </div>
      </div>

      <div className="row justify-content-around mb-4">
        <div className="col-lg-6 col-md-12 mb-4">
          <GenderPieChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDataDashboard;
