import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  useLocation as useRouterLocation,
  useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faMapMarkerAlt,
  faDollarSign,
  faCalendarAlt,
  faTag,
  faUserAlt,
  faFileAlt,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

function PostJob() {
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [category, setCategory] = useState("");
  const [lastDateToApply, setLastDateToApply] = useState("");
  const [requirements, setRequirements] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const location = useRouterLocation();
  const navigate = useNavigate();
  const jobId = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    if (jobId) {
      const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
      const job = storedJobs.find((job) => job.id === parseInt(jobId));
      if (job) {
        setJobTitle(job.jobTitle);
        setDescription(job.description);
        setJobLocation(job.location);
        setSalary(job.salary);
        setJobType(job.jobType);
        setExperienceLevel(job.experienceLevel);
        setCategory(job.category);
        setLastDateToApply(job.lastDateToApply);
        setRequirements(job.requirements);
      }
    }
  }, [jobId]);

  const validateForm = () => {
    if (
      !jobTitle ||
      !description ||
      !jobLocation ||
      !salary ||
      !jobType ||
      !experienceLevel ||
      !category ||
      !lastDateToApply ||
      !requirements
    ) {
      setError("Please fill in all fields.");
      return false;
    }
    setError("");
    return true;
  };

  const updateJobsInLocalStorage = (job) => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    if (jobId) {
      const updatedJobs = storedJobs.map((j) =>
        j.id === parseInt(jobId) ? { ...j, ...job } : j
      );
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    } else {
      storedJobs.push(job);
      localStorage.setItem("jobs", JSON.stringify(storedJobs));
    }
  };

  const handlePostJob = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const timestamp = new Date().toISOString();
    const job = {
      id: jobId ? parseInt(jobId) : Date.now(),
      jobTitle,
      description,
      location: jobLocation,
      salary,
      jobType,
      experienceLevel,
      category,
      lastDateToApply,
      requirements,
      timestamp,
      postedBy: JSON.parse(localStorage.getItem("auth")).email,
    };

    updateJobsInLocalStorage(job);

    setSuccess("Job posted successfully.");
    setTimeout(() => {
      setSuccess("");
      navigate("/dashboard/employer");
    }, 3000);
  };

  const formFieldStyle = {
    width: "160%",
    marginBottom: "15px",
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "100%", maxWidth: "800px", padding: "10px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">
            {jobId ? "Edit Job" : "Post a Job"}
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handlePostJob}>
            <Form.Group controlId="formJobTitle">
              <Form.Label>
                <FontAwesomeIcon icon={faBriefcase} /> Job Title
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Software Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
                style={formFieldStyle}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>
                <FontAwesomeIcon icon={faFileAlt} /> Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Job description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={formFieldStyle}
              />
            </Form.Group>

            <Form.Group controlId="formLocation">
              <Form.Label>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Location
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., New York, NY"
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
                required
                style={formFieldStyle}
              />
            </Form.Group>

            <Form.Group controlId="formSalary">
              <Form.Label>
                <FontAwesomeIcon icon={faDollarSign} /> Salary
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., $60,000 - $80,000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
                style={formFieldStyle}
              />
            </Form.Group>

            <Form.Group controlId="formJobType">
              <Form.Label>
                <FontAwesomeIcon icon={faTag} /> Job Type
              </Form.Label>
              <Form.Control
                as="select"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                required
                style={formFieldStyle}
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formExperienceLevel">
              <Form.Label>
                <FontAwesomeIcon icon={faUserAlt} /> Experience Level
              </Form.Label>
              <Form.Control
                as="select"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                required
                style={formFieldStyle}
              >
                <option value="">Select Experience Level</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label>
                <FontAwesomeIcon icon={faTag} /> Category
              </Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                style={formFieldStyle}
              >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formLastDateToApply">
              <Form.Label>
                <FontAwesomeIcon icon={faCalendarAlt} /> Last Date to Apply
              </Form.Label>
              <Form.Control
                type="date"
                value={lastDateToApply}
                onChange={(e) => setLastDateToApply(e.target.value)}
                required
                style={formFieldStyle}
              />
            </Form.Group>

            <Form.Group controlId="formRequirements">
              <Form.Label>
                <FontAwesomeIcon icon={faExclamationCircle} /> Requirements
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="e.g., 3+ years experience, Bachelor’s degree in Computer Science"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                required
                style={formFieldStyle}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", marginTop: "20px" }}
            >
              {jobId ? "Update Job" : "Post Job"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PostJob;
