import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../constants";

const FileUploadComponent = ({ fetchQuestions }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        // Send file to server for processing
        const response = await axios.post(
          `${API_URL}/api/questions/upload-excel`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Handle successful upload
        console.log("File upload response:", response.data);
        fetchQuestions();
        setSelectedFile(null); // Clear selected file

        toast.success("File uploaded successfully!");
      } catch (error) {
        // Handle error
        console.error("Error uploading file:", error);
        toast.error("Error uploading file. Please try again.");
      }
    } else {
      toast.warn("Please select a file.");
    }
  };

  return (
    <div className="container col-md-6 margin-top-bottom">
      <h3 className="text-center mb-4">Upload Excel File</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
          />
        </Form.Group>
        <div className="text-center">
          <Button
            className="text-center"
            variant="primary"
            onClick={handleUpload}
          >
            Upload
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FileUploadComponent;
