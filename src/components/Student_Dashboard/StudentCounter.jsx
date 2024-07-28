import React, { useState, useEffect } from "react";
import CountUp from "react-countup"; // CountUp component
import { API_URL } from "../../constants";

const StudentCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Simulate fetching data from backend API
    const fetchStudentCount = async () => {
      try {
        // Replace with actual API endpoint
        const response = await fetch(`${API_URL}/api/usersData/students/count`);
        if (!response.ok) {
          throw new Error("Failed to fetch student count");
        }
        const data = await response.json();
        setCount(data.count); // Assuming the API returns { count: ... }
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };

    fetchStudentCount();
  }, []);

  return (
    <div className="text-center">
      <div className="d-flex gap-3 justify-content-around align-items-center">
        <div className="w-50">
          <img
            src="https://img.freepik.com/free-vector/academic-excellence-illustration_24877-52355.jpg?w=740&t=st=1720427026~exp=1720427626~hmac=92ed057d779de80f6a7b6ec9cbc2ae95320aaaa8d5a0b2c3a86b1bc4039e91bb"
            alt="Graduated-student-photo"
            // className="img-fluid"
            width="120px"
          />
        </div>
        <div className="w-50">
          <h4 className="card-title">Number of Students</h4>
          {/* CountUp component*/}
          <CountUp
            end={count}
            duration={2.5}
            separator=","
            className="display-5"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentCounter;
