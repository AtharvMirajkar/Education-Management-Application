import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";

const ResultBarCharts = ({ course }) => {
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/exam_marks/course/${course}`
        );
        const {
          totalStudents,
          passedStudents,
          failedStudents,
          notAttendedStudents,
        } = response.data;

        // Prepare data for bar chart
        const barData = [
          ["Result", "Number of Students", { role: "style" }],
          ["Total Students", totalStudents, "#3366CC"], // Blue
          ["Passed Students", passedStudents, "#109618"], // Green
          ["Failed Students", failedStudents, "#DC3912"], // Red
          ["Not Attended", notAttendedStudents, "#FF9900"], // Orange
        ];

        // Prepare data for pie chart
        const pieData = [
          ["Result", "Number of Students"],
          ["Passed Students", passedStudents],
          ["Failed Students", failedStudents],
          ["Not Attended", notAttendedStudents],
        ];

        setBarChartData(barData);
        setPieChartData(pieData);
      } catch (error) {
        console.error("Error fetching exam results:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4 card shadow p-4 col-md-12">
      <Link to="/faculty_result" style={{ textDecoration: "none" }}>
        <h2 className="text-center mb-4">{course} Exam Results</h2>
      </Link>

      <div className="row justify-content-center">
        <div className="col-md-6">
          {barChartData ? (
            <Chart
              width={"100%"}
              height={"400px"}
              chartType="BarChart"
              loader={<div>Loading Chart...</div>}
              data={barChartData}
              options={{
                title: "Exam Results (Bar Chart)",
                chartArea: { width: "50%" },
                hAxis: {
                  title: "Number of Students",
                  minValue: 0,
                },
                vAxis: {
                  title: "Result",
                },
              }}
            />
          ) : (
            <div>Loading bar chart data...</div>
          )}
        </div>
        <div className="col-md-6">
          {pieChartData ? (
            <>
              <Chart
                width={"100%"}
                height={"400px"}
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={pieChartData}
                options={{
                  title: "Exam Results (Pie Chart)",
                  pieSliceText: "label",
                  is3D: true,
                }}
              />
            </>
          ) : (
            <div>Loading pie chart data...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultBarCharts;
