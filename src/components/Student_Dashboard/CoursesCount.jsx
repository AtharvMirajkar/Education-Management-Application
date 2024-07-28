import React, { useState, useEffect } from "react";
import CountUp from "react-countup"; // CountUp component
import { API_URL } from "../../constants";

const CoursesCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Simulate fetching data from backend API
    const fetchCourseCount = async () => {
      try {
        // Replace with actual API endpoint
        const response = await fetch(`${API_URL}/api/courses/count`);
        if (!response.ok) {
          throw new Error("Failed to fetch student count");
        }
        const data = await response.json();
        setCount(data);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };

    fetchCourseCount();
  }, []);

  return (
    <div className="text-center">
      <div className="d-flex gap-3 justify-content-around align-items-center">
        <div className="w-50">
          <img
            src="https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?w=740&t=st=1720502232~exp=1720502832~hmac=ffc3480f3c71ce383d26b9bc1ef26c23f45893c0400671cf160920317cf6e962"
            alt="Graduated-student-photo"
            // className="img-fluid"
            width="120px"
          />
        </div>
        <div className="w-50">
          <h4 className="card-title">Number of courses</h4>
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

export default CoursesCount;
