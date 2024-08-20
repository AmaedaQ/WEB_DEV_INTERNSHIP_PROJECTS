import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaIndustry,
  FaUsers,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaGlobe,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaUser,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [logo, setLogo] = useState("/profile.png");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonEmail, setContactPersonEmail] = useState("");
  const [contactPersonRole, setContactPersonRole] = useState("");
  const [contactPersonNumber, setContactPersonNumber] = useState("");

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const userProfile =
      JSON.parse(localStorage.getItem("employerRegistrationData")) || [];
    const currentUser = userProfile.find((user) => user.email === auth.email);

    if (currentUser) {
      setLogo(currentUser.logo || "/profile.png");
      setCompanyName(currentUser.companyName || "N/A");
      setIndustry(currentUser.industry || "N/A");
      setCompanySize(currentUser.companySize || "N/A");
      setYearEstablished(currentUser.yearEstablished || "N/A");
      setAddress(currentUser.address || "N/A");
      setCity(currentUser.city || "N/A");
      setState(currentUser.state || "N/A");
      setWebsite(currentUser.website || "N/A");
      setLinkedin(currentUser.linkedin || "N/A");
      setTwitter(currentUser.twitter || "N/A");
      setFacebook(currentUser.facebook || "N/A");
      setContactPersonName(currentUser.contactPersonName || "N/A");
      setContactPersonEmail(currentUser.contactPersonEmail || "N/A");
      setContactPersonRole(currentUser.contactPersonRole || "N/A");
      setContactPersonNumber(currentUser.contactPersonNumber || "N/A");
    }
  }, []);

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = () => {
    const updatedProfile = {
      companyName,
      industry,
      companySize,
      yearEstablished,
      address,
      city,
      state,
      website,
      linkedin,
      twitter,
      facebook,
      contactPersonName,
      contactPersonEmail,
      contactPersonRole,
      contactPersonNumber,
      logo, // Assuming logo can be updated as a URL or base64
    };

    let userProfile =
      JSON.parse(localStorage.getItem("employerRegistrationData")) || [];
    const auth = JSON.parse(localStorage.getItem("auth"));
    userProfile = userProfile.map((user) =>
      user.email === auth.email ? { ...user, ...updatedProfile } : user
    );
    localStorage.setItem(
      "employerRegistrationData",
      JSON.stringify(userProfile)
    );
    setIsEditing(false);
  };

  return (
    <Container className="my-4">
      <Row>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body className="text-center">
              <img
                src={logo}
                alt="Company Logo"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
              <h4 className="mt-3">{companyName}</h4>
              {isEditing && (
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaUser /> Company Logo
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    placeholder="Enter logo URL or base64"
                    style={{ maxWidth: "100%" }}
                  />
                </Form.Group>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h5>Company Details</h5>
              <hr />
              <p>
                <FaIndustry /> Industry: {industry}
              </p>
              <p>
                <FaUsers /> Company Size: {companySize}
              </p>
              <p>
                <FaCalendarAlt /> Established: {yearEstablished}
              </p>
              <p>
                <FaMapMarkerAlt /> Address: {address}
              </p>
              <p>
                <FaMapMarkerAlt /> City: {city}
              </p>
              <p>
                <FaMapMarkerAlt /> State: {state}
              </p>
              <p>
                <FaGlobe /> Website:{" "}
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {website}
                </a>
              </p>
              <p>
                <FaLinkedin /> LinkedIn:{" "}
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  {linkedin}
                </a>
              </p>
              <p>
                <FaTwitter /> Twitter:{" "}
                <a href={twitter} target="_blank" rel="noopener noreferrer">
                  {twitter}
                </a>
              </p>
              <p>
                <FaFacebook /> Facebook:{" "}
                <a href={facebook} target="_blank" rel="noopener noreferrer">
                  {facebook}
                </a>
              </p>
              {isEditing && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaIndustry /> Industry
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      style={{ maxWidth: "100%" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaUsers /> Company Size
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                      style={{ maxWidth: "100%" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaCalendarAlt /> Year Established
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={yearEstablished}
                      onChange={(e) => setYearEstablished(e.target.value)}
                      style={{ maxWidth: "100%" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaMapMarkerAlt /> Address
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      style={{ maxWidth: "100%" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaMapMarkerAlt /> City
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      style={{ maxWidth: "100%" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaMapMarkerAlt /> State
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      style={{ maxWidth: "100%" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaGlobe /> Website
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      style={{ maxWidth: "100%" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaLinkedin /> LinkedIn
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      style={{ maxWidth: "100%" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaTwitter /> Twitter
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      style={{ maxWidth: "100%" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaFacebook /> Facebook
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      style={{ maxWidth: "100%" }}
                    />
                  </Form.Group>
                </>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h5>Contact Person Details</h5>
              <hr />
              <p>
                <FaUser /> Name: {contactPersonName}
              </p>
              <p>
                <FaEnvelope /> Email: {contactPersonEmail}
              </p>
              <p>
                <FaUser /> Role: {contactPersonRole}
              </p>
              <p>
                <FaPhone /> Phone: {contactPersonNumber}
              </p>
              {isEditing && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaUser /> Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={contactPersonName}
                      onChange={(e) => setContactPersonName(e.target.value)}
                      style={{ maxWidth: "100%" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaEnvelope /> Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={contactPersonEmail}
                      onChange={(e) => setContactPersonEmail(e.target.value)}
                      style={{ maxWidth: "100%" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaUser /> Role
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={contactPersonRole}
                      onChange={(e) => setContactPersonRole(e.target.value)}
                      style={{ maxWidth: "100%" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaPhone /> Phone
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={contactPersonNumber}
                      onChange={(e) => setContactPersonNumber(e.target.value)}
                      style={{ maxWidth: "100%" }}
                    />
                  </Form.Group>
                </>
              )}
            </Card.Body>
          </Card>

          <div className="text-center">
            {!isEditing ? (
              <Button
                variant="primary"
                onClick={handleEditClick}
                className="mr-2"
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  variant="success"
                  onClick={handleSaveClick}
                  className="mr-2"
                >
                  Save
                </Button>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CompanyProfile;
