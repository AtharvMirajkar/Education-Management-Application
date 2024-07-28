import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faEdit } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../constants";

const StudentProfile = () => {
  const { userData, updateUser } = useUser();
  const [editing, setEditing] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({
    fullName: userData.fullName,
    email: userData.email,
    gender: userData.gender,
  });

  const capitalizedRole =
    userData.role.charAt(0).toUpperCase() + userData.role.slice(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({
      ...updatedUserData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}/api/usersData/${userData._id}`,
        { ...userData, ...updatedUserData } // Merge updated fields with existing user data
      );
      console.log("User data updated:", response.data);
      // Update user data in the context
      updateUser(response.data);
      setEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div
      className="container min-vh-100 d-flex flex-column"
      style={{ marginTop: "180px" }}
    >
      <h2 className="text-center mb-4 display-6">{capitalizedRole} Profile</h2>
      {userData && (
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8 col-sm-12 m-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-row flex-wrap flex-sm-coloumn justify-content-evenly align-items-center">
                  {/* Profile Image */}
                  <div className="mb-3">
                    {userData.gender === "female" ? (
                      <img
                        src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=826&t=st=1717741900~exp=1717742500~hmac=0f0e81f21efdb176895d74daf6bff3101c651c4c70821ce5f7838879a1b0ea9c"
                        alt="Female"
                        width="110px"
                        height="110px"
                        className="rounded-circle"
                      />
                    ) : (
                      <img
                        src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=826&t=st=1717742008~exp=1717742608~hmac=460838e47f5d75742de978bdbd876f44ad4d5e38f5ee76de5f8593509b9bcb00"
                        alt="Mail"
                        width="120px"
                        height="120px"
                        className="rounded-circle"
                      />
                    )}
                  </div>

                  {/* Name */}
                  <div className="text-center">
                    <h3 className="card-title text-uppercase text-decoration-underline m-3">
                      {userData.fullName}
                    </h3>
                    <p className="card-text h5 m-3">{capitalizedRole}</p>
                  </div>

                  {/* Edit Button */}
                  <div className="mt-4">
                    {editing ? (
                      <p onClick={handleSubmit} className="text-end">
                        <FontAwesomeIcon
                          className="fa-lg text-success"
                          icon={faSave}
                        />{" "}
                        Save
                      </p>
                    ) : (
                      <p
                        onClick={() => setEditing(true)}
                        className="text-start text-secondary"
                      >
                        Edit <FontAwesomeIcon className="fa-lg" icon={faEdit} />
                      </p>
                    )}
                  </div>
                </div>

                <ul className="list-group list-group-flush mt-2">
                  <li className="list-group-item">
                    <strong>Full Name:</strong>{" "}
                    {editing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={updatedUserData.fullName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      userData.fullName
                    )}
                  </li>
                  <li className="list-group-item">
                    <strong>Username:</strong> {userData.username}
                  </li>
                  <li className="list-group-item">
                    <strong>Email:</strong>{" "}
                    {editing ? (
                      <input
                        type="email"
                        name="email"
                        value={updatedUserData.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      userData.email
                    )}
                  </li>
                  <li className="list-group-item">
                    <strong>Gender:</strong>{" "}
                    {editing ? (
                      <select
                        name="gender"
                        value={updatedUserData.gender}
                        onChange={handleInputChange}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    ) : (
                      userData.gender
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
