import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../Dashboard";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { API_URL } from "../../constants";

const FacultyDashboard = () => {
  const { userData } = useUser();

  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/notifications/${userData.role}`
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications: ", error);
    }
  };

  useEffect(() => {
    // Display toast when notifications change
    notifications.forEach((notification) => {
      toast.info(
        <div onClick={() => handleNotificationClick(notification)}>
          {notification.title}
        </div>,
        { autoClose: 3000 }
      );
    });
  }, [notifications]);

  const handleNotificationClick = () => {
    // Navigate to /notifications when a toast is clicked
    navigate("/notifications");
  };

  const cards = [
    {
      image:
        "https://img.freepik.com/free-vector/competent-resume-writing-professional-cv-constructor-online-job-application-profile-creation-african-american-woman-filling-up-digital-form-concept-illustration_335657-2053.jpg?t=st=1717146650~exp=1717150250~hmac=418967f7967eb53f9a283fa2fa379a43dc6813d523ebc759a5b9f48840537b0d&w=740",
      title: "My Profile",
      description: "View and update your profile information.",
      buttonText: "Go to Profile",
      link: "/faculty_profile",
    },
    {
      image:
        "https://img.freepik.com/free-photo/front-view-stacked-books-graduation-cap-open-book-education-day_23-2149241017.jpg?w=740&t=st=1717146244~exp=1717146844~hmac=41e2fcdef80c2cffdfa50e20fee9dc3ea2e859b2384b0f3e5d0b7a10b03ae6ad",
      title: "My Courses",
      description: "View courses you are teaching and manage grades.",
      buttonText: "View Courses",
      link: "/faculty_courses",
    },
    {
      image:
        "https://img.freepik.com/free-vector/build-your-program-appointment-booking_23-2148552954.jpg?t=st=1717146308~exp=1717149908~hmac=188717a9343218b0e2761fb9b34ef6a1f66aa859532cfa51815583f473f45f42&w=740",
      title: "My Schedule",
      description: "View your teaching schedule and upcoming events.",
      buttonText: "View Schedule",
      link: "/faculty_schedule",
    },
    {
      image:
        "https://img.freepik.com/free-photo/3d-render-hand-with-pencil-put-marks-calendar_107791-15908.jpg?t=st=1717146396~exp=1717149996~hmac=ca16b5c5ede8fbbd40839f09d9671a7664cf20793e41463a1d3d30b02e2a02c4&w=740",
      title: "Attendance",
      description: "Manage attendance records for your courses.",
      buttonText: "Manage Attendance",
      link: "/faculty_attendance",
    },
    {
      image:
        "https://img.freepik.com/free-vector/businessman-holding-pencil-big-complete-checklist-with-tick-marks_1150-35019.jpg?t=st=1717146454~exp=1717150054~hmac=ef35e130b0ed9283c9c13af8625d385ca84c09436f51c054baa3d31cf1e961b9&w=740",
      title: "Assignments",
      description: "View and manage assignments for your courses.",
      buttonText: "Manage Assignments",
      link: "/faculty_assignment",
    },
    {
      image:
        "https://img.freepik.com/free-vector/man-getting-award-writing_74855-5891.jpg?w=826&t=st=1719894848~exp=1719895448~hmac=3eacebbf041e10625cdaa1a17773b093149f0938748a32f3d7ab600a92797c2a",
      title: "Results",
      description: "View Results of your subject",
      buttonText: "View Results",
      link: "/faculty_result",
    },
    {
      image:
        "https://img.freepik.com/free-vector/college-entrance-exam-concept-illustration_114360-13742.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1719100800&semt=sph",
      title: "Exams",
      description: "Schedule your Exam and add Question",
      buttonText: "Schedule Exams",
      link: "/faculty_exams",
    },
    {
      image:
        "https://img.freepik.com/free-vector/online-certification-with-smartphone_23-2148571385.jpg?t=st=1717146570~exp=1717150170~hmac=028407c7036005de45c351e19134fe539af38b2fc6aa025611145e89006511ec&w=740",
      title: "Notifications",
      description: "Check important notifications.",
      buttonText: "View Notifications",
      link: "/notifications",
    },
  ];

  return (
    <>
      <Dashboard title="Faculty Dashboard" cards={cards} />
      {/* <ToastContainer /> */}
    </>
  );
};

export default FacultyDashboard;
