import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button, Spinner, Card, CardBody, CardHeader } from "reactstrap";
import { useUser } from "../../context/UserContext";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";
import SubjectBarChart from "./SubjectBarChart";

const StudentResults = () => {
  const { userData } = useUser();
  const [examMarks, setExamMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [finalPercentage, setFinalPercentage] = useState(0);
  const [finalStatus, setFinalStatus] = useState("");
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchExamMarks = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/exam_marks/${userData._id}`
        );

        setExamMarks(response.data.examMarks);
        setFinalPercentage(response.data.finalPercentage);
        setFinalStatus(response.data.finalStatus);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exam marks:", error);
        setLoading(false);
        // Handle error fetching data
      }
    };

    fetchExamMarks();
  }, [userData._id]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    let position = 0;

    doc.setFontSize(18);
    doc.text(`Student Results - ${userData.fullName}`, 14, 15);
    position += 20;

    Object.keys(groupedMarks).forEach((courseName) => {
      doc.setFontSize(14);
      doc.text(courseName, 14, position + 5);
      position += 5;

      const tableData = groupedMarks[courseName].map((mark) => [
        `${new Date(mark.timestamp).toLocaleDateString()} at ${new Date(
          mark.timestamp
        ).toLocaleTimeString()}`,
        `${mark.marks} out of ${Object.keys(mark.answers).length}`,
        `${mark.percentage}%`,
        `${mark.passFailStatus}`, // Display pass/fail status
        `${mark.grade}`, // Display grade
      ]);

      doc.autoTable({
        startY: position + 5,
        head: [
          ["Submitted On", "Marks", "Percentage", "Status", "Grade"], // Add Status and Grade columns
        ],
        body: tableData,
      });

      position = doc.autoTable.previous.finalY + 10;
    });

    // Add final percentage and status to the PDF
    doc.setFontSize(14);
    doc.text(
      `Final Percentage: ${finalPercentage.toFixed(2)}%`,
      14,
      position + 10
    );
    doc.text(`Final Status: ${finalStatus}`, 14, position + 20);

    doc.save(`student_results_${userData.fullName}.pdf`);
  };

  const groupedMarks = examMarks.reduce((acc, mark) => {
    if (!acc[mark.courseName]) {
      acc[mark.courseName] = [];
    }
    acc[mark.courseName].push(mark);
    return acc;
  }, {});

  return (
    <div className="container text-center margin-top-bottom">
      <div className="col-md-8 offset-md-2 min-vh-100" ref={contentRef}>
        <h2 className="m-5 display-6">Student Results</h2>

        <p className="fs-5 mb-5">
          Hello, {userData.fullName}. Your Results are as follows:
        </p>

        {loading ? (
          <div className="text-center margin-top-bottom">
            <Spinner
              color="primary"
              style={{
                height: "3rem",
                width: "3rem",
              }}
            >
              Loading...
            </Spinner>
          </div>
        ) : Object.keys(groupedMarks).length === 0 ? (
          <p className="fs-5 mt-5 animated-text">No exam marks found.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-1 g-3 mt-2">
            {Object.keys(groupedMarks).map((courseName) => (
              <div key={courseName} className="col">
                {groupedMarks[courseName].map((mark) => (
                  <Link
                    key={mark._id}
                    to={`/exam/${encodeURIComponent(courseName)}`}
                    className="text-decoration-none"
                  >
                    <Card className="mb-4">
                      <CardHeader>
                        <h4>{courseName}</h4>
                      </CardHeader>
                      <CardBody>
                        <p className="card-text">
                          Submitted on{" "}
                          {new Date(mark.timestamp).toLocaleDateString()} at{" "}
                          {new Date(mark.timestamp).toLocaleTimeString()}
                        </p>
                        <p className="card-text">
                          <strong>Marks:</strong> {mark.marks} out of{" "}
                          {Object.keys(mark.answers).length}
                        </p>
                        <p className="card-text">
                          <strong>Percentage:</strong> {mark.percentage}%
                        </p>
                        <p className="card-text">
                          <strong>Status:</strong> {mark.passFailStatus}
                        </p>
                        <p className="card-text">
                          <strong>Grade:</strong> {mark.grade}
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}

        {Object.keys(groupedMarks).length !== 0 && (
          <>
            <div className="mt-5">
              <h4 className="text-center">Overall Results</h4>
              <p className="text-center">
                Final Percentage: {finalPercentage.toFixed(2)}%
              </p>
              <p className="text-center">Final Status: {finalStatus}</p>
            </div>

            <div className="text-center mt-3 mb-5">
              <Button color="primary" onClick={handleDownloadPDF}>
                Download Results as PDF
              </Button>
            </div>
          </>
        )}

        <SubjectBarChart />
      </div>
    </div>
  );
};

export default StudentResults;
