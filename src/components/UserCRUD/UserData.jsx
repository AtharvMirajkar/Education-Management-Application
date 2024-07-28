import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../../constants";

class UserData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      name: "",
      gender: "",
      address: "",
      contact: "",
      editIndex: null,
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = () => {
    axios
      .get(`${API_URL}/api/users`)
      .then((response) => {
        this.setState({ userData: response.data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddUser = () => {
    const { name, gender, address, contact, editIndex } = this.state;
    if (name && gender && address && contact) {
      if (editIndex === null) {
        const newUser = { name, gender, address, contact };
        axios
          .post(`${API_URL}/api/users`, newUser)
          .then((response) => {
            this.setState((prevState) => ({
              userData: [...prevState.userData, response.data],
              name: "",
              gender: "",
              address: "",
              contact: "",
            }));
          })
          .catch((error) => {
            console.error("Error adding user:", error);
          });
      } else {
        const updatedUser = { id: editIndex, name, gender, address, contact };
        axios
          .put(`${API_URL}/api/users/${editIndex}`, updatedUser)
          .then(() => {
            const updatedData = [...this.state.userData];
            const index = updatedData.findIndex(
              (user) => user.id === editIndex
            );
            updatedData[index] = updatedUser;
            this.setState({
              userData: updatedData,
              name: "",
              gender: "",
              address: "",
              contact: "",
              editIndex: null,
            });
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
      }
    } else {
      alert("Please fill all fields.");
    }
  };

  handleEditUser = (id) => {
    const user = this.state.userData.find((user) => user.id === id);
    this.setState({
      name: user.name,
      gender: user.gender,
      address: user.address,
      contact: user.contact,
      editIndex: id,
    });
  };

  handleDeleteUser = (userId) => {
    axios
      .delete(`${API_URL}/api/users/${userId}`)
      .then(() => {
        const updatedUserData = this.state.userData.filter(
          (user) => user.id !== userId
        );
        this.setState({ userData: updatedUserData });
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Error deleting user. Please try again later.");
      });
  };

  render() {
    const { name, gender, address, contact, userData } = this.state;

    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">User Data</h2>
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Name"
              name="name"
              value={name}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-control mb-2"
              name="gender"
              value={gender}
              onChange={this.handleInputChange}
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Address"
              name="address"
              value={address}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Contact"
              name="contact"
              value={contact}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="col-md-12 text-center">
            <button
              className="btn btn-primary m-4"
              onClick={this.handleAddUser}
            >
              {this.state.editIndex === null ? "Add User" : "Update User"}
            </button>
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col-md-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">Gender</th>
                  <th className="text-center">Address</th>
                  <th className="text-center">Contact</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={index}>
                    <td className="text-center">{user.name}</td>
                    <td className="text-center">{user.gender}</td>
                    <td className="text-center">{user.address}</td>
                    <td className="text-center">{user.contact}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-primary btn-sm m-2 px-4"
                        onClick={() => this.handleEditUser(user.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm m-2 px-3"
                        onClick={() => this.handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default UserData;
