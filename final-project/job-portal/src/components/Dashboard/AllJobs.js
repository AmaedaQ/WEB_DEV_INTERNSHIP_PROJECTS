import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showEmployerModal, setShowEmployerModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const storedEmployers =
      JSON.parse(localStorage.getItem("employerRegistrationData")) || [];

    setJobs(storedJobs);
    setEmployers(storedEmployers);
  }, []);

  const handleShowEmployerDetails = (email) => {
    const employer = employers.find((emp) => emp.email === email);
    setSelectedEmployer(employer);
    setShowEmployerModal(true);
  };

  const handleShowJobDetails = (job) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const handleCloseEmployerModal = () => setShowEmployerModal(false);
  const handleCloseJobModal = () => setShowJobModal(false);

  const handleApply = (jobId) => {
    window.location.href = `/apply/${jobId}`;
  };

  const renderEmployerDetails = () => {
    if (!selectedEmployer) return <p>No details available.</p>;

    return (
      <div>
        <p>
          <strong>Company Name:</strong> {selectedEmployer.companyName}
        </p>
        <p>
          <strong>Company Website:</strong>{" "}
          <a
            href={selectedEmployer.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {selectedEmployer.website}
          </a>
        </p>
        <p>
          <strong>Industry:</strong>{" "}
          {selectedEmployer.industry || "Not available"}
        </p>
        <p>
          <strong>Company Size:</strong>{" "}
          {selectedEmployer.companySize || "Not available"}
        </p>
        <p>
          <strong>Year Established:</strong>{" "}
          {selectedEmployer.yearEstablished || "Not available"}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {selectedEmployer.address || "Not available"}
        </p>
        <p>
          <strong>City:</strong> {selectedEmployer.city || "Not available"}
        </p>
        <p>
          <strong>State:</strong> {selectedEmployer.state || "Not available"}
        </p>
        <p>
          <strong>Contact Person:</strong>{" "}
          {selectedEmployer.contactPersonName || "Not available"}
        </p>
        <p>
          <strong>Contact Email:</strong>{" "}
          {selectedEmployer.contactPersonEmail || "Not available"}
        </p>
        <p>
          <strong>Contact Number:</strong>{" "}
          {selectedEmployer.contactPersonNumber || "Not available"}
        </p>
      </div>
    );
  };

  const renderJobDetails = () => {
    if (!selectedJob) return <p>No details available.</p>;

    return (
      <div>
        <p>
          <strong>Job Title:</strong> {selectedJob.jobTitle}
        </p>
        <p>
          <strong>Category:</strong> {selectedJob.category}
        </p>
        <p>
          <strong>Job Type:</strong> {selectedJob.jobType}
        </p>
        <p>
          <strong>Location:</strong> {selectedJob.location}
        </p>
        <p>
          <strong>Description:</strong> {selectedJob.description}
        </p>
        <p>
          <strong>Requirements:</strong> {selectedJob.requirements}
        </p>
        <p>
          <strong>Salary:</strong> ${selectedJob.salary}
        </p>
        <p>
          <strong>Last Date to Apply:</strong> {selectedJob.lastDateToApply}
        </p>
        <p>
          <strong>Posted By:</strong> {selectedJob.postedBy}
        </p>
      </div>
    );
  };

  // Filtering jobs based on search term, category, type, and experience
  const filteredJobs = jobs.filter((job) => {
    const matchesSearchTerm =
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || job.category === categoryFilter;

    const matchesType = typeFilter === "All" || job.jobType === typeFilter;

    const matchesExperience =
      experienceFilter === "All" || job.experienceLevel === experienceFilter;

    return (
      matchesSearchTerm && matchesCategory && matchesType && matchesExperience
    );
  });

  return (
    <Container className="mt-5 text-center">
      <h2 className="mb-4 text-center text-primary">All Job Listings</h2>

      {/* Search Bar and Filters */}
      <Row className="mb-4">
        <Col md={6} sm={12} className="mb-3 mb-md-0">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search by job title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={2} sm={6} className="mb-3 mb-md-0">
          <Form.Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
          </Form.Select>
        </Col>
        <Col md={2} sm={6} className="mb-3 mb-md-0">
          <Form.Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </Form.Select>
        </Col>
        <Col md={2} sm={12}>
          <Form.Select
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
          >
            <option value="All">All Experience Levels</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Job Listings */}
      <Row>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Col md={6} sm={12} key={job.id} className="mb-4">
              <Card
                style={{
                  border: "1px solid #ddd", // Light gray border
                  borderRadius: "0.25rem", // Rounded corners
                  padding: "1rem", // Padding inside the card
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Light shadow
                }}
              >
                <Card.Body>
                  <Card.Title style={{ color: "#007bff" }}>
                    {job.jobTitle}
                  </Card.Title>
                  <Card.Subtitle className="mb-3 text-muted">
                    <Badge bg="secondary" className="me-1">
                      {job.category}
                    </Badge>
                    <Badge bg="success" className="me-1">
                      {job.jobType}
                    </Badge>
                    <Badge bg="warning" text="dark">
                      {job.experienceLevel}
                    </Badge>
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Location:</strong> {job.location}
                    <br />
                    <strong>Last Date to Apply:</strong> {job.lastDateToApply}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="outline-primary"
                      onClick={() => handleApply(job.id)}
                      size="sm"
                      style={{ fontSize: "0.75rem" }} // Adjust the font size here
                    >
                      Apply Now
                    </Button>
                    <Button
                      className="ms-2"
                      variant="outline-info"
                      onClick={() => handleShowJobDetails(job)}
                      size="sm"
                      style={{ fontSize: "0.75rem" }} // Adjust the font size here
                    >
                      View Details
                    </Button>
                    <Button
                      className="ms-2"
                      variant="outline-dark"
                      onClick={() => handleShowEmployerDetails(job.postedBy)}
                      size="sm"
                      style={{ fontSize: "0.75rem" }} // Adjust the font size here
                    >
                      View Employer
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No jobs found.</p>
        )}
      </Row>

      {/* Employer Details Modal */}
      <Modal show={showEmployerModal} onHide={handleCloseEmployerModal}>
        <Modal.Header closeButton>
          <Modal.Title>Employer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderEmployerDetails()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEmployerModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Job Details Modal */}
      <Modal show={showJobModal} onHide={handleCloseJobModal}>
        <Modal.Header closeButton>
          <Modal.Title>Job Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderJobDetails()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseJobModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AllJobs;
