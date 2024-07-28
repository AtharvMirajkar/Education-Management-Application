import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL } from "../../constants";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editFullName, setEditFullName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editIsActive, setEditIsActive] = useState(true); // New state for editing user activation

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/usersData`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    return /\S+@\S+\.\S+/.test(email);
  };

  const validateUsername = (username) => {
    // Username must contain at least one alphabetical character
    return /[a-zA-Z]/.test(username);
  };

  const validateFullName = (fullName) => {
    // Full name must contain at least one alphabetical character
    return /[a-zA-Z]/.test(fullName);
  };

  const createUser = async () => {
    if (!validateFullName(fullName)) {
      toast.error("Please enter a valid name.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validateUsername(username)) {
      toast.error("Please enter a valid username.");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/usersData`, {
        username,
        password,
        role,
        fullName,
        email,
        gender,
      });
      setUsername("");
      setPassword("");
      setRole("");
      setFullName("");
      setEmail("");
      setGender("");
      fetchUsers();
      toast.success("User created successfully!");
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to create user. Please try again later.");
      }
    }
  };

  const deleteUser = async (id) => {
    // Display confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      try {
        await axios.delete(`${API_URL}/api/usersData/${id}`);
        fetchUsers();
        toast.warn("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again later.");
      }
    }
  };

  const updateUser = async () => {
    try {
      await axios.put(`${API_URL}/api/usersData/${editUserId}`, {
        username: editUsername,
        password: editPassword,
        role: editRole,
        fullName: editFullName,
        email: editEmail,
        gender: editGender,
        isActive: editIsActive, // Include editIsActive in the request
      });
      setEditUserId(null);
      fetchUsers();
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("Failed to update user. Please try again later.");
    }
  };

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditUsername(user.username);
    setEditPassword(user.password);
    setEditRole(user.role);
    setEditFullName(user.fullName);
    setEditEmail(user.email);
    setEditGender(user.gender);
    setEditIsActive(user.isActive); // Set editIsActive state
  };

  const renderUsersByRole = (role) => {
    const filteredUsers = users.filter((user) => user.role === role);
    return (
      <div key={role} className="container mt-2">
        <h3 className="h4">{role.toUpperCase()}s</h3>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr className="text-center">
                <th>Full Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Username</th>
                <th>Role</th>
                <th>Active</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="text-center">
                  <td>
                    {user.id === editUserId ? (
                      <input
                        type="text"
                        value={editFullName}
                        onChange={(e) => setEditFullName(e.target.value)}
                      />
                    ) : (
                      user.fullName
                    )}
                  </td>
                  <td>
                    {user.id === editUserId ? (
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {user.id === editUserId ? (
                      <select
                        value={editGender}
                        onChange={(e) => setEditGender(e.target.value)}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    ) : (
                      user.gender
                    )}
                  </td>
                  <td>
                    {user.id === editUserId ? (
                      <input
                        type="text"
                        value={editUsername}
                        onChange={(e) => setEditUsername(e.target.value)}
                      />
                    ) : (
                      user.username
                    )}
                  </td>
                  <td>
                    {user.id === editUserId ? (
                      <select
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                      >
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td>
                    {user.id === editUserId ? (
                      <input
                        type="checkbox"
                        checked={editIsActive}
                        onChange={(e) => setEditIsActive(e.target.checked)}
                      />
                    ) : user.isActive ? (
                      "Yes"
                    ) : (
                      "No"
                    )}
                  </td>

                  <td>
                    {user.id === editUserId ? (
                      <>
                        <button
                          className="btn btn-success btn-sm px-4 me-2 m-1"
                          onClick={updateUser}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm px-4 m-1"
                          onClick={() => setEditUserId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary btn-sm px-4 me-2 m-1"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm px-4 m-1"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="margin-top-bottom">
      <div className="container mt-4">
        <h2 className="text-center">Create User</h2>
        <div className="row mt-4">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select mb-3"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4">
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select mb-3"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="col-md-12 text-center">
            <button
              className="btn btn-primary"
              onClick={createUser}
              disabled={
                !username ||
                !password ||
                !role ||
                !fullName ||
                !email ||
                !gender
              }
            >
              Create User
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-center m-4">Users List</h2>
      {renderUsersByRole("student")}
      {renderUsersByRole("faculty")}
      {renderUsersByRole("admin")}
    </div>
  );
};

export default UserList;
