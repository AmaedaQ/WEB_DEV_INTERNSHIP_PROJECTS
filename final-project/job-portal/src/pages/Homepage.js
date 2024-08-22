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
  FaRobot,
  FaDatabase,
  FaChartLine,
  FaClipboardList,
  FaChartPie,
  FaBalanceScale,
  FaStethoscope,
  FaUserNurse,
  FaBookOpen,
  FaGraduationCap,
  FaDraftingCompass,
  FaWrench,
  FaPencilRuler,
  FaPalette,
  FaUser,
  FaUserTie,
} from "react-icons/fa";
import "./Homepage.css"; // Custom styles

function HomePage() {
  // eslint-disable-next-line no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [jobsAvailable, setJobsAvailable] = useState(false); // Simulate no jobs available

  const categories = [
    {
      name: "Technology",
      miniCards: [
        {
          icon: <FaLaptopCode size={30} />,
          title: "Software Development",
          description: "Build innovative applications and solutions.",
        },
        {
          icon: <FaRobot size={30} />,
          title: "AI & Automation",
          description: "Leverage AI and automation for next-gen technology.",
        },
        {
          icon: <FaDatabase size={30} />,
          title: "Data Science",
          description: "Transform data into actionable insights.",
        },
      ],
    },
    {
      name: "Marketing",
      miniCards: [
        {
          icon: <FaBullhorn size={30} />,
          title: "Digital Marketing",
          description: "Enhance your brand's visibility online.",
        },
        {
          icon: <FaChartLine size={30} />,
          title: "Market Research",
          description: "Analyze market trends and consumer behavior.",
        },
        {
          icon: <FaClipboardList size={30} />,
          title: "Content Strategy",
          description: "Create compelling content that drives engagement.",
        },
      ],
    },
    {
      name: "Finance",
      miniCards: [
        {
          icon: <FaMoneyBillWave size={30} />,
          title: "Financial Planning",
          description: "Strategically manage finances for growth.",
        },
        {
          icon: <FaChartPie size={30} />,
          title: "Corporate Finance",
          description: "Optimize financial strategies for businesses.",
        },
        {
          icon: <FaBalanceScale size={30} />,
          title: "Risk Management",
          description: "Mitigate risks with expert strategies.",
        },
      ],
    },
    {
      name: "Healthcare",
      miniCards: [
        {
          icon: <FaHeartbeat size={30} />,
          title: "Patient Care",
          description: "Provide top-notch care and support to patients.",
        },
        {
          icon: <FaStethoscope size={30} />,
          title: "Medical Research",
          description: "Advance medical science with innovative research.",
        },
        {
          icon: <FaUserNurse size={30} />,
          title: "Nursing",
          description: "Deliver compassionate nursing care to those in need.",
        },
      ],
    },
    {
      name: "Education",
      miniCards: [
        {
          icon: <FaChalkboardTeacher size={30} />,
          title: "Teaching",
          description: "Inspire and educate the next generation.",
        },
        {
          icon: <FaGraduationCap size={30} />,
          title: "Academic Research",
          description: "Contribute to educational research and development.",
        },
        {
          icon: <FaBookOpen size={30} />,
          title: "Curriculum Development",
          description: "Design effective educational programs.",
        },
      ],
    },
    {
      name: "Engineering",
      miniCards: [
        {
          icon: <FaCog size={30} />,
          title: "Mechanical Engineering",
          description: "Innovate and design mechanical systems.",
        },
        {
          icon: <FaDraftingCompass size={30} />,
          title: "Civil Engineering",
          description: "Create and improve infrastructure.",
        },
        {
          icon: <FaWrench size={30} />,
          title: "Maintenance Engineering",
          description: "Ensure systems and machinery are well-maintained.",
        },
      ],
    },
    {
      name: "Design",
      miniCards: [
        {
          icon: <FaPaintBrush size={30} />,
          title: "Graphic Design",
          description: "Craft visually appealing graphics and visuals.",
        },
        {
          icon: <FaPalette size={30} />,
          title: "UX/UI Design",
          description: "Enhance user experiences with intuitive design.",
        },
        {
          icon: <FaPencilRuler size={30} />,
          title: "Product Design",
          description: "Create innovative and user-centered product designs.",
        },
      ],
    },
  ];

  // const handleCategoryClick = (category) => {
  //   setSelectedCategory(category);
  //   setJobsAvailable(false); // Simulating no jobs for now
  // };

  return (
    <>
      {/* Hero Section */}
      <header className="hero-section">
        <Container className="text-center">
          <h1 className="display-4 font-weight-bold mb-4 animate__animated animate__fadeIn">
            Discover Your Future Career or Top Talent
          </h1>
          <p className="lead mb-4 animate__animated animate__fadeIn animate__delay-1s">
            Connect with leading employers and job seekers effortlessly and find
            the perfect match for your needs.
          </p>
          <Button
            href="/"
            variant="outline-light"
            className="btn-lg rounded-pill shadow"
          >
            Get Started
          </Button>
        </Container>
      </header>

      {/* Categories Carousel */}
      <Container className="my-5">
        <h2 className="text-center mb-4 category-title">
          Explore Our Categories
        </h2>
        <Carousel className="shadow-lg">
          {categories.map((category) => (
            <Carousel.Item key={category.name}>
              <Card className="border-0 bg-light rounded shadow-sm">
                <Card.Body>
                  <h3 className="carousel-heading mb-4">{category.name}</h3>
                  <Row>
                    {category.miniCards.map((miniCard, index) => (
                      <Col key={index} md={4} className="mb-4">
                        <Card className="mini-card border-0 rounded-lg shadow-sm">
                          <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                            <div className="icon-circle mb-3">
                              {miniCard.icon}
                            </div>
                            <Card.Title className="mb-2 font-weight-bold">
                              {miniCard.title}
                            </Card.Title>
                            <Card.Text>{miniCard.description}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
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
            <Card className="shadow-lg rounded-lg">
              <Card.Body>
                <FaUser className="icon-blue" size={60} />
                <Card.Title className="mt-3 font-weight-bold">
                  Job Seekers
                </Card.Title>
                <Card.Text>
                  Find and apply for jobs that match your skills and career
                  goals. Manage applications efficiently and take the next step
                  in your career.
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    href="/login/job-seeker"
                    className="mx-2 rounded-pill shadow"
                  >
                    <FaUser /> Login
                  </Button>
                  <Button
                    variant="secondary"
                    href="/register/job-seeker"
                    className="mx-2 rounded-pill shadow"
                  >
                    <FaUser /> Register
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="shadow-lg rounded-lg">
              <Card.Body>
                <FaUserTie className="icon-blue" size={60} />
                <Card.Title className="mt-3 font-weight-bold">
                  Employers
                </Card.Title>
                <Card.Text>
                  Post job listings and find top talent that aligns with your
                  company's needs. Manage your job postings and view
                  applications seamlessly.
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    href="/login/employer"
                    className="mx-2 rounded-pill shadow"
                  >
                    <FaUserTie /> Login
                  </Button>
                  <Button
                    variant="secondary"
                    href="/register/employer"
                    className="mx-2 rounded-pill shadow"
                  >
                    <FaUserTie /> Register
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="footer py-4 bg-dark text-white text-center">
        <Container>
          <p>&copy; 2024 JobBoard. All rights reserved.</p>
        </Container>
      </footer>
    </>
  );
}

export default HomePage;
