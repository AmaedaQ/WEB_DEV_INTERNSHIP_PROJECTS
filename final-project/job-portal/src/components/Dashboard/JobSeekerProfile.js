import React, { useEffect, useState } from "react";
import { Container, Card, Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function JobSeekerProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [updateStatus, setUpdateStatus] = useState("");

  // Personal Information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Education Details
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

  // Skills
  const [skills, setSkills] = useState("");

  // Experience
  const [experience, setExperience] = useState("");

  useEffect(() => {
    // Retrieve user data from local storage
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData && authData.role === "job_seeker") {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const currentUser = users.find((user) => user.email === authData.email);
      if (currentUser) {
        setUserData(currentUser);
        setName(currentUser.name);
        setEmail(currentUser.email);
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

    // Update user data
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.email === email
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
          <div>
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
          </div>
        );
      case 1:
        return (
          <div>
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
          </div>
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
    <Container style={{ maxWidth: "1200px", marginTop: "20px" }}>
      <Card
        style={{ padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <Card.Body>
          <h2
            style={{
              marginBottom: "20px",
              color: "#007bff",
              textAlign: "center",
            }}
          >
            Job Seeker Profile
          </h2>
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
                    style={{ marginRight: "10px" }}
                  >
                    Previous
                  </Button>
                )}
                {currentStep < 4 && (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    style={{ marginRight: "10px" }}
                  >
                    Next
                  </Button>
                )}
                {currentStep === 4 && (
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginRight: "10px" }}
                  >
                    Save Changes
                  </Button>
                )}
                {currentStep < 4 && (
                  <Button
                    variant="secondary"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </Form>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, padding: "10px" }}>
                  <strong>Name:</strong> {userData?.name}
                </div>
                <div style={{ flex: 1, padding: "10px" }}>
                  <strong>Email:</strong> {userData?.email}
                </div>
                <div style={{ flex: 1, padding: "10px" }}>
                  <strong>Phone:</strong> {userData?.phone}
                </div>
                <div style={{ flex: 1, padding: "10px" }}>
                  <strong>Address:</strong> {userData?.address}
                </div>
              </div>
              <hr />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, padding: "10px" }}>
                  <strong>Degree:</strong> {userData?.degree}
                </div>
                <div style={{ flex: 1, padding: "10px" }}>
                  <strong>Institution:</strong> {userData?.institution}
                </div>
                <div style={{ flex: 1, padding: "10px" }}>
                  <strong>Graduation Year:</strong> {userData?.graduationYear}
                </div>
                <div style={{ flex: 1, padding: "10px" }}>
                  <strong>Skills:</strong> {userData?.skills}
                </div>
              </div>
              <hr />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, padding: "10px" }}>
                  <strong>Experience:</strong> {userData?.experience}
                </div>
              </div>
              <hr />
              <Button
                variant="primary"
                onClick={handleEdit}
                style={{ display: "block", margin: "20px auto" }}
              >
                Edit Profile
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default JobSeekerProfile;
