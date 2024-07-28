import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { API_URL } from "../../constants";

const CourseDetailsChart = () => {
  const [coursesDetails, setCoursesDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/exam_marks/all_exam_status`
        );
        setCoursesDetails(response.data.coursesDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Prepare data for Google Charts
  const chartData = [["Course", "Passed", "Failed", "Not Attended"]];
  coursesDetails.forEach((course) => {
    chartData.push([
      course.courseName,
      course.passedStudents,
      course.failedStudents,
      course.notAttendedStudents,
    ]);
  });

  return (
    <Container>
      <h4 className="my-4 text-center">Courses Exam Status</h4>
      <Chart
        width={"100%"}
        height={"500px"}
        chartType="ColumnChart"
        loader={<div>Loading Chart...</div>}
        data={chartData}
        options={{
          title: "Students Status Comparison",
          chartArea: { width: "70%", height: "70%" },
          isStacked: true,
          hAxis: {
            title: "Courses",
            minValue: 0,
            titleTextStyle: { bold: true },
          },
          vAxis: {
            title: "Number of Students",
          },
          legend: {
            position: "top",
          },
        }}
      />
    </Container>
  );
};

export default CourseDetailsChart;
