import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/contacts`)
      .then((response) => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  const handleMarkAsResponded = async (id) => {
    try {
      await axios.put(`${API_URL}/api/contacts/${id}`, { responded: true });
      const updatedContacts = contacts.map((contact) =>
        contact._id === id ? { ...contact, responded: true } : contact
      );
      toast.success("Marked as responded");
      setContacts(updatedContacts);
    } catch (error) {
      console.error("Error marking as responded:", error);
    }
  };

  const formatIndianDate = (utcDateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Kolkata",
      timeZoneName: "short",
    };

    return new Date(utcDateString).toLocaleString("en-IN", options);
  };

  if (loading) {
    return (
      <div className="text-center margin-top-bottom">
        <Spinner
          color="primary"
          style={{
            height: "3rem",
            width: "3rem",
            marginTop: "3rem",
          }}
        ></Spinner>
      </div>
    );
  }

  return (
    <div
      className="container margin-top-bottom text-center min-vh-100"
      style={{ marginTop: "120px" }}
    >
      <h1 className="fs-2 my-4">Contact Us List</h1>
      <p>The people who are trying to contact us:</p>
      <div className="table-responsive">
        {contacts.length === 0 ? (
          <p className="fs-4 m-5 animated-text">
            No one is trying to contact us.
          </p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Added At</th>
                <th>Responded</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </td>
                  <td>{contact.message}</td>
                  <td>{formatIndianDate(contact.createdAt)}</td>
                  <td>{contact.responded ? "Yes" : "No"}</td>
                  <td>
                    {!contact.responded ? (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleMarkAsResponded(contact._id)}
                      >
                        Mark as Responded
                      </button>
                    ) : (
                      <i className="fa-solid fa-check fa-lg text-success"></i>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ContactList;
