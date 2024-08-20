import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("All");
  const [salaryRange, setSalaryRange] = useState("All");
  const [experienceLevel, setExperienceLevel] = useState("All");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({
      keyword,
      location,
      jobType,
      salaryRange,
      experienceLevel,
    });
  };

  return (
    <Form onSubmit={handleSearch}>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by keywords"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="All">Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Select
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
          >
            <option value="All">Salary Range</option>
            <option value="0-50000">$0 - $50,000</option>
            <option value="50000-100000">$50,000 - $100,000</option>
            <option value="100000+">$100,000+</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            <option value="All">Experience Level</option>
            <option value="Entry">Entry Level</option>
            <option value="Mid">Mid Level</option>
            <option value="Senior">Senior Level</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Button type="submit" variant="primary" className="w-100">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBar;
