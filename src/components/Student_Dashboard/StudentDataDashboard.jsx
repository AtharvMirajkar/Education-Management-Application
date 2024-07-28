import React from "react";
import SubjectBarChart from "./SubjectBarChart";
import StudentCounter from "./StudentCounter";
import GenderPieChart from "./GenderPieChart";
import CoursesCount from "./CoursesCount";
import { Link } from "react-router-dom";
import CalendarComponent from "./CalendarComponent";

const StudentDataDashboard = () => {
  return (
    <div className="container margin-top-bottom">
      <h1 className="text-center mb-4 display-6">
        Student Data Visualization Dashboard
      </h1>

      {/* First row: StudentCounter and CoursesCount */}
      <div className="row justify-content-around mb-4">
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <StudentCounter />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 mb-4">
          <Link to="/student_courses" style={{ textDecoration: "none" }}>
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
          <SubjectBarChart />
        </div>
        <div className="col-lg-6 col-md-12 mb-4">
          <GenderPieChart />
        </div>
      </div>

      {/* Third row: CalendarComponent */}
      <div className="row justify-content-around mb-4">
        <div className="col-md-12">
          <CalendarComponent />
        </div>
      </div>
    </div>
  );
};

export default StudentDataDashboard;
