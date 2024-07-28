import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toast, ToastBody, ToastHeader, Spinner, Button } from "reactstrap";
import { useUser } from "../context/UserContext";
import { API_URL } from "../constants";
import { toast } from "react-toastify";

const NotificationPopup = () => {
  const { userData } = useUser();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [personalNotifications, setPersonalNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/notifications/${userData.role}`
        );
        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notifications: ", error);
        setLoading(false);
        // Handle error state or show error message
      }
    };

    const fetchPersonalNotifications = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/notifications/user/${userData._id}`
        );
        setPersonalNotifications(response.data);
      } catch (error) {
        console.error("Error fetching personal notifications: ", error);
      }
    };

    if (userData.role) {
      fetchNotifications();
    } else {
      setLoading(false); // Assuming no role means no notifications to fetch
    }

    if (userData._id) {
      fetchPersonalNotifications();
    }
  }, [userData]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      // Make API call to mark notification as read or delete it
      await axios.delete(`${API_URL}/api/notifications/${notificationId}`);

      // Update state to reflect the deletion
      setPersonalNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification._id !== notificationId
        )
      );
      toast.success("You have read Notification");
    } catch (error) {
      console.error("Error marking notification as read: ", error);
      // Handle error state or show error message
    }
  };

  if (loading) {
    return (
      <div
        className="container text-center min-vh-100"
        style={{ marginTop: "180px" }}
      >
        <h2 className="text-center display-6 mb-5">Notifications</h2>
        <Spinner
          color="primary"
          style={{ height: "3rem", width: "3rem", marginTop: "3rem" }}
        >
          Loading...
        </Spinner>
      </div>
    );
  }

  if (notifications.length === 0 && personalNotifications.length === 0) {
    return (
      <div
        className="container text-center min-vh-100"
        style={{ marginTop: "180px" }}
      >
        <h2 className="text-center display-6 mb-5">Notifications</h2>
        <p className="lead animated-text margin-top-bottom">
          No notifications to display.
        </p>
      </div>
    );
  }

  return (
    <div className="container min-vh-100" style={{ marginTop: "180px" }}>
      <div>
        <h2 className="text-center display-6 mb-5">General Notifications</h2>
        <div className="d-flex gap-4 flex-wrap align-content-center justify-content-around">
          {notifications.map((notification) => (
            <Toast key={notification._id} className="p-2">
              <ToastHeader icon="primary">{notification.title}</ToastHeader>
              <ToastBody>{notification.message}</ToastBody>
            </Toast>
          ))}
        </div>
      </div>

      {personalNotifications.length > 0 && (
        <div className="mt-5">
          <h2 className="text-center display-6 mb-5">Personal Notifications</h2>
          <div className="d-flex gap-4 flex-wrap align-content-center justify-content-around">
            {personalNotifications.map((notification) => (
              <Toast key={notification._id} className="p-2">
                <ToastHeader icon="primary">{notification.title}</ToastHeader>
                <ToastBody>{notification.message}</ToastBody>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Mark as Read
                </Button>
              </Toast>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;
