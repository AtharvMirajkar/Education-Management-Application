import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup"; // CountUp component
import { API_URL } from "../../constants";

const FacultySubject = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/usersData/faculty/count`
        );

        setCount(response.data.count);
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
            src="https://img.freepik.com/premium-vector/elearning-digital-design_24877-45735.jpg?w=826"
            alt="Graduated-student-photo"
            // className="img-fluid"
            width="120px"
          />
        </div>
        <div className="w-50">
          <h4 className="card-title">Number of faculties</h4>
          {/* CountUp component */}
          <CountUp
            end={count}
            duration={2}
            separator=","
            className="display-5"
          />
        </div>
      </div>
    </div>
  );
};

export default FacultySubject;
