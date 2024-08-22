import React, { useState } from "react";
import { FaTimes } from 'react-icons/fa';
import './Dashboard.css';
// react-bootstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";

// recharts components
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from "recharts";

function Dashboard() {
  const [meetings, setMeetings] = useState([]);

  const handleAddMeeting = (event) => {
    event.preventDefault();
    const form = event.target;
    const newMeeting = {
      object: form.elements["meetingObject"].value,
      description: form.elements["description"].value,
      startDate: form.elements["startDate"].value,
    };
    setMeetings([...meetings, newMeeting]);
    form.reset();
  };


  const handleRejectMeeting = (index) => {
    const updatedMeetings = meetings.filter((_, i) => i !== index);
    setMeetings(updatedMeetings);
  };

  const lineChartData = [
    { time: "9:00AM", data1: 287, data2: 67, data3: 23 },
    { time: "12:00AM", data1: 385, data2: 152, data3: 113 },
    { time: "3:00PM", data1: 490, data2: 143, data3: 67 },
    { time: "6:00PM", data1: 492, data2: 240, data3: 108 },
    { time: "9:00PM", data1: 554, data2: 287, data3: 190 },
    { time: "12:00PM", data1: 586, data2: 335, data3: 239 },
    { time: "3:00AM", data1: 698, data2: 435, data3: 307 },
    { time: "6:00AM", data1: 695, data2: 437, data3: 308 },
  ];

  const pieChartData = [
    { name: "Open", value: 40 },
    { name: "Bounce", value: 20 },
    { name: "Unsubscribe", value: 40 },
  ];

  return (
    <Container fluid>
      <Row className="mb-4 flex-grow-1">
        <Col lg="3" sm="6" className="bottom-cards">
          <Card className="card-stats gradient-card">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-chart text-light"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Data Usage</p>
                    <Card.Title as="h4">150GB</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr />
              <div className="stats text-muted">
                <i className="fas fa-redo mr-1"></i> Update Now
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6" className="bottom-cards">
          <Card className="card-stats gradient-card">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-light-3 text-light"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category"> Salary Interval</p>
                    <Card.Title as="h4">$ 1,100 - $ 3,345</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr />
              <div className="stats text-muted">
                <i className="far fa-calendar-alt mr-1"></i> Last day
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6" className="bottom-cards">
          <Card className="card-stats gradient-card">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-vector text-light"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Errors</p>
                    <Card.Title as="h4">23</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr />
              <div className="stats text-muted">
                <i className="far fa-clock-o mr-1"></i> In the last hour
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6" className="bottom-cards">
          <Card className="card-stats gradient-card">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-favourite-28 text-light"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Followers</p>
                    <Card.Title as="h4">+45K</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr />
              <div className="stats text-muted">
                <i className="fas fa-redo mr-1"></i> Update now
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md="8">
          <Card>
            <Card.Header className="bg-primary text-white">
              <Card.Title as="h4">User Statistics</Card.Title>
              <p className="card-category">Performance Overview</p>
            </Card.Header>
            <Card.Body>
              <LineChart
                width={730}
                height={250}
                data={lineChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="data1" stroke="#8884d8" />
                <Line type="monotone" dataKey="data2" stroke="#82ca9d" />
                <Line type="monotone" dataKey="data3" stroke="#ff7300" />
              </LineChart>
            </Card.Body>
            <Card.Footer>
              <div className="legend">
                <i className="fas fa-circle text-info"></i> Open{" "}
                <i className="fas fa-circle text-danger"></i> Click{" "}
                <i className="fas fa-circle text-warning"></i> Click Second Time
              </div>
              <hr />
              <div className="stats">
                <i className="fas fa-history"></i> Updated 3 minutes ago
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <Card.Header className="bg-info text-white">
              <Card.Title as="h4">Email Statistics</Card.Title>
              <p className="card-category">Last Campaign Performance</p>
            </Card.Header>
            <Card.Body>
              <PieChart width={400} height={250}>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                />
                <Tooltip />
              </PieChart>
              <div className="legend">
                <i className="fas fa-circle text-info"></i> Open{" "}
                <i className="fas fa-circle text-danger"></i> Bounce{" "}
                <i className="fas fa-circle text-warning"></i> Unsubscribe
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="stats">
                <i className="fas fa-calendar-alt"></i> Updated 5 minutes ago
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Card>
            <Card.Header className="bg-success text-white">
              <Card.Title as="h4">Add Your Meeting</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddMeeting}>
                <Form.Group controlId="meetingObject">
                  <Form.Label>Meeting Object</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} required />
                </Form.Group>
                <Form.Group controlId="startDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="date" required />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Add Meeting
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md="6">
          <Card>
            <Card.Header className="bg-warning text-white">
              <Card.Title as="h4">Upcoming Meetings</Card.Title>
              <p className="card-category">Don't miss your scheduled meetings</p>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                {meetings.map((meeting, index) => (
                  <li key={index} className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h5>{meeting.object}</h5>
                      <p>{meeting.description}</p>
                      <p className="text-muted">Starts on: {meeting.startDate}</p>
                    </div>
                    <div>
                      
                    <Button
  variant="danger"
  size="sm"
  onClick={() => handleRejectMeeting(index)}
>
  <FaTimes />
</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
