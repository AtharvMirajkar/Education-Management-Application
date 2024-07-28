import React, { useState, useEffect } from "react";
import { Button, Spinner } from "reactstrap";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { API_URL } from "../../constants";

const StudentAttendanceRecord = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState("");
  const { userData } = useUser();

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        console.log("Fetching attendance data...");
        const response = await axios.get(
          `${API_URL}/api/attendance/${userData._id}`
        );
        console.log("Response:", response.data);
        const data = response.data;

        // Set attendance data in state
        setAttendanceData(data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const handleSearch = (event) => {
    setSearchDate(event.target.value);
  };

  if (loading) {
    return (
      <div className="container margin-top-bottom text-center min-vh-100">
        <h2 className="text-center">Attendance Record</h2>
        <Spinner
          color="primary"
          style={{
            height: "3rem",
            width: "3rem",
            marginTop: "80px",
          }}
        >
          Loading...
        </Spinner>
      </div>
    );
  }

  // Group attendance records by date
  const groupedAttendance = {};
  attendanceData.forEach((record) => {
    const date = record.date;
    if (!groupedAttendance[date]) {
      groupedAttendance[date] = [];
    }
    groupedAttendance[date].push(record);
  });

  // Filtered attendance records based on searchDate
  const filteredAttendance = Object.keys(groupedAttendance)
    .sort((a, b) => new Date(b) - new Date(a)) // Sort dates in descending order
    .filter((date) => !searchDate || date === searchDate);

  return (
    <div className="container margin-top-bottom col-lg-8">
      <h2 className="text-center">Attendance Record</h2>
      <p className="fs-4 my-4 text-center">
        Hello {userData.fullName}, Your ID of student is{" "}
        {userData._id.substring(userData._id.length - 8)}
      </p>

      {/* Search input field */}
      <div className="my-4">
        <label htmlFor="searchDate" className="form-label">
          Search Attendance by Date:
        </label>
        <input
          type="date"
          id="searchDate"
          className="form-control"
          value={searchDate}
          onChange={handleSearch}
        />
      </div>

      {/* Display attendance records or no records found message */}
      {filteredAttendance.length > 0 ? (
        filteredAttendance.map((date) => (
          <div key={date}>
            <h2 className="fs-5 my-3">Date: {date}</h2>
            <div className="table-responsive">
              <table className="table table-striped table-bordered mb-4">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Date</th>
                    <th>Attendance</th>
                    <th>Time</th>
                    <th>Subject</th>
                    <th>Faculty</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedAttendance[date].map((record) =>
                    record.students.map((student) => (
                      <tr key={`${record.id}-${student.id}`}>
                        <td>{student.id.substring(student.id.length - 8)}</td>
                        <td>{record.date}</td>
                        <td>{student.attendance}</td>
                        {/* Display time and subject */}
                        <td>{record.schedules[0].time}</td>
                        <td>{record.schedules[0].subject}</td>
                        <td>{record.schedules[0].teacher}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          No records found for the selected date.
        </div>
      )}
    </div>
  );
};

export default StudentAttendanceRecord;
