import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { Chart } from "react-google-charts";
import { API_URL } from "../../constants";

const AttendanceData = ({ attendanceSubmitted }) => {
  const { userData } = useUser();
  const [attendanceData, setAttendanceData] = useState([]);
  const teacherName = userData.fullName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/attendance/teacher/${teacherName}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAttendanceData(data); // Assuming data from API is an array of attendance records with date and attendancePercentage fields
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        // Handle error state if needed
      }
    };

    fetchData();
  }, [attendanceSubmitted]); // Fetch data whenever attendanceSubmitted changes

  // Prepare data for chart (show only last 5 records)
  const last5AttendanceData = attendanceData.slice(-5); // Get last 5 records

  // Format data for Google Charts
  const dataForChart = [
    ["Date", "Attendance Percentage"], // Header row
    ...last5AttendanceData.map((record) => [
      new Date(record.date),
      parseFloat(record.attendancePercentage),
    ]),
  ];

  return (
    <div className="mt-2 text-center container">
      <h4>Attendance Data</h4>
      <div style={{ width: "100%", minHeight: 400 }}>
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={dataForChart}
          options={{
            hAxis: {
              title: "Date",
              format: "MMM yyyy", // Optional formatting of date axis
            },
            vAxis: {
              title: "Attendance Percentage",
              minValue: 0,
              maxValue: 100,
            },
            chartArea: { width: "80%", height: "70%" },
            legend: { position: "bottom" },
            // curveType: "function",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    </div>
  );
};

export default AttendanceData;
