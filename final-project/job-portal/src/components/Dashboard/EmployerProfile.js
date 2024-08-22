import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function EmployerProfile() {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    industry: "",
    companySize: "",
    yearEstablished: "",
    address: "",
    city: "",
    state: "",
    contactName: "",
    contactEmail: "",
    contactRole: "",
    contactNumber: "",
    website: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    logo: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user profile data from local storage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      const employerRegistrationData =
        JSON.parse(localStorage.getItem("EmployerRegistrationData")) || [];
      const user = employerRegistrationData.find(
        (user) => user.email === loggedInUser.email
      );
      if (user) {
        setProfileData({
          industry: user.industry || "",
          companySize: user.companySize || "",
          yearEstablished: user.yearEstablished || "",
          address: user.address || "",
          city: user.city || "",
          state: user.state || "",
          contactName: user.contactName || "",
          contactEmail: user.contactEmail || "",
          contactRole: user.contactRole || "",
          contactNumber: user.contactNumber || "",
          website: user.website || "",
          linkedin: user.linkedin || "",
          twitter: user.twitter || "",
          facebook: user.facebook || "",
          logo: user.logo || "", // Handle logo field
        });
      }
    }
  }, []);

  const handleSave = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const employerRegistrationData =
      JSON.parse(localStorage.getItem("EmployerRegistrationData")) || [];

    // Find the user and update profile data
    const updatedEmployerRegistrationData = employerRegistrationData.map(
      (user) =>
        user.email === loggedInUser.email ? { ...user, ...profileData } : user
    );
    localStorage.setItem(
      "EmployerRegistrationData",
      JSON.stringify(updatedEmployerRegistrationData)
    );

    setTimeout(() => navigate("/dashboard/employer"), 2000);
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          logo: reader.result, // Save logo as data URL
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <Card.Body>
              <h3>Company Information</h3>
              <Form.Group controlId="formLogo">
                <Form.Label>Company Logo</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleLogoChange} // Handle file upload
                />
                {profileData.logo && (
                  <img
                    src={profileData.logo}
                    alt="Company Logo"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginTop: "10px",
                    }}
                  />
                )}
              </Form.Group>
              {/* <Form.Group controlId="formCompanyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={profileData.companyName}
                  onChange={handleChange}
                  required
                />
              </Form.Group> */}
              <Form.Group controlId="formIndustry">
                <Form.Label>Industry</Form.Label>
                <Form.Control
                  as="select"
                  name="industry"
                  value={profileData.industry}
                  onChange={handleChange}
                >
                  <option value="">Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formCompanySize">
                <Form.Label>Company Size</Form.Label>
                <Form.Control
                  type="text"
                  name="companySize"
                  value={profileData.companySize}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formYearEstablished">
                <Form.Label>Year Established</Form.Label>
                <Form.Control
                  type="number"
                  name="yearEstablished"
                  value={profileData.yearEstablished}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={profileData.city}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={profileData.state}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={() => setStep(2)}
                className="mt-3"
              >
                Next
              </Button>
            </Card.Body>
          </Card>
        );
      case 2:
        return (
          <Card>
            <Card.Body>
              <h3>Contact Person</h3>
              <Form.Group controlId="formContactName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="contactName"
                  value={profileData.contactName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formContactEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="contactEmail"
                  value={profileData.contactEmail}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formContactRole">
                <Form.Label>Role/Designation</Form.Label>
                <Form.Control
                  type="text"
                  name="contactRole"
                  value={profileData.contactRole}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formContactNumber">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contactNumber"
                  value={profileData.contactNumber}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                variant="secondary"
                onClick={() => setStep(1)}
                className="mt-3 me-2"
              >
                Previous
              </Button>
              <Button
                variant="primary"
                onClick={() => setStep(3)}
                className="mt-3"
              >
                Next
              </Button>
            </Card.Body>
          </Card>
        );
      case 3:
        return (
          <Card>
            <Card.Body>
              <h3>Online Presence</h3>
              <Form.Group controlId="formWebsite">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="url"
                  name="website"
                  value={profileData.website}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formLinkedin">
                <Form.Label>LinkedIn</Form.Label>
                <Form.Control
                  type="url"
                  name="linkedin"
                  value={profileData.linkedin}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formTwitter">
                <Form.Label>Twitter</Form.Label>
                <Form.Control
                  type="url"
                  name="twitter"
                  value={profileData.twitter}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formFacebook">
                <Form.Label>Facebook</Form.Label>
                <Form.Control
                  type="url"
                  name="facebook"
                  value={profileData.facebook}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                variant="secondary"
                onClick={() => setStep(2)}
                className="mt-3 me-2"
              >
                Previous
              </Button>
              <Button variant="primary" onClick={handleSave} className="mt-3">
                Save
              </Button>
            </Card.Body>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <h2 className="my-4">Edit Profile</h2>
      {renderStepContent()}
    </Container>
  );
}

export default EmployerProfile;
