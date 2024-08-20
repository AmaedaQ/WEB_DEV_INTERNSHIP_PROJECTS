import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function JobSeekerRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
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
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    if (!/^\d{10}$/.test(contactNo)) {
      return "Contact number must be exactly 10 digits.";
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

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
      id: Date.now(), // Unique ID for each user
      role: "job_seeker",
      name,
      email,
      password,
      city,
      state,
      address,
      contactNo,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setSuccess("Registration successful");
    setTimeout(() => navigate("/login/job-seeker"), 2000);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "100%", maxWidth: "500px" }} className="p-4">
        <Card.Body>
          <h2 className="text-center mb-4">Job Seeker Registration</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleRegistration}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="e.g., johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
                title="Password must be at least 6 characters long"
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., San Francisco"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., California"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="e.g., 1234 Market St, Suite 567"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formContactNo">
              <Form.Label>Contact No</Form.Label>
              <Form.Control
                type="tel"
                placeholder="e.g., 1234567890"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                required
                pattern="\d{10}"
                title="Contact number must be exactly 10 digits"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Register
            </Button>
          </Form>
          <p className="text-center mt-3">
            Already have an account? <a href="/login/job-seeker">Login here</a>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default JobSeekerRegistration;
