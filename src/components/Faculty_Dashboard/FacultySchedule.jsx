import React, { useEffect, useState } from "react";
import { Button, Spinner } from "reactstrap";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { API_URL } from "../../constants";

const FacultySchedule = () => {
  const { userData } = useUser();

  const [schedules, setschedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/student_schedule`);
        const filteredschedules = response.data.filter(
          (schedule) => schedule.teacher === userData.fullName
        );
        setschedules(filteredschedules);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [userData.fullName]); // Add userData.fullName to the dependency array

  return (
    <div
      className="container col-lg-7 margin-top-bottom min-vh-100"
      style={{ marginTop: "20vh" }}
    >
      <h2 className="text-center mb-4">Faculty Schedules</h2>
      <h3 className="my-4 fs-5">Hello {userData.fullName}, Your schedules</h3>
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
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Time</th>
              <th>Course</th>
              <th>Faculty</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule._id}>
                <td>{schedule.time}</td>
                <td>{schedule.subject}</td>
                <td>{schedule.teacher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FacultySchedule;
