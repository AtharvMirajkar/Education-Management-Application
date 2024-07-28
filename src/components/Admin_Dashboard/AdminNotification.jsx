import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";

const AdminNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    role: "student",
    selectedUser: "",
    date: new Date().toISOString().split("T")[0], // Initialize date with current date
  });
  const [users, setUsers] = useState([]);
  const [sendToAll, setSendToAll] = useState(false); // State to decide whether to send to all

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (notification.role) {
      fetchUsersByRole(notification.role);
    }
  }, [notification.role]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notifications`);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications: ", error);
    }
  };

  const fetchUsersByRole = async (role) => {
    try {
      const response = await axios.get(`${API_URL}/api/usersData/role/${role}`);
      setUsers(response.data);
    } catch (error) {
      console.error(`Error fetching ${role} users: `, error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotification({ ...notification, [name]: value });
  };

  const handleUserChange = (e) => {
    const selectedUserId = e.target.value;
    setNotification({ ...notification, selectedUser: selectedUserId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (sendToAll) {
        // If sending to all, nullify selectedUser
        setNotification({ ...notification, selectedUser: "" });
      } else {
        // If not sending to all, ensure selectedUser is not null
        if (!notification.selectedUser) {
          toast.warn("Please select a user.");
          return;
        }
      }

      await axios.post(`${API_URL}/api/notifications`, notification);
      toast.success("Notification saved successfully!");
      setNotification({
        title: "",
        message: "",
        role: "student",
        selectedUser: "",
        date: new Date().toISOString().split("T")[0], // Reset date to current date
      });
      fetchNotifications();
    } catch (error) {
      console.error("Error saving notification: ", error);
      alert("Failed to save notification. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/notifications/${id}`);
      toast.warn("Notification deleted successfully!");
      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification: ", error);
      alert("Failed to delete notification. Please try again later.");
    }
  };

  return (
    <div className="container margin-top-bottom min-vh-100">
      <h2 className="text-center">Manage Notifications</h2>
      <form onSubmit={handleSubmit} className="mx-auto col-md-8">
        <div className="mb-3">
          <label htmlFor="titleInput" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="titleInput"
            name="title"
            value={notification.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="messageInput" className="form-label">
            Message:
          </label>
          <textarea
            className="form-control"
            id="messageInput"
            name="message"
            value={notification.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="roleSelect" className="form-label">
            Role:
          </label>
          <select
            className="form-select"
            id="roleSelect"
            name="role"
            value={notification.role}
            onChange={(e) => {
              handleChange(e);
              setSendToAll(false); // Reset sendToAll on role change
            }}
            required
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="dateInput" className="form-label">
            Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="dateInput"
            name="date"
            value={notification.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="sendToAllCheckbox"
            checked={sendToAll}
            onChange={() => setSendToAll(!sendToAll)}
          />
          <label className="form-check-label" htmlFor="sendToAllCheckbox">
            Send notification to all {notification.role}s
          </label>
        </div>

        {users.length > 0 && !sendToAll && (
          <div className="mb-3">
            <label htmlFor="userSelect" className="form-label">
              Select {notification.role === "student" ? "Student" : "Faculty"}:
            </label>
            <select
              className="form-select"
              id="userSelect"
              name="selectedUser"
              value={notification.selectedUser}
              onChange={handleUserChange}
              disabled={sendToAll} // Disable when sending to all
              required={!sendToAll} // Make required if not sending to all
            >
              <option value="">
                Select {notification.role === "student" ? "Student" : "Faculty"}
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullName}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="text-center mt-4">
          <button type="submit" className="btn my-btn2">
            Save Notification
          </button>
        </div>
      </form>

      {/* Notifications card  */}

      <div className="col-md-10 col-lg-12 mx-auto">
        {/* Notifications for student */}
        <div className="margin-top-bottom">
          <h3 className="text-center m-4">Student Notifications</h3>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {notifications
              .filter((item) => item.role === "student")
              .map((item) => (
                <div
                  key={item._id}
                  className="col d-flex justify-content-around"
                >
                  <Toast className="d-flex justify-content-evenly align-items-center p-2">
                    <div>
                      <ToastHeader icon="primary">{item.title}</ToastHeader>
                      <ToastBody>{item.message}</ToastBody>
                    </div>
                    <div className="mb-4">
                      <button
                        className="btn btn-sm btn-danger me-2 mb-5"
                        onClick={() => handleDelete(item._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </Toast>
                </div>
              ))}
            {notifications.filter((item) => item.role === "student").length ===
              0 && <div className="m-5"></div>}
          </div>
        </div>

        {/* Notification for Faculty */}
        <div className="m-4">
          <h3 className="text-center m-4">Faculty Notifications</h3>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {notifications
              .filter((item) => item.role === "faculty")
              .map((item) => (
                <div
                  key={item._id}
                  className="col d-flex justify-content-around"
                >
                  <Toast className="d-flex justify-content-between align-items-center p-2">
                    <div>
                      <ToastHeader icon="info">{item.title}</ToastHeader>
                      <ToastBody>{item.message}</ToastBody>
                    </div>
                    <div className="mb-4">
                      <button
                        className="btn btn-sm btn-danger me-2 mb-5"
                        onClick={() => handleDelete(item._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </Toast>
                </div>
              ))}
          </div>
          {notifications.filter((item) => item.role === "faculty").length ===
            0 && <div className="m-5"></div>}
        </div>
      </div>
    </div>
  );
};

export default AdminNotification;
