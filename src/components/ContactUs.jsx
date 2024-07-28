import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/contacts`, formData);
      toast.success("Form submitted successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "An error occurred while submitting the form. Please try again later."
      );
    }
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100%",
        paddingBlock: "50px",
        paddingBottom: "75px",
      }}
    >
      <div className="container">
        <h1 className="text-center text-white p-5">Contact Us</h1>
        <div className="row">
          {/* Contact Information */}
          <div
            className="col-lg-4 mt-4 mt-lg-0 text-center"
            style={{
              //   backgroundColor: "rgba(255, 255, 255, 0.5)",
              paddingTop: "50px",
            }}
          >
            <div className="text-white">
              <ul className="list-unstyled d-flex flex-column gap-3 p-3">
                <p className="fw-bold h5">Address</p>
                <li className="mb-3">
                  <i className="bi bi-geo-alt-fill fa-xl me-3"></i>
                  123 Main Street, City, Country
                </li>
                <p className="fw-bold h5">Phone</p>
                <li className="mb-3">
                  <i className="bi bi-telephone-fill fa-xl me-3"></i>
                  +123 456 7890
                </li>
                <p className="fw-bold h5">Email</p>
                <li>
                  <i className="bi bi-envelope-fill fa-xl me-3"></i>
                  example@example.com
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="col-lg-8 mt-4"
            style={{
              paddingInline: "40px",
            }}
          >
            <div
              className="card"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
              }}
            >
              <div className="card-body p-4">
                <h2 className="card-title mb-4">Send Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
