import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { Spinner } from "reactstrap";
import { API_URL } from "../../constants";
import { Chart } from "react-google-charts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF6666",
]; // Define your colors here

const SubjectBarChart = () => {
  const [examMarks, setExamMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [finalPercentage, setFinalPercentage] = useState(0);
  const [finalStatus, setFinalStatus] = useState("");

  const { userData } = useUser();

  useEffect(() => {
    const fetchExamMarks = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/exam_marks/${userData._id}`
        );
        console.log("API Response:", response.data);

        // Assuming API response structure has changed, adjust accordingly
        if (response.data && response.data.examMarks) {
          setExamMarks(response.data.examMarks);
          setFinalPercentage(response.data.finalPercentage);
          setFinalStatus(response.data.finalStatus);
          setLoading(false);
        } else {
          console.error("Invalid API response structure:", response.data);
          // Handle unexpected API response structure
          // For example, set loading to false here if needed
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching exam marks:", error);
        setLoading(false);
        // Handle error fetching data
      }
    };

    fetchExamMarks();
  }, [userData._id]);

  if (loading) {
    return (
      <div className="d-flex align-item-center justify-content-center">
        <Spinner
          color="primary"
          style={{
            height: "3rem",
            width: "3rem",
            margin: "auto",
            marginTop: "20px",
          }}
        >
          Loading...
        </Spinner>
      </div>
    );
  }

  if (!Array.isArray(examMarks) || examMarks.length === 0) {
    return (
      <div className="container card shadow py-3" style={{ height: "180px" }}>
        <h3 className="text-center">Exam Marks</h3>
        <p className="text-center mt-5">No valid exam marks found.</p>
      </div>
    );
  }

  // Prepare data in the format expected by react-google-charts
  const chartData = examMarks.map((mark, index) => {
    return [
      mark.courseName,
      mark.percentage,
      COLORS[index % COLORS.length], // Assign color based on index
    ];
  });

  return (
    <div className="container card shadow py-3">
      <h3 className="text-center">Exam Marks</h3>
      <div className="d-flex justify-content-center">
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[["Course", "Percentage", { role: "style" }], ...chartData]}
          options={{
            title: "Exam Marks",
            chartArea: { width: "50%" },
            hAxis: {
              title: "Percentage",
            },
            vAxis: {
              title: "Courses",
              minValue: 0,
              maxValue: 100,
            },
            legend: { position: "none" },
          }}
        />
      </div>
      <div className="text-center mt-3 d-flex justify-content-evenly">
        <p>Overall Percentage: {finalPercentage.toFixed(2)}%</p>
        <p>Final Status: {finalStatus}</p>
      </div>
    </div>
  );
};

export default SubjectBarChart;
