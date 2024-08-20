import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EmployerRegistration.css"; // Import custom styles

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
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card
        style={{ width: "100%", maxWidth: "600px" }}
        className="p-4 shadow-sm border-0"
      >
        <Card.Body>
          <h2 className="text-center mb-4">Employer Registration</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleRegistration}>
            <Form.Group controlId="formCompanyName">
              <Form.Label>
                <i className="fas fa-building"></i> Company Name
              </Form.Label>
              <Form.Control
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>
                <i className="fas fa-envelope"></i> Email Address
              </Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>
                <i className="fas fa-lock"></i> Password
              </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
                title="Password must be at least 6 characters long"
              />
            </Form.Group>

            <Form.Group controlId="formCompanySize">
              <Form.Label>
                <i className="fas fa-users"></i> Company Size
              </Form.Label>
              <Form.Control
                type="text"
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formIndustry">
              <Form.Label>
                <i className="fas fa-industry"></i> Industry
              </Form.Label>
              <Form.Control
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formYearEstablished">
              <Form.Label>
                <i className="fas fa-calendar-alt"></i> Year Established
              </Form.Label>
              <Form.Control
                type="number"
                value={yearEstablished}
                onChange={(e) => setYearEstablished(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label>
                <i className="fas fa-city"></i> City
              </Form.Label>
              <Form.Control
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formState">
              <Form.Label>
                <i className="fas fa-map-marker-alt"></i> State
              </Form.Label>
              <Form.Control
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>
                <i className="fas fa-address-card"></i> Address
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formWebsite">
              <Form.Label>
                <i className="fas fa-globe"></i> Company Website
              </Form.Label>
              <Form.Control
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formContactPersonName">
              <Form.Label>
                <i className="fas fa-user"></i> Contact Person Name
              </Form.Label>
              <Form.Control
                type="text"
                value={contactPersonName}
                onChange={(e) => setContactPersonName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formContactPersonEmail">
              <Form.Label>
                <i className="fas fa-envelope"></i> Contact Person Email
              </Form.Label>
              <Form.Control
                type="email"
                value={contactPersonEmail}
                onChange={(e) => setContactPersonEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formContactPersonRole">
              <Form.Label>
                <i className="fas fa-briefcase"></i> Contact Person
                Role/Designation
              </Form.Label>
              <Form.Control
                type="text"
                value={contactPersonRole}
                onChange={(e) => setContactPersonRole(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formContactPersonPhone">
              <Form.Label>
                <i className="fas fa-phone"></i> Contact Person Phone
              </Form.Label>
              <Form.Control
                type="tel"
                value={contactPersonPhone}
                onChange={(e) => setContactPersonPhone(e.target.value)}
                required
              />
            </Form.Group>

            {/* Social Media Links */}
            <Form.Group controlId="formLinkedin">
              <Form.Label>
                <i className="fab fa-linkedin"></i> LinkedIn Profile
              </Form.Label>
              <Form.Control
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formTwitter">
              <Form.Label>
                <i className="fab fa-twitter"></i> Twitter Profile
              </Form.Label>
              <Form.Control
                type="url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFacebook">
              <Form.Label>
                <i className="fab fa-facebook"></i> Facebook Profile
              </Form.Label>
              <Form.Control
                type="url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Register
            </Button>
          </Form>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <a href="/login/employer" className="btn-link">
              Login here
            </a>
            .
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EmployerRegistration;
