import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function JobSeekerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) =>
        user.email === email &&
        user.password === password &&
        user.role === "job_seeker"
    );

    if (user) {
      localStorage.setItem(
        "auth",
        JSON.stringify({ role: "job_seeker", email, userId: user.id })
      );
      setSuccess("Login successful");
      setTimeout(() => navigate("/dashboard/job-seeker"), 2000);
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "100%", maxWidth: "500px" }} className="p-4">
        <Card.Body>
          <h2 className="text-center mb-4">Job Seeker Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="e.g., jobseeker@example.com"
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
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>
          </Form>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <a href="/register/job-seeker">Register here</a>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default JobSeekerLogin;
