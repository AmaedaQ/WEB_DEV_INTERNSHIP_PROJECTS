import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import { FaEnvelope, FaLock, FaUserTie } from "react-icons/fa";
import "./EmployerLogin.css"; // Custom styles

function EmployerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users =
      JSON.parse(localStorage.getItem("employerRegistrationData")) || [];
    const user = users.find(
      (user) =>
        user.email === email &&
        user.password === password &&
        user.role === "employer"
    );

    if (user) {
      // Store authentication token or user info if needed
      localStorage.setItem("auth", JSON.stringify({ role: "employer", email }));
      setSuccess("Login successful");
      setTimeout(() => navigate("/dashboard/employer"), 2000);
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 px-4">
      <div
        className="p-4 shadow-sm border rounded bg-white animate__animated animate__fadeIn"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="text-center mb-4">
          <FaUserTie size={50} />
          <h2 className="mt-3">Employer Login</h2>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <div className="input-icon">
              <FaEnvelope />
              <Form.Control
                type="email"
                placeholder="e.g., employer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <div className="input-icon">
              <FaLock />
              <Form.Control
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Login
          </Button>
        </Form>
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <a href="/register/employer" className="btn-link">
            Register here
          </a>
        </p>
      </div>
    </Container>
  );
}

export default EmployerLogin;
