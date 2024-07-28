import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import { useUser } from "../../context/UserContext";
import { API_URL } from "../../constants";
import ResultBarCharts from "./ResultBarChart";

const FacultyResults = () => {
  const { userData } = useUser();
  const [examMarks, setExamMarks] = useState([]);
  const [studentNames, setStudentNames] = useState({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchExamMarks = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/exam_marks`);
        setExamMarks(response.data);

        const uniqueStudentIds = [
          ...new Set(response.data.map((mark) => mark.studentId)),
        ];

        const namesPromises = uniqueStudentIds.map(async (id) => {
          try {
            const nameResponse = await axios.get(
              `${API_URL}/api/usersData/${id}/name`
            );
            return { [id]: nameResponse.data.name };
          } catch (error) {
            console.error(`Error fetching name for student ID ${id}:`, error);
            return { [id]: "Unknown" };
          }
        });

        const namesResults = await Promise.all(namesPromises);
        const namesObject = namesResults.reduce(
          (acc, result) => ({ ...acc, ...result }),
          {}
        );
        setStudentNames(namesObject);
      } catch (error) {
        console.error("Error fetching exam marks:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/courses`);
        const filteredCourses = response.data.filter(
          (course) => course.faculty === userData.fullName
        );
        setCourses(filteredCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchExamMarks();
    fetchCourses();
  }, [userData.fullName]);

  // Group exam marks by studentId
  const groupedMarks = examMarks.reduce((acc, mark) => {
    if (!acc[mark.studentId]) {
      acc[mark.studentId] = [];
    }
    acc[mark.studentId].push(mark);
    return acc;
  }, {});

  return (
    <div
      className="container text-center min-vh-100"
      style={{ marginTop: "15vh" }}
    >
      <h2 className="mb-5 display-6">Students Results</h2>

      {courses.map((course) => {
        // Check if there are marks for this course
        const courseMarksExist = Object.values(groupedMarks).some((marks) =>
          marks.some((mark) => mark.courseName === course.name)
        );

        return (
          <div key={course._id} className="mb-4">
            <h3 className="mb-4">{course.name}</h3>

            {courseMarksExist ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Course</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Marks</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(groupedMarks).map((studentId) => {
                    const studentMarks = groupedMarks[studentId].filter(
                      (mark) => mark.courseName === course.name
                    );
                    if (studentMarks.length === 0) return null;

                    return studentMarks.map((mark, index) => (
                      <tr key={`${studentId}-${index}`}>
                        {index === 0 && (
                          <>
                            <td rowSpan={studentMarks.length}>
                              {studentId.substring(studentId.length - 8)}
                            </td>
                            <td rowSpan={studentMarks.length}>
                              {studentNames[studentId] || "Loading..."}
                            </td>
                          </>
                        )}
                        <td>{mark.courseName}</td>
                        <td>{new Date(mark.timestamp).toLocaleDateString()}</td>
                        <td>{new Date(mark.timestamp).toLocaleTimeString()}</td>
                        <td>
                          {mark.marks} out of {Object.keys(mark.answers).length}
                        </td>
                        <td>{mark.percentage}%</td>
                      </tr>
                    ));
                  })}
                </tbody>
              </Table>
            ) : (
              <p className="fs-5 mt-5 animated-text">
                Result not found for {course.name}.
              </p>
            )}
          </div>
        );
      })}
      <div className="row mb-5">
        {courses.map((course) => (
          <div key={course._id}>
            <ResultBarCharts course={course.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyResults;
