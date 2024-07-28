import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom here
import axios from "axios";
import { useUser } from "../context/UserContext";
import { API_URL } from "../constants";

const NavProfile = ({ logout }) => {
  const [notifications, setNotifications] = useState([]);

  const { userData } = useUser();

  const capitalizedRole =
    userData.role.charAt(0).toUpperCase() + userData.role.slice(1);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/notifications/${userData.role}`
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications: ", error);
    }
  };

  const handleLogout = () => {
    // Call the logout function passed as a prop
    logout();
  };

  return (
    <div className="collapse navbar-collapse" id="bsbNavbar">
      <ul className="navbar-nav bsb-dropdown-menu-responsive ms-auto align-items-center d-flex gap-3">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle bsb-dropdown-toggle-caret-disable"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="position-relative pt-1">
              <i className="bi bi-bell"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                {notifications.length}
                <span className="visually-hidden">New Chats</span>
              </span>
            </span>
          </a>
          <div className="dropdown-menu dropdown-menu-md-end bsb-dropdown-animation bsb-fadeIn">
            <div>
              <h6 className="dropdown-header fs-7 text-center">
                {notifications.length} Notifications
              </h6>
            </div>
            <div>
              <hr className="dropdown-divider mb-0" />
            </div>
            <div className="list-group list-group-flush">
              {notifications.map((notification) => (
                <Link
                  key={notification._id}
                  to={`/notifications`}
                  className="list-group-item list-group-item-action"
                >
                  <div className="row g-0 align-items-center">
                    <div className="col-12">
                      <div className="ps-3">
                        <div className="text-dark">{notification.title}</div>
                        <div className="text-secondary mt-1 fs-7">
                          {notification.message}
                        </div>
                        <div className="text-secondary mt-1 fs-7">
                          {notification.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div>
              <hr className="dropdown-divider mt-0" />
            </div>
            <div>
              <Link
                className="dropdown-item fs-7 text-center"
                to="/notifications"
              >
                See All Notifications
              </Link>
            </div>
          </div>
        </li>

        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle bsb-dropdown-toggle-caret-disable"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {/* <img
              src="https://bootstrapbrain.com/demo/components/navbars/navbar-3/assets/img/profile/profile-img-1.jpg"
              width="35"
              height="35"
              className="img-fluid rounded-circle"
              alt="Luke Reeves"
            /> */}

            {userData.gender === "female" ? (
              <img
                src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=826&t=st=1717741900~exp=1717742500~hmac=0f0e81f21efdb176895d74daf6bff3101c651c4c70821ce5f7838879a1b0ea9c"
                alt="Female"
                width="40"
                height="36"
                className="rounded-circle"
              />
            ) : (
              <img
                src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=826&t=st=1717742008~exp=1717742608~hmac=460838e47f5d75742de978bdbd876f44ad4d5e38f5ee76de5f8593509b9bcb00"
                alt="Male"
                width="40"
                height="38"
                className="rounded-circle"
              />
            )}
          </a>
          <ul className="dropdown-menu dropdown-menu-md-end bsb-dropdown-animation bsb-fadeIn">
            <li>
              <p className="dropdown-header  text-center">
                Welcome, {userData.fullName} ({userData.username})
              </p>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a href="#" className="dropdown-item" aria-current="true">
                <div className="row g-0 align-items-center">
                  <div className="col-3">
                    {userData.gender === "female" ? (
                      <img
                        src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=826&t=st=1717741900~exp=1717742500~hmac=0f0e81f21efdb176895d74daf6bff3101c651c4c70821ce5f7838879a1b0ea9c"
                        alt="Female"
                        width="55"
                        height="55"
                        className="rounded-circle"
                      />
                    ) : (
                      <img
                        src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=826&t=st=1717742008~exp=1717742608~hmac=460838e47f5d75742de978bdbd876f44ad4d5e38f5ee76de5f8593509b9bcb00"
                        alt="Male"
                        width="55"
                        height="55"
                        className="rounded-circle"
                      />
                    )}
                  </div>
                  <div className="col-9">
                    <div className="ps-3">
                      <div className="text-secondary mt-1 fs-7">
                        <b>{capitalizedRole} Account</b>
                      </div>
                      <div className="text-secondary mt-1 fs-7">
                        {userData.email}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to={`/${userData.role}_profile`}>
                <span>
                  <i className="bi bi-person-fill me-2"></i>
                  <span className="fs-7">View Profile</span>
                </span>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/notifications">
                <span>
                  <i className="bi bi-bell-fill me-2"></i>
                  <span className="fs-7">Notifications</span>
                </span>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="settings">
                <span>
                  <i className="bi bi-gear-fill me-2"></i>
                  <span className="fs-7">Settings & Privacy</span>
                </span>
              </Link>
            </li>
            <li>
              <a className="dropdown-item" href="#!">
                <span>
                  <i className="bi bi-question-circle-fill me-2"></i>
                  <span className="fs-7">Help Center</span>
                </span>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                className="dropdown-item text-center"
                to="/signin"
                onClick={handleLogout}
              >
                <span>
                  <span className="fs-7">Log Out</span>
                </span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default NavProfile;
