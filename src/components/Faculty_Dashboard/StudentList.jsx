import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Modal, Button } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";
import AtendanceData from "./AtendanceData";

const FacultyAttendance = () => {
  const { userData } = useUser();
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/student_schedule`);
        const filteredSchedules = response.data.filter(
          (schedule) => schedule.teacher === userData.fullName
        );
        setSchedules(filteredSchedules);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [userData.fullName]);

  useEffect(() => {
    const today = new Date().toISOString().substr(0, 10);
    setSelectedDate(today);

    axios
      .get(`${API_URL}/api/usersData`)
      .then((response) => {
        const studentUsers = response.data.filter(
          (user) => user.role === "student"
        );
        const studentsWithAttendance = studentUsers.map((student) => ({
          ...student,
          attendance: "present",
        }));
        setStudents(studentsWithAttendance);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  const handleAttendanceChange = (studentId, newStatus) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId ? { ...student, attendance: newStatus } : student
    );
    setStudents(updatedStudents);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmitAttendance = async (schedule) => {
    if (attendanceSubmitted) {
      toast.warn("Attendance already submitted for the selected date.");
      return;
    }

    const attendanceData = {
      date: selectedDate,
      schedules: [schedule], // Assuming schedule is passed as an argument
      students: students.map((student) => ({
        id: student.id,
        attendance: student.attendance,
      })),
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/attendance`,
        attendanceData
      );
      console.log("Attendance submitted successfully:", response.data);

      setAttendanceSubmitted(true);
      toast.success("Attendance submitted successfully");
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container margin-top-bottom col-md-6">
      <h2 className="mt-4 mb-4 text-center">Students Attendance List</h2>

      <>
        <div className="date-selector my-4">
          <label htmlFor="attendance-date">Select Attendance Date:</label>
          <input
            type="date"
            id="attendance-date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        {schedules.map((schedule, index) => (
          <div key={index} className="mb-4">
            <div className="d-flex flex-wrap justify-content-around border p-3">
              <p className="m-1 fw-bold">Time: {schedule.time}</p>
              <p className="m-1 fw-bold">Subject: {schedule.subject}</p>
              <p className="m-1 fw-bold">Teacher: {schedule.teacher}</p>
            </div>

            {loading ? (
              <div className="text-center margin-top-bottom">
                <Spinner
                  animation="border"
                  role="status"
                  style={{ height: "3rem", width: "3rem" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr className="text-center">
                      <th>PRN No.</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="text-center">
                        <td>{student.id.substring(student.id.length - 8)}</td>
                        <td>{student.fullName}</td>
                        <td>{student.gender}</td>
                        <td>
                          <select
                            value={student.attendance}
                            onChange={(e) =>
                              handleAttendanceChange(student.id, e.target.value)
                            }
                          >
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="text-center">
              <button
                className="btn my-btn m-4"
                onClick={() => handleSubmitAttendance(schedule)}
                disabled={loading}
              >
                Submit Attendance for {schedule.subject} - {schedule.time}
              </button>
            </div>
          </div>
        ))}
      </>

      <AtendanceData attendanceSubmitted={attendanceSubmitted} />
    </div>
  );
};

export default FacultyAttendance;
