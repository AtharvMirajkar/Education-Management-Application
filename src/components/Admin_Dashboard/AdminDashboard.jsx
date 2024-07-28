import React from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard";

const AdminDashboard = () => {
  const cards = [
    {
      image:
        "https://img.freepik.com/free-vector/competent-resume-writing-professional-cv-constructor-online-job-application-profile-creation-african-american-woman-filling-up-digital-form-concept-illustration_335657-2053.jpg?t=st=1717146650~exp=1717150250~hmac=418967f7967eb53f9a283fa2fa379a43dc6813d523ebc759a5b9f48840537b0d&w=740",
      title: "My Profile",
      description: "View and update your profile information.",
      buttonText: "Go to Profile",
      link: "/admin_profile",
    },
    {
      image:
        "https://img.freepik.com/free-vector/hand-drawn-remote-recruitment-illustration_52683-143681.jpg?w=740&t=st=1717476289~exp=1717476889~hmac=c6efa2376f510650b0c37c4f66b14d827fd5c48ca81d5da4e3e82886e4affb63",
      title: "Manage Users",
      description: "View user accounts.",
      buttonText: "Manage Users",
      link: "/admin/user_list",
    },
    {
      image:
        "https://img.freepik.com/free-vector/people-calendar-time-management-concept_23-2148822826.jpg?w=740&t=st=1717557700~exp=1717558300~hmac=2829b3f800eb79353bcc60044b5d97cbeff1956ec50bc40bb906edd41334c2d0",
      title: "Manage Schedule",
      description: "Manage the schedules",
      buttonText: "Manage Schedules",
      link: "/admin/student_schedule",
    },
    // {
    //   image:
    //     "https://img.freepik.com/free-vector/tiny-students-office-person-process-making-plan-reach-aims-time_74855-20401.jpg?t=st=1717557884~exp=1717561484~hmac=eb5699bc69a19d23b88aaa760503da1ac700aab6ec2d8133e56b49568d1953e9&w=740",
    //   title: "Manage Faculties Schedule",
    //   description: "Manage the faculties schedules",
    //   buttonText: "Manage Schedules",
    //   link: "/admin/faculty_schedule",
    // },
    {
      image:
        "https://img.freepik.com/free-vector/online-certification-with-smartphone_23-2148571385.jpg?t=st=1717146570~exp=1717150170~hmac=028407c7036005de45c351e19134fe539af38b2fc6aa025611145e89006511ec&w=740",
      title: "Manage Notifications",
      description: "Manage Notification for faculties and students",
      buttonText: "Manage Schedules",
      link: "/admin/notifications",
    },
    {
      image:
        "https://img.freepik.com/free-photo/front-view-stacked-books-graduation-cap-open-book-education-day_23-2149241017.jpg?w=740&t=st=1717146244~exp=1717146844~hmac=41e2fcdef80c2cffdfa50e20fee9dc3ea2e859b2384b0f3e5d0b7a10b03ae6ad",
      title: "Manage Courses",
      description: "View and manage courses.",
      buttonText: "Manage Courses",
      link: "/admin/manage_courses",
    },
    {
      image:
        "https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?w=740&t=st=1718080795~exp=1718081395~hmac=9af5375f574cc528b7a65a73d52346e72422701596154c7b569a90935faf4724",
      title: "Contact Details",
      description: "People who are trying to contact us",
      buttonText: "View Details",
      link: "/admin/contact_list",
    },
    // Add more cards for other functionalities as needed
  ];

  return (
    <>
      <Dashboard title="Admin Dashboard" cards={cards} />
    </>
  );
};

export default AdminDashboard;
