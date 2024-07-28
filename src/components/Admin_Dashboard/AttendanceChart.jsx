import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import { API_URL } from "../../constants";

const AttendanceChart = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get(`${API_URL}/api/attendance/percentage`)
      .then((response) => {
        setAttendanceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  }, []);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF6666",
  ]; // Define your colors here

  // Prepare data for Google Charts
  const chartData = attendanceData.map((course, index) => {
    return [
      course.name,
      parseFloat(course.attendancePercentage),
      COLORS[index % COLORS.length], // Assign color based on index
    ];
  });

  // Define columns for Google Charts
  const chartColumns = [
    { type: "string", label: "Course" },
    { type: "number", label: "Attendance Percentage" },
    { type: "string", role: "style" }, // Role "style" for custom colors
  ];

  return (
    <div className="container">
      <h4 className="my-4 text-center">Average Attendance</h4>
      <div>
        <Chart
          width={"100%"}
          height={"500px"}
          chartType="ColumnChart"
          loader={<div>Loading Chart...</div>}
          data={[chartColumns, ...chartData]}
          options={{
            title: "Attendance Percentage by Course",
            chartArea: { width: "70%", height: "70%" },
            hAxis: {
              title: "Courses",
              titleTextStyle: { bold: true },
            },
            vAxis: {
              title: "Attendance Average Percentage",
              minValue: 0,
              format: "0.00",
            },
            legend: {
              position: "none",
            },
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    </div>
  );
};

export default AttendanceChart;
