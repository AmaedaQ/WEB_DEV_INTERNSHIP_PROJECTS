import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
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
  FaTimes,
  FaBuilding, // Example icon, you can choose any FA icon you prefer
} from "react-icons/fa";

function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [companyIcon, setCompanyIcon] = useState("FaBuilding"); // Default FA icon
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
      setCompanyIcon(currentUser.companyIcon || "FaBuilding");
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
      companyIcon, // Save the FA icon name
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

  const handleCloseClick = () => {
    // Add any logic for closing the page if needed
    window.history.back();
  };

  // Map icon name to the corresponding FA icon component
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "FaBuilding":
        return <FaBuilding />;
      // Add more cases for other FA icons if needed
      default:
        return <FaBuilding />;
    }
  };

  return (
    <Container className="my-4">
      <Row className="mb-3">
        <Col className="text-end">
          <Button variant="outline-secondary" onClick={handleCloseClick}>
            <FaTimes /> Close
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={4} className="d-flex justify-content-center mb-4 mb-md-0">
          <div className="text-center">
            <div
              className="d-flex justify-content-center align-items-center mb-3"
              style={{ fontSize: "3rem" }}
            >
              {getIconComponent(companyIcon)}
            </div>
            <h4 className="mb-3">{companyName}</h4>
            {isEditing && (
              <Form.Group className="mb-3">
                <Form.Label>
                  <FaBuilding /> Company Icon
                </Form.Label>
                <Form.Control
                  type="text"
                  value={companyIcon}
                  onChange={(e) => setCompanyIcon(e.target.value)}
                  placeholder="Enter FA icon name"
                />
              </Form.Group>
            )}
          </div>
        </Col>

        <Col md={8}>
          <Row>
            <Col md={6}>
              <div className="bg-light rounded p-4 mb-4 shadow-sm">
                <h5 className="mb-3">Company Details</h5>
                <hr />
                <div className="mb-3">
                  <FaIndustry /> <strong>Industry:</strong> {industry}
                </div>
                <div className="mb-3">
                  <FaUsers /> <strong>Company Size:</strong> {companySize}
                </div>
                <div className="mb-3">
                  <FaCalendarAlt /> <strong>Established:</strong>{" "}
                  {yearEstablished}
                </div>
                <div className="mb-3">
                  <FaMapMarkerAlt /> <strong>Address:</strong> {address}
                </div>
                <div className="mb-3">
                  <FaMapMarkerAlt /> <strong>City:</strong> {city}
                </div>
                <div className="mb-3">
                  <FaMapMarkerAlt /> <strong>State:</strong> {state}
                </div>
                <div className="mb-3">
                  <FaGlobe /> <strong>Website:</strong>{" "}
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {website}
                  </a>
                </div>
                <div className="mb-3">
                  <FaLinkedin /> <strong>LinkedIn:</strong>{" "}
                  <a href={linkedin} target="_blank" rel="noopener noreferrer">
                    {linkedin}
                  </a>
                </div>
                <div className="mb-3">
                  <FaTwitter /> <strong>Twitter:</strong>{" "}
                  <a href={twitter} target="_blank" rel="noopener noreferrer">
                    {twitter}
                  </a>
                </div>
                <div className="mb-3">
                  <FaFacebook /> <strong>Facebook:</strong>{" "}
                  <a href={facebook} target="_blank" rel="noopener noreferrer">
                    {facebook}
                  </a>
                </div>
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
                      />
                    </Form.Group>
                  </>
                )}
              </div>
            </Col>

            <Col md={6}>
              <div className="bg-light rounded p-4 mb-4 shadow-sm">
                <h5 className="mb-3">Contact Person Details</h5>
                <hr />
                <div className="mb-3">
                  <FaUser /> <strong>Name:</strong> {contactPersonName}
                </div>
                <div className="mb-3">
                  <FaEnvelope /> <strong>Email:</strong> {contactPersonEmail}
                </div>
                <div className="mb-3">
                  <FaUser /> <strong>Role:</strong> {contactPersonRole}
                </div>
                <div className="mb-3">
                  <FaPhone /> <strong>Phone:</strong> {contactPersonNumber}
                </div>
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
                      />
                    </Form.Group>
                  </>
                )}
              </div>
            </Col>
          </Row>

          <div className="text-center">
            {isEditing ? (
              <Button variant="primary" onClick={handleSaveClick}>
                Save Changes
              </Button>
            ) : (
              <Button variant="secondary" onClick={handleEditClick}>
                Edit Profile
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CompanyProfile;
