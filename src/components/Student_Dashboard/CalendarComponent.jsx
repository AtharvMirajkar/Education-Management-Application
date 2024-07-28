import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { API_URL } from "../../constants";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allNotifications, setAllNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const { userData } = useUser();

  useEffect(() => {
    fetchAllNotifications();
  }, []);

  useEffect(() => {
    filterNotificationsByDate(selectedDate);
  }, [selectedDate, allNotifications]);

  const fetchAllNotifications = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/notifications/${userData.role}`
      );

      // Assuming your API returns an array of notifications
      setAllNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const filterNotificationsByDate = (date) => {
    // Filter notifications based on selected date
    const filtered = allNotifications.filter((notification) => {
      // Compare notification's date string with selected date's date string
      return (
        notification.date.split("T")[0] === date.toISOString().split("T")[0]
      );
    });

    setFilteredNotifications(filtered);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="container card shadow p-5">
      <div className="row">
        <div className="col-md-6">
          <h3 className="mb-4">Calendar</h3>
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
        <div className="col-md-6 mt-5">
          <h4 className="mb-4">Events for {selectedDate.toDateString()}</h4>
          <ul className="list-group">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <Link to="/notifications" style={{ textDecoration: "none" }}>
                  <p className="h6">{notification.title}</p>
                  <li key={notification._id} className="list-group-item">
                    {notification.message}
                  </li>
                </Link>
              ))
            ) : (
              <li className="list-group-item">No events for this date</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
