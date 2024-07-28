import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { API_URL } from "../constants";

const SettingsPrivacyPage = () => {
  const { userData } = useUser();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      // Make a PUT request to update the password
      const response = await axios.put(
        `${API_URL}/api/usersData/${userData._id}/change-password`,
        {
          currentPassword: oldPassword,
          newPassword: newPassword,
        }
      );

      console.log("Password updated successfully:", response.data);
      alert("Password updated successfully");
      // Clear form fields and error message after successful update
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating password:", error);
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Failed to update password. Please try again later.");
      }
    }
  };

  return (
    <div className="container margin-top-bottom">
      <h2 className="text-center mb-4 mt-5">Change Password</h2>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formOldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Change Password
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPrivacyPage;
