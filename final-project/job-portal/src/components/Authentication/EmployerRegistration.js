import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBuilding,
  FaEnvelope,
  FaLock,
  FaUsers,
  FaIndustry,
  FaCalendarAlt,
  FaCity,
  FaMapMarkerAlt,
  FaAddressCard,
  FaGlobe,
  FaUser,
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaBriefcase,
} from "react-icons/fa";

function EmployerRegistration() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [industry, setIndustry] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonEmail, setContactPersonEmail] = useState("");
  const [contactPersonRole, setContactPersonRole] = useState("");
  const [contactPersonPhone, setContactPersonPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.includes("@")) {
      return "Invalid email address.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return "";
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    const users =
      JSON.parse(localStorage.getItem("employerRegistrationData")) || [];

    const newUser = {
      id: Date.now(),
      role: "employer",
      companyName,
      email,
      password,
      city,
      state,
      address,
      website,
      companySize,
      industry,
      yearEstablished,
      contactPersonName,
      contactPersonEmail,
      contactPersonRole,
      contactPersonPhone,
      linkedin,
      twitter,
      facebook,
    };
    users.push(newUser);
    localStorage.setItem("employerRegistrationData", JSON.stringify(users));
    setSuccess("Registration successful");
    setTimeout(() => navigate("/login/employer"), 2000);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center min-vh-100 px-4"
      style={{ padding: "0 1rem" }} // Added inline style for padding
    >
      <div
        className="p-4 shadow-sm border rounded bg-white"
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "2.5rem", // Increased padding for the card
        }}
      >
        <h2 className="text-center mb-4">Employer Registration</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleRegistration}>
          <Form.Group
            controlId="formCompanyName"
            style={{ marginBottom: "1.5rem" }}
          >
            <Form.Label style={{ fontSize: "1rem" }}>
              <FaBuilding /> Company Name
            </Form.Label>
            <Form.Control
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              style={{
                height: "50px",
                fontSize: "1.1rem",
                paddingLeft: "3rem",
              }} // Applied styles
            />
          </Form.Group>

          <Form.Group controlId="formEmail" style={{ marginBottom: "1.5rem" }}>
            <Form.Label style={{ fontSize: "1rem" }}>
              <FaEnvelope /> Email Address
            </Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                height: "50px",
                fontSize: "1.1rem",
                paddingLeft: "3rem",
              }} // Applied styles
            />
          </Form.Group>

          <Form.Group
            controlId="formPassword"
            style={{ marginBottom: "1.5rem" }}
          >
            <Form.Label style={{ fontSize: "1rem" }}>
              <FaLock /> Password
            </Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              title="Password must be at least 6 characters long"
              style={{
                height: "50px",
                fontSize: "1.1rem",
                paddingLeft: "3rem",
              }} // Applied styles
            />
          </Form.Group>

          <Form.Group
            controlId="formCompanySize"
            style={{ marginBottom: "1.5rem" }}
          >
            <Form.Label style={{ fontSize: "1rem" }}>
              <FaUsers /> Company Size
            </Form.Label>
            <Form.Control
              type="text"
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              required
              style={{
                height: "50px",
                fontSize: "1.1rem",
                paddingLeft: "3rem",
              }} // Applied styles
            />
          </Form.Group>

          <Form.Group
            controlId="formIndustry"
            style={{ marginBottom: "1.5rem" }}
          >
            <Form.Label style={{ fontSize: "1rem" }}>
              <FaIndustry /> Industry
            </Form.Label>
            <Form.Control
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
              style={{
                height: "50px",
                fontSize: "1.1rem",
                paddingLeft: "3rem",
              }} // Applied styles
            />
          </Form.Group>

          <Form.Group
            controlId="formYearEstablished"
            style={{ marginBottom: "1.5rem" }}
          >
            <Form.Label style={{ fontSize: "1rem" }}>
              <FaCalendarAlt /> Year Established
            </Form.Label>
            <Form.Control
              type="number"
              value={yearEstablished}
              onChange={(e) => setYearEstablished(e.target.value)}
              required
              style={{
                height: "50px",
                fontSize: "1.1rem",
                paddingLeft: "3rem",
              }} // Applied styles
            />
          </Form.Group>

          <Form.Group controlId="formCity" style={{ marginBottom: "1.5rem" }}>
            <Form.Label style={{ fontSize: "1rem" }}>
              <FaCity /> City
            </Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              style={{
                height: "50px",
                fontSize: "1.1rem",
                paddingLeft: "3rem",
              }} // Applied styles
            />
          </Form.Group>

          <Form.Group controlId="formState" style={{ marginBottom: "1.5rem" }}>
            <Form.Label style={{ fontSize: "1rem" }}>
              <FaMapMarkerAlt /> State
            </Form.Label>
            <Form.Control
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              style={{
                height: "50px",
                fontSize: "1.1rem",
                paddingLeft: "3rem",
              }} // Applied styles
            />
          </Form.Group>

          <Form.Group
            controlId="formAddress"
            style={{ marginBottom: "1.5rem" }}
          >
            <Form.Label style={{ fontSize: "1rem" }}>
              <FaAddressCard /> Address
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={{
                height: "auto",
                fontSize: "1.1rem",
                paddingLeft: "3rem",
              }} // Applied styles
            />
          </Form.Group>

          <Form.Group
            controlId="formWebsite"
            style={{ marginBottom: "1.5rem" }}
          >
            <Form.Label style={{ fontSize: "1rem" }}>
              <FaGlobe /> Company Website
            </Form.Label>
            <Form.Control
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
              style={{
                height: "50px",
                fontSize: "1.1rem",
                paddingLeft: "3rem",
              }} // Applied styles
            />
          </Form.Group>

          <Form.Group
            controlId="formContactPersonName"
            style={{ marginBottom: "1.5rem" }}
          >
            <Form.Label style={{ fontSize: "1rem" }}>
              <FaUser /> Contact Person Name
            </Form.Label>
            <Form.Control
              type="text"
              value={contactPersonName}
              onChange={(e) => setContactPersonName(e.target.value)}
              required
              style={{
                height: "50px",
                fontSize: "1.1rem",
                paddingLeft: "3rem",
              }} // Applied styles
            />
          </Form.Group>

          <Form.Group
            controlId="formContactPersonEmail"
            style={{ marginBottom: "1.5rem" }}
          >
            <Form.Label style={{ fontSize: "1rem" }}>
              <FaEnvelope /> Contact Person Email
            </Form.Label>
            <Form.Control
              type="email"
              value={contactPersonEmail}
              onChange={(e) => setContactPersonEmail(e.target.value)}
              required
              style={{
                height: "50px",
                fontSize: "1.1rem",
                paddingLeft: "3rem",
              }} // Applied styles
            />
          </Form.Group>

          <Form.Group
            controlId="formContactPersonRole"
            style={{ marginBottom: "1.5rem" }}
          >
            <Form.Label style={{ fontSize: "1rem" }}>
              <FaBriefcase /> Contact Person Role
            </Form.Label>
            <Form.Control
              type="text"
              value={contactPersonRole}
              onChange={(e) => setContactPersonRole(e.target.value)}
              required
              style={{
                height: "50px",
                fontSize: "1.1rem",
                paddingLeft: "3rem",
              }} // Applied styles
            />
          </Form.Group>

          <Form.Group
            controlId="formContactPersonPhone"
            style={{ marginBottom: "1.5rem" }}
          >
            <Form.Label style={{ fontSize: "1rem" }}>
              <FaPhone /> Contact Person Phone
            </Form.Label>
            <Form.Control
              type="tel"
              value={contactPersonPhone}
              onChange={(e) => setContactPersonPhone(e.target.value)}
              required
              style={{
                height: "50px",
                fontSize: "1.1rem",
                paddingLeft: "3rem",
              }} // Applied styles
            />
          </Form.Group>

          <Form.Group
            controlId="formLinkedin"
            style={{ marginBottom: "1.5rem" }}
          >
            <Form.Label style={{ fontSize: "1rem" }}>
              <FaLinkedin /> LinkedIn Profile
            </Form.Label>
            <Form.Control
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              style={{
                height: "50px",
                fontSize: "1.1rem",
                paddingLeft: "3rem",
              }} // Applied styles
            />
          </Form.Group>

          <Form.Group
            controlId="formTwitter"
            style={{ marginBottom: "1.5rem" }}
          >
            <Form.Label style={{ fontSize: "1rem" }}>
              <FaTwitter /> Twitter Profile
            </Form.Label>
            <Form.Control
              type="url"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              style={{
                height: "50px",
                fontSize: "1.1rem",
                paddingLeft: "3rem",
              }} // Applied styles
            />
          </Form.Group>

          <Form.Group
            controlId="formFacebook"
            style={{ marginBottom: "1.5rem" }}
          >
            <Form.Label style={{ fontSize: "1rem" }}>
              <FaFacebook /> Facebook Profile
            </Form.Label>
            <Form.Control
              type="url"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              style={{
                height: "50px",
                fontSize: "1.1rem",
                paddingLeft: "3rem",
              }} // Applied styles
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            style={{ width: "100%", height: "50px", fontSize: "1.2rem" }} // Applied styles
          >
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default EmployerRegistration;
