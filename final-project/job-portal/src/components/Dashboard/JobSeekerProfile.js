import React, { useEffect, useState } from "react";
import { Container, Card, Button, Form, Alert } from "react-bootstrap";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaEdit,
  FaTimes,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function JobSeekerProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [updateStatus, setUpdateStatus] = useState("");

  // Form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData && authData.role === "job_seeker") {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const currentUser = users.find((user) => user.email === authData.email);
      if (currentUser) {
        setUserData(currentUser);
        setName(currentUser.name);
        setPhone(currentUser.phone || "N/A");
        setAddress(currentUser.address || "N/A");
        setDegree(currentUser.degree || "N/A");
        setInstitution(currentUser.institution || "N/A");
        setGraduationYear(currentUser.graduationYear || "N/A");
        setSkills(currentUser.skills || "N/A");
        setExperience(currentUser.experience || "N/A");
      } else {
        navigate("/login/job-seeker");
      }
    } else {
      navigate("/login/job-seeker");
    }
  }, [navigate]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.email === userData.email
        ? {
            ...user,
            name,
            phone,
            address,
            degree,
            institution,
            graduationYear,
            skills,
            experience,
          }
        : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUserData({
      ...userData,
      name,
      phone,
      address,
      degree,
      institution,
      graduationYear,
      skills,
      experience,
    });
    setEditMode(false);
    setUpdateStatus("Profile updated successfully!");
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
          </>
        );
      case 1:
        return (
          <>
            <Form.Group controlId="degree">
              <Form.Label>Degree</Form.Label>
              <Form.Control
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="institution">
              <Form.Label>Institution</Form.Label>
              <Form.Control
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="graduationYear">
              <Form.Label>Graduation Year</Form.Label>
              <Form.Control
                type="text"
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
              />
            </Form.Group>
          </>
        );
      case 2:
        return (
          <Form.Group controlId="skills">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </Form.Group>
        );
      case 3:
        return (
          <Form.Group controlId="experience">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </Form.Group>
        );
      default:
        return null;
    }
  };

  return (
    <Container style={{ maxWidth: "800px", marginTop: "20px" }}>
      <Card
        style={{
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          position: "relative",
          borderRadius: "8px",
        }}
      >
        <Card.Body>
          <div className="text-center">
            <FaUser size={100} color="#007bff" />
            <h2 className="text-primary" style={{ marginTop: "10px" }}>
              {userData?.name}
            </h2>
          </div>
          {updateStatus && (
            <Alert variant="success" style={{ marginBottom: "20px" }}>
              {updateStatus}
            </Alert>
          )}
          {editMode ? (
            <Form onSubmit={handleSave}>
              {renderStepContent()}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                {currentStep > 0 && (
                  <Button
                    variant="secondary"
                    onClick={handlePrevious}
                    style={{ flex: 1, maxWidth: "150px" }}
                  >
                    Previous
                  </Button>
                )}
                {currentStep < 3 && (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    style={{ flex: 1, maxWidth: "150px" }}
                  >
                    Next
                  </Button>
                )}
                {currentStep === 3 && (
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ flex: 1, maxWidth: "150px" }}
                  >
                    Save Changes
                  </Button>
                )}
                {currentStep < 3 && (
                  <Button
                    variant="secondary"
                    onClick={() => setEditMode(false)}
                    style={{ flex: 1, maxWidth: "150px" }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </Form>
          ) : (
            <>
              <div style={{ marginBottom: "20px" }}>
                <h4 className="text-primary">
                  <FaUser /> Personal Information
                </h4>
                <div style={{ marginBottom: "10px" }}>
                  <FaUser /> <strong>Name:</strong> {userData?.name}
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <FaPhone /> <strong>Phone:</strong> {userData?.phone}
                </div>
                <div>
                  <FaMapMarkerAlt /> <strong>Address:</strong>{" "}
                  {userData?.address}
                </div>
              </div>
              <hr />
              <div style={{ marginBottom: "20px" }}>
                <h4 className="text-primary">
                  <FaGraduationCap /> Education
                </h4>
                <div style={{ marginBottom: "10px" }}>
                  <strong>Degree:</strong> {userData?.degree}
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <strong>Institution:</strong> {userData?.institution}
                </div>
                <div>
                  <strong>Graduation Year:</strong> {userData?.graduationYear}
                </div>
              </div>
              <hr />
              <div style={{ marginBottom: "20px" }}>
                <h4 className="text-primary">
                  <FaBriefcase /> Professional
                </h4>
                <div style={{ marginBottom: "10px" }}>
                  <strong>Skills:</strong> {userData?.skills}
                </div>
                <div>
                  <strong>Experience:</strong> {userData?.experience}
                </div>
              </div>
              <Button variant="primary" onClick={handleEdit}>
                <FaEdit /> Edit Profile
              </Button>
            </>
          )}
        </Card.Body>
        <Button
          variant="light "
          style={{
            position: "absolute",
            top: "10px",
            left: "650px",
            border: "none",
            background: "transparent",
            fontSize: "20px",
            zIndex: 1,
          }}
          onClick={() => navigate(-1)} // Go back to the previous page
        >
          <strong>
            Close <FaTimes />
          </strong>
        </Button>
      </Card>
    </Container>
  );
}

export default JobSeekerProfile;
