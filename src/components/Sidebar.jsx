import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/education_logo.png";

const Sidebar = ({ userRole, logout }) => {
  const profileLink = `/${userRole}_profile`;
  const coursesLink = `/${userRole}_courses`;
  const scheduleLink = `/${userRole}_schedule`;
  const attendanceLink = `/${userRole}_attendance`;
  const assignmentLink = `/${userRole}_assignment`;
  const examLink = `/${userRole}_exams`;
  const resultLink = `/${userRole}_result`;

  const handleLogout = () => {
    // Call the logout function passed as a prop
    logout();
  };

  return (
    <>
      <aside
        className="bsb-sidebar-1 offcanvas offcanvas-start"
        tabIndex="-1"
        id="bsbSidebar1"
        aria-labelledby="bsbSidebarLabel1"
        data-bs-backdrop="false"
      >
        <div className="offcanvas-header" data-bs-dismiss="offcanvas">
          <Link className="sidebar-brand text-decoration-none" to="/home">
            <img
              src={logo}
              // width="195"
              height="70"
            />
            {/* <h1 className="fs-4">Education Managemnet</h1> */}
          </Link>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body pt-0">
          <hr className="sidebar-divider mb-3" />

          <ul className="navbar-nav">
            {/* Dashboards */}
            <li className="nav-item">
              <a
                className="nav-link p-3 active bg-light rounded"
                data-bs-toggle="collapse"
                href="#dashboardExamples"
                role="button"
                aria-expanded="true"
                aria-controls="dashboardExamples"
              >
                <div className="d-flex align-items-center gap-4 py-2">
                  <div className="nav-link-icon text-primary">
                    <i className="fa-solid fa-house"></i>
                  </div>
                  <span className="nav-link-text fw-bold">Dashboards</span>
                </div>
              </a>
              <div className="collapse show" id="dashboardExamples">
                <ul className="nav flex-column ms-4">
                  {/* Dashboard links based on user's role */}
                  {userRole === "admin" ? (
                    <>
                      <li className="nav-item" data-bs-dismiss="offcanvas">
                        <Link
                          className="nav-link active"
                          aria-current="page"
                          to="/admin_dashboard"
                        >
                          <div className="d-flex align-items-center gap-4 py-2">
                            <div className="nav-link-icon text-primary-emphasis">
                              <i className="fa-solid fa-user-tie"></i>
                            </div>
                            <span className="nav-link-text">
                              Admin Dashboard
                            </span>
                          </div>
                        </Link>
                      </li>
                      <li className="nav-item" data-bs-dismiss="offcanvas">
                        <Link
                          className="nav-link active"
                          aria-current="page"
                          to="/developer_dashboard"
                        >
                          <div className="d-flex align-items-center gap-4 py-2">
                            <div className="nav-link-icon text-primary-emphasis">
                              <i className="fa-solid fa-user-tie"></i>
                            </div>
                            <span className="nav-link-text">
                              Developer Dashboard
                            </span>
                          </div>
                        </Link>
                      </li>
                      <li className="nav-item" data-bs-dismiss="offcanvas">
                        <Link
                          className="nav-link active"
                          aria-current="page"
                          to="/Admin_Data_Visulisation"
                        >
                          <div className="d-flex align-items-center gap-4 py-2">
                            <div className="nav-link-icon text-info-emphasis">
                              <i className="fa-solid fa-chart-simple"></i>
                            </div>
                            <span className="nav-link-text">
                              Data dashboard
                            </span>
                          </div>
                        </Link>
                      </li>
                    </>
                  ) : userRole === "faculty" ? (
                    <>
                      <li className="nav-item" data-bs-dismiss="offcanvas">
                        <Link
                          className="nav-link active"
                          aria-current="page"
                          to="/faculty_dashboard"
                        >
                          <div className="d-flex align-items-center gap-4 py-2">
                            <div className="nav-link-icon text-danger-emphasis">
                              <i className="fa-solid fa-chalkboard-user"></i>
                            </div>
                            <span className="nav-link-text">
                              Faculty Dashboard
                            </span>
                          </div>
                        </Link>
                      </li>

                      <li className="nav-item" data-bs-dismiss="offcanvas">
                        <Link
                          className="nav-link active"
                          aria-current="page"
                          to="/faculty_data_dashboard"
                        >
                          <div className="d-flex align-items-center gap-4 py-2">
                            <div className="nav-link-icon text-danger-emphasis">
                              <i className="fa-solid fa-chart-simple"></i>
                            </div>
                            <span className="nav-link-text">
                              Data Dashboard
                            </span>
                          </div>
                        </Link>
                      </li>
                    </>
                  ) : userRole === "student" ? (
                    <>
                      <li className="nav-item" data-bs-dismiss="offcanvas">
                        <Link
                          className="nav-link active"
                          aria-current="page"
                          to="/student_dashboard"
                        >
                          <div className="d-flex align-items-center gap-4 py-2">
                            <div className="nav-link-icon text-info-emphasis">
                              <i className="fa-solid fa-graduation-cap"></i>
                            </div>
                            <span className="nav-link-text">
                              Student Dashboard
                            </span>
                          </div>
                        </Link>
                      </li>

                      <li className="nav-item" data-bs-dismiss="offcanvas">
                        <Link
                          className="nav-link active"
                          aria-current="page"
                          to="/student_Data_Visulisation"
                        >
                          <div className="d-flex align-items-center gap-4 py-2">
                            <div className="nav-link-icon text-info-emphasis">
                              <i className="fa-solid fa-chart-simple"></i>
                            </div>
                            <span className="nav-link-text">
                              Data dashboard
                            </span>
                          </div>
                        </Link>
                      </li>
                    </>
                  ) : null}
                </ul>
              </div>
            </li>

            {/* Add your new clickable fields here */}
            {/* Example 1 */}

            {userRole === "student" || userRole === "faculty" ? (
              <>
                <li
                  className="nav-item border-bottom border-top mt-3 py-1 "
                  data-bs-dismiss="offcanvas"
                >
                  <Link className="nav-link p-3" to={profileLink}>
                    <div className="d-flex align-items-center gap-4">
                      <div className="nav-link-icon text-primary">
                        <i className="fa-solid fa-user-circle fa-lg"></i>{" "}
                        {/* Icon for My Profile */}
                      </div>
                      <span className="nav-link-text fw-bold">My Profile</span>
                    </div>
                  </Link>
                </li>
                {/* Example 2 */}
                <li
                  className="nav-item border-bottom py-1"
                  data-bs-dismiss="offcanvas"
                >
                  <Link className="nav-link p-3" to={coursesLink}>
                    <div className="d-flex align-items-center gap-4">
                      <div className="nav-link-icon text-success">
                        <i className="fa-solid fa-book fa-lg"></i>{" "}
                        {/* Icon for My Courses */}
                      </div>
                      <span className="nav-link-text fw-bold">My Courses</span>
                    </div>
                  </Link>
                </li>
                {/* Example 3 */}
                <li
                  className="nav-item border-bottom py-1"
                  data-bs-dismiss="offcanvas"
                >
                  <Link className="nav-link p-3" to={scheduleLink}>
                    <div className="d-flex align-items-center gap-4">
                      <div className="nav-link-icon text-warning">
                        <i className="fa-solid fa-calendar-alt fa-lg"></i>{" "}
                        {/* Icon for My Schedule */}
                      </div>
                      <span className="nav-link-text fw-bold">My Schedule</span>
                    </div>
                  </Link>
                </li>

                {/* Exams */}
                <li
                  className="nav-item border-bottom py-1"
                  data-bs-dismiss="offcanvas"
                >
                  <Link className="nav-link p-3" to={examLink}>
                    <div className="d-flex align-items-center gap-4">
                      <div className="nav-link-icon text-primary">
                        <i className="fa-solid fa-book-open fa-lg"></i>{" "}
                        {/* Icon for Exam */}
                      </div>
                      <span className="nav-link-text fw-bold">Exam</span>
                    </div>
                  </Link>
                </li>

                {/* Results */}
                <li
                  className="nav-item border-bottom py-1"
                  data-bs-dismiss="offcanvas"
                >
                  <Link className="nav-link p-3" to={resultLink}>
                    <div className="d-flex align-items-center gap-4">
                      <div className="nav-link-icon text-warning">
                        <i className="fa-solid fa-trophy fa-lg"></i>
                        {/* Icon for Results */}
                      </div>
                      <span className="nav-link-text fw-bold">Results</span>
                    </div>
                  </Link>
                </li>

                {/* Example 4 */}
                <li
                  className="nav-item border-bottom py-1"
                  data-bs-dismiss="offcanvas"
                >
                  <Link className="nav-link p-3" to={attendanceLink}>
                    <div className="d-flex align-items-center gap-4">
                      <div className="nav-link-icon text-info">
                        <i className="fa-solid fa-check-circle fa-lg"></i>{" "}
                        {/* Icon for Attendance */}
                      </div>
                      <span className="nav-link-text fw-bold">Attendance</span>
                    </div>
                  </Link>
                </li>
                {/* Example 5 */}
                <li
                  className="nav-item border-bottom py-1"
                  data-bs-dismiss="offcanvas"
                >
                  <Link className="nav-link p-3" to={assignmentLink}>
                    <div className="d-flex align-items-center gap-4">
                      <div className="nav-link-icon text-danger">
                        <i className="fa-solid fa-file-alt fa-lg"></i>{" "}
                        {/* Icon for Assignment */}
                      </div>
                      <span className="nav-link-text fw-bold">Assignment</span>
                    </div>
                  </Link>
                </li>
                {/* Example 6 */}
                <li
                  className="nav-item border-bottom py-1"
                  data-bs-dismiss="offcanvas"
                >
                  <Link className="nav-link p-3" to="/notifications">
                    <div className="d-flex align-items-center gap-4">
                      <div className="nav-link-icon text-primary">
                        <i className="fa-solid fa-bell fa-lg"></i>{" "}
                        {/* Icon for Notification */}
                      </div>
                      <span className="nav-link-text fw-bold">
                        Notification
                      </span>
                    </div>
                  </Link>
                </li>
              </>
            ) : (
              /* Admin links for sideBard */
              userRole === "admin" && (
                <>
                  <li
                    className="nav-item border-bottom border-top mt-3 py-1"
                    data-bs-dismiss="offcanvas"
                  >
                    <Link className="nav-link p-3" to="/admin_profile">
                      <div className="d-flex align-items-center gap-4">
                        <div className="nav-link-icon text-primary">
                          <i className="fas fa-user-circle fa-lg"></i>{" "}
                          {/* Icon for My Profile */}
                        </div>
                        <span className="nav-link-text fw-bold">
                          My Profile
                        </span>
                      </div>
                    </Link>
                  </li>

                  {/* My Courses */}
                  <li
                    className="nav-item border-bottom py-1"
                    data-bs-dismiss="offcanvas"
                  >
                    <Link className="nav-link p-3" to="/admin/manage_courses">
                      <div className="d-flex align-items-center gap-4">
                        <div className="nav-link-icon text-success">
                          <i className="fas fa-book fa-lg"></i>{" "}
                          {/* Icon for My Courses */}
                        </div>
                        <span className="nav-link-text fw-bold">
                          Manage Courses
                        </span>
                      </div>
                    </Link>
                  </li>

                  {/* Manage Notifications */}
                  <li
                    className="nav-item border-bottom py-1"
                    data-bs-dismiss="offcanvas"
                  >
                    <Link className="nav-link p-3" to="/admin/notifications">
                      <div className="d-flex align-items-center gap-4">
                        <div className="nav-link-icon text-warning">
                          <i className="fas fa-bell fa-lg"></i>{" "}
                          {/* Icon for Notifications */}
                        </div>
                        <span className="nav-link-text fw-bold">
                          Manage Notifications
                        </span>
                      </div>
                    </Link>
                  </li>

                  {/* Manage Schedules */}
                  <li
                    className="nav-item border-bottom py-1"
                    data-bs-dismiss="offcanvas"
                  >
                    <Link className="nav-link p-3" to="/admin/student_schedule">
                      <div className="d-flex align-items-center gap-4">
                        <div className="nav-link-icon text-info">
                          <i className="fas fa-calendar-alt fa-lg"></i>{" "}
                          {/* Icon for Manage Schedule */}
                        </div>
                        <span className="nav-link-text fw-bold">
                          Manage Schedule
                        </span>
                      </div>
                    </Link>
                  </li>

                  {/* Manage Users */}
                  <li
                    className="nav-item border-bottom py-1"
                    data-bs-dismiss="offcanvas"
                  >
                    <Link className="nav-link p-3" to="/admin/user_list">
                      <div className="d-flex align-items-center gap-4">
                        <div className="nav-link-icon text-primary">
                          <i className="fas fa-users fa-lg"></i>{" "}
                          {/* Icon for Manage Users */}
                        </div>
                        <span className="nav-link-text fw-bold">
                          Manage Users
                        </span>
                      </div>
                    </Link>
                  </li>

                  {/* Manage Contacts */}
                  <li
                    className="nav-item border-bottom py-1"
                    data-bs-dismiss="offcanvas"
                  >
                    <Link className="nav-link p-3" to="/admin/contact_list">
                      <div className="d-flex align-items-center gap-4">
                        <div className="nav-link-icon text-danger">
                          <i className="fas fa-address-book fa-lg"></i>{" "}
                          {/* Icon for Manage Contacts */}
                        </div>
                        <span className="nav-link-text fw-bold">
                          Contact Details
                        </span>
                      </div>
                    </Link>
                  </li>
                </>
              )
            )}

            {/* Projects (Pages) */}
            <li className="nav-item mt-3">
              <h6 className="py-1 text-secondary text-uppercase fs-7">Pages</h6>
            </li>
            {/* Projects  */}
            <li className="nav-item">
              <a
                className="nav-link p-3"
                data-bs-toggle="collapse"
                href="#pageExamples"
                role="button"
                aria-expanded="false"
                aria-controls="pageExamples"
              >
                <div className="d-flex align-items-center gap-4 py-2">
                  <div className="nav-link-icon text-danger">
                    <i className="fa-regular fa-folder"></i>
                  </div>
                  <span className="nav-link-text fw-bold">Projects</span>
                </div>
              </a>
              <div className="collapse" id="pageExamples">
                <ul className="nav flex-column ms-4">
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <Link
                      className="nav-link link-secondary"
                      aria-current="page"
                      to="/todo"
                    >
                      <div className="d-flex align-items-center gap-4 py-2">
                        <div className="nav-link-icon text-success">
                          <i className="fa-solid fa-calendar-check"></i>
                        </div>
                        <span className="nav-link-text">To Do App</span>
                      </div>
                    </Link>
                  </li>

                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <Link
                      className="nav-link link-secondary"
                      aria-current="page"
                      to="/weather"
                    >
                      <div className="d-flex align-items-center gap-4 py-2">
                        <div className="nav-link-icon text-primary">
                          <i className="fa-solid fa-cloud"></i>
                        </div>
                        <span className="nav-link-text">Kolhapur Weather</span>
                      </div>
                    </Link>
                  </li>

                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <Link
                      className="nav-link link-secondary"
                      aria-current="page"
                      to="/news"
                    >
                      <div className="d-flex align-items-center gap-4 py-2">
                        <div className="nav-link-icon text-danger-emphasis">
                          <i className="fa-solid fa-newspaper"></i>
                        </div>
                        <span className="nav-link-text">News App</span>
                      </div>
                    </Link>
                  </li>

                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <Link
                      className="nav-link link-secondary"
                      aria-current="page"
                      to="/users-data"
                    >
                      <div className="d-flex align-items-center gap-4 py-2">
                        <div className="nav-link-icon text-danger-emphasis">
                          <i className="fa-solid fa-users"></i>
                        </div>
                        <span className="nav-link-text">Users CRUD Demo</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            {/* Authentication */}
            <li className="nav-item">
              <a
                className="nav-link p-3"
                data-bs-toggle="collapse"
                href="#authExamples"
                role="button"
                aria-expanded="false"
                aria-controls="authExamples"
              >
                <div className="d-flex align-items-center gap-4 py-2">
                  <div className="nav-link-icon text-success">
                    <i className="fa-solid fa-gear"></i>
                  </div>
                  <span className="nav-link-text fw-bold">Authentication</span>
                </div>
              </a>
              <div className="collapse" id="authExamples">
                <ul className="nav flex-column ms-4">
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <Link
                      className="nav-link link-secondary"
                      aria-current="page"
                      to="/settings"
                    >
                      <div className="d-flex align-items-center gap-4 py-2">
                        <div className="nav-link-icon text-success-emphasis">
                          <i className="fas fa-lock"></i>{" "}
                          {/* Icon for Change Password */}
                        </div>
                        <span className="nav-link-text">Change Password</span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link link-secondary"
                      aria-current="page"
                      to="/signin"
                      onClick={handleLogout}
                    >
                      <div className="d-flex align-items-center gap-4 py-2">
                        <div className="nav-link-icon text-success-emphasis">
                          <i className="fas fa-sign-out-alt"></i>{" "}
                          {/* Icon for Logout */}
                        </div>
                        <span className="nav-link-text">Logout</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
