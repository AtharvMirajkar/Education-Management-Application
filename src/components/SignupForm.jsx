import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";

const SignupSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    agreedToTerms: false,
  });
  const [submittedName, setSubmittedName] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newValue = value;

    // Trim whitespace from username
    if (name === "name") {
      newValue = value.trim();
    }

    // Clear password error when user starts typing again
    if (name === "password" && errors.password) {
      setErrors({ ...errors, password: "" });
    }

    // Validate password format
    if (name === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(value)) {
        setErrors({
          ...errors,
          [name]:
            "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long",
        });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Check if any field is empty
    if (!formData.name) newErrors.name = "Please enter your name";
    if (!formData.email) newErrors.email = "Please enter your email";
    if (!formData.password) newErrors.password = "Please enter your password";
    if (!formData.repeatPassword)
      newErrors.repeatPassword = "Please repeat your password";

    // Check if passwords match
    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
    }

    // Update the errors state
    setErrors(newErrors);

    // Display error messages and prevent form submission if there are errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      // Make a POST request to your JSON server endpoint using Axios
      const response = await axios.post(`${API_URL}/api/signupData`, formData);

      // Display message with submitted name
      setSubmittedName(formData.name);
      setShowMessage(true);

      // Log all form details to the console
      console.log("Form Data:", formData);

      // Clear form inputs
      setFormData({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
        agreedToTerms: false,
      });

      // Wait for 2 seconds before navigating to the sign-in page
      setTimeout(() => {
        // Display an alert before redirection
        alert("Redirecting to sign-in page...");
        // Redirect to sign-in page
        navigate("/signin");
      }, 2000);
    } catch (error) {
      console.error("Error submitting data:", error);
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
              <div className="card-body p-md-5 ">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-6 p-4 order-1 order-lg-1">
                    <p className="h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4 border-bottom">
                        <i className="fas fa-user fa-sm me-3 fa-fw"></i>
                        <div className="flex-fill mb-0">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`form-control border-0 ${
                              errors.name ? "is-invalid" : ""
                            }`}
                            placeholder="Your username"
                            required
                          />
                          {errors.name && (
                            <div className="invalid-feedback">
                              {errors.name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4  border-bottom">
                        <i className="fas fa-envelope fa-sm me-3 fa-fw"></i>
                        <div className="flex-fill mb-0">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-control border-0 ${
                              errors.email ? "is-invalid" : ""
                            }`}
                            placeholder="Your email"
                            required
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4  border-bottom">
                        <i className="fas fa-lock fa-sm me-3 fa-fw"></i>
                        <div className="flex-fill mb-0">
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`form-control border-0 ${
                              errors.password ? "is-invalid" : ""
                            }`}
                            placeholder="Your password"
                            required
                          />
                          {errors.password && (
                            <div className="invalid-feedback">
                              {errors.password}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4 border-bottom">
                        <i className="fas fa-key fa-sm me-3 fa-fw"></i>
                        <div className="flex-fill mb-0">
                          <input
                            type="password"
                            name="repeatPassword"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                            className={`form-control border-0 ${
                              errors.repeatPassword ? "is-invalid" : ""
                            }`}
                            placeholder="Repeat your password"
                            required
                          />
                          {errors.repeatPassword && (
                            <div className="invalid-feedback">
                              {errors.repeatPassword}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          name="agreedToTerms"
                          checked={formData.agreedToTerms}
                          onChange={handleChange}
                          id="form2Example3c"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          I agree all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>
                      <div className="d-flex mb-3 mb-lg-4">
                        <button type="submit" className="btn my-btn btn-lg">
                          Register
                        </button>
                      </div>
                    </form>
                    {showMessage && (
                      <p>
                        Thanks, {submittedName} we have received your details.
                      </p>
                    )}
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-6 d-flex flex-column align-items-center justify-content-center order-2 order-lg-2">
                    <img
                      src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"
                      className="img-fluid"
                      alt="Sample image"
                    />
                    <Link to="/signin" className="text-center mt-4">
                      I am already a member
                    </Link>
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

export default SignupSection;
