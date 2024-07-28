import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { API_URL } from "../constants";

const SigninSection = ({ login }) => {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
    role: "student", // Default role is set to student
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.username) newErrors.username = "Please enter your username";
    if (!formData.password) newErrors.password = "Please enter your password";

    setErrors(newErrors); // Update errors state with newErrors

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          `${API_URL}/api/usersData/login`,
          formData
        );
        const { user, token } = response.data; // Backend sends user details upon successful login

        // Save token and user details in local storage
        localStorage.setItem("token", token);

        if (user) {
          const role = user.role;
          console.log("Successfully logged in as:", user.username);
          console.log("Your role is " + role);

          updateUser(user); // Update user data in context
          login(role); // Call the login function with the role
          navigate("/home"); // Navigate to the home page
        }
      } catch (error) {
        console.error(
          "Error logging in:",
          error.response?.data?.message || error.message
        );

        // Handle specific errors from backend
        if (error.response) {
          if (error.response.status === 401) {
            setErrors({ invalidCredentials: error.response.data.message });
          } else {
            setErrors({
              serverError: "Failed to log in. Please try again later.",
            });
          }
        } else {
          setErrors({
            serverError: "Network error. Please check your connection.",
          });
        }
      }
    }
  };

  return (
    <section className="vh-100 my-4 my-md-auto">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-10 col-xl-9">
            <div
              className="card text-black border-remove"
              style={{ borderRadius: "25px" }}
            >
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-6 d-flex flex-column align-items-center justify-content-center order-2 order-lg-1">
                    <img
                      src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                  <div className="col-md-10  col-lg-6 col-xl-6 order-1 order-lg-2">
                    <h1 className="fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</h1>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      {/* Role selection */}
                      <div className="d-flex gap-4">
                        <div className="form-check mb-4">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="student"
                            name="role"
                            value="student"
                            checked={formData.role === "student"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="student">
                            Student
                          </label>
                        </div>
                        <div className="form-check mb-4">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="faculty"
                            name="role"
                            value="faculty"
                            checked={formData.role === "faculty"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="faculty">
                            Faculty
                          </label>
                        </div>
                        <div className="form-check mb-4">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="admin"
                            name="role"
                            value="admin"
                            checked={formData.role === "admin"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="admin">
                            Admin
                          </label>
                        </div>
                      </div>
                      {/* Username field */}
                      <div className="d-flex flex-row align-items-center mb-4 border-bottom">
                        <i className="fas fa-user fa-sm me-3 fa-fw"></i>
                        <div className="flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className={`form-control border-0 ${
                              errors.username ? "is-invalid" : ""
                            }`}
                            placeholder="Your username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                          />
                          {errors.username && (
                            <div className="invalid-feedback">
                              {errors.username}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Password field */}
                      <div className="d-flex flex-row align-items-center mb-4  border-bottom">
                        <i className="fas fa-lock fa-sm me-3 fa-fw"></i>
                        <div className="flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className={`form-control border-0 ${
                              errors.password ? "is-invalid" : ""
                            }`}
                            placeholder="Your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                          {errors.password && (
                            <div className="invalid-feedback">
                              {errors.password}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Display error messages */}
                      {errors.invalidCredentials && (
                        <div className="alert alert-danger" role="alert">
                          {errors.invalidCredentials}
                        </div>
                      )}
                      {errors.serverError && (
                        <div className="alert alert-danger" role="alert">
                          {errors.serverError}
                        </div>
                      )}

                      {/* Remember me checkbox */}
                      <div className="form-check mb-4">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          id="form2Example3c"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          Remember me
                        </label>
                      </div>
                      {/* Submit button */}
                      <div className="d-flex mt-4 mb-3 mb-lg-4">
                        <button type="submit" className="my-btn btn btn-lg">
                          Log in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SigninSection;
