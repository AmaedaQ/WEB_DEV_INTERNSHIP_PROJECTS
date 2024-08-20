import React, { useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Carousel,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import {
  FaLaptopCode,
  FaBullhorn,
  FaMoneyBillWave,
  FaHeartbeat,
  FaChalkboardTeacher,
  FaCog,
  FaPaintBrush,
  FaUserTie,
  FaUser,
} from "react-icons/fa";
import "./Homepage.css"; // Custom styles

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [jobsAvailable, setJobsAvailable] = useState(false); // Simulate no jobs available

  const categories = [
    { name: "Technology", icon: <FaLaptopCode size={40} /> },
    { name: "Marketing", icon: <FaBullhorn size={40} /> },
    { name: "Finance", icon: <FaMoneyBillWave size={40} /> },
    { name: "Healthcare", icon: <FaHeartbeat size={40} /> },
    { name: "Education", icon: <FaChalkboardTeacher size={40} /> },
    { name: "Engineering", icon: <FaCog size={40} /> },
    { name: "Design", icon: <FaPaintBrush size={40} /> },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setJobsAvailable(false); // Simulating no jobs for now
  };

  return (
    <>
      {/* Hero Section */}
      <header className="hero-section">
        <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
          <h1 className="display-4 text-white animate__animated animate__fadeIn">
            Find Your Dream Job or Top Talent
          </h1>
          <p className="lead text-white mb-4 animate__animated animate__fadeIn animate__delay-1s">
            Connect with leading employers and job seekers with ease.
          </p>
          <Button href="/" variant="light" className="btn-lg">
            Get Started
          </Button>
        </Container>
      </header>

      {/* Categories Carousel */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Explore Job Categories</h2>
        <Carousel className="shadow-sm">
          {categories.map((category) => (
            <Carousel.Item key={category.name}>
              <Card
                className="border-0 shadow-sm text-center p-5"
                onClick={() => handleCategoryClick(category.name)}
              >
                <Card.Body>
                  {category.icon}
                  <Card.Title className="mt-3">{category.name}</Card.Title>
                  <Card.Text>
                    Discover exciting job opportunities in {category.name}.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>

        {selectedCategory && (
          <Alert variant="info" className="text-center mt-4">
            You selected: <strong>{selectedCategory}</strong>
            {jobsAvailable ? (
              <p>Showing jobs for {selectedCategory}.</p>
            ) : (
              <p>No jobs available for {selectedCategory} at the moment.</p>
            )}
          </Alert>
        )}
      </Container>

      {/* Employer and Job Seeker Cards */}
      <Container className="my-5">
        <Row className="text-center">
          <Col md={6} className="mb-4">
            <Card className="shadow-sm p-4">
              <Card.Body>
                <FaUser size={50} />
                <Card.Title className="mt-3">Job Seekers</Card.Title>
                <Card.Text>
                  Find the perfect job and manage your applications with ease.
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    href="/login/job-seeker"
                    className="mx-2"
                  >
                    <FaUser /> Login
                  </Button>
                  <Button
                    variant="secondary"
                    href="/register/job-seeker"
                    className="mx-2"
                  >
                    <FaUser /> Register
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="shadow-sm p-4">
              <Card.Body>
                <FaUserTie size={50} />
                <Card.Title className="mt-3">Employers</Card.Title>
                <Card.Text>
                  Post job listings and discover top talent for your company.
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    href="/login/employer"
                    className="mx-2"
                  >
                    <FaUserTie /> Login
                  </Button>
                  <Button
                    variant="secondary"
                    href="/register/employer"
                    className="mx-2"
                  >
                    <FaUserTie /> Register
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Why Use Us Section */}
      <Container className="my-5 text-center">
        <h2>Why Choose Us?</h2>
        <p className="lead">
          We provide a user-friendly platform for job seekers and employers to
          connect seamlessly. Our advanced search features and personalized
          recommendations ensure you find exactly what you're looking for.
        </p>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <Container>
          <p>
            &copy; {new Date().getFullYear()} Job Board Platform. All rights
            reserved.
          </p>
          <p>
            <a href="/privacy" className="text-white">
              Privacy Policy
            </a>{" "}
            |
            <a href="/terms" className="text-white">
              {" "}
              Terms of Service
            </a>
          </p>
        </Container>
      </footer>
    </>
  );
}

export default HomePage;
