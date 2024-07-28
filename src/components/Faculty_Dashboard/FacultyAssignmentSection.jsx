import React from "react";
import Dashboard from "../Dashboard";

const FacultyAssignmentSection = () => {
  const cards = [
    {
      image:
        "https://img.freepik.com/free-vector/check-list-with-businessman-flat-design_79603-145.jpg?w=740&t=st=1720166386~exp=1720166986~hmac=94502aef2d100d15ad473a43f856861c892118d99e76e287cb24e3424b2086d0",
      title: "Add/ Edit Assignments",
      description: "Add or edit assignments for your subject",
      buttonText: "Add Assignments",
      link: "/view_assignments",
    },
    {
      image:
        "https://img.freepik.com/free-vector/online-document-concept-illustration_114360-5563.jpg?t=st=1720166427~exp=1720170027~hmac=ecc7a6098b0a2d3974c447c247a936d308c376b066af38bc51bbfe1994e525ff&w=740",
      title: "Submissions",
      description: "View Students submission of your courses",
      buttonText: "View submissions",
      link: "/check_assignments",
    },
  ];

  return (
    <>
      <Dashboard title="Assignments" cards={cards} />
    </>
  );
};

export default FacultyAssignmentSection;
