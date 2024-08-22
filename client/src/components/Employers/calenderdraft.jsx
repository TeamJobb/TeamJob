import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import Modal from 'react-modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './EventCalendar.css';

const localizer = momentLocalizer(moment);

const InterviewCalendar = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');
    const [selectedInterviewType, setSelectedInterviewType] = useState('');
    const [companies, setCompanies] = useState([]);
    const [positions, setPositions] = useState([]);
    const [interviewTypes, setInterviewTypes] = useState([]);

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/api/interviews');
                const formattedInterviews = response.data.map(interview => ({
                    id: interview.id,
                    title: interview.position,
                    start: new Date(`${interview.date}T${interview.time}`),
                    end: new Date(new Date(`${interview.date}T${interview.time}`).getTime() + 60 * 60 * 1000), // Assuming 1-hour duration
                    company: interview.company,
                    location: interview.location,
                    description: interview.description,
                    interviewType: interview.type,
                }));

                setEvents(formattedInterviews);
                setFilteredEvents(formattedInterviews);
                setCompanies([...new Set(response.data.map(interview => interview.company))]);
                setPositions([...new Set(response.data.map(interview => interview.position))]);
                setInterviewTypes([...new Set(response.data.map(interview => interview.type))]);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching interviews:', err);
                setError('Error fetching interviews');
                setLoading(false);
            }
        };

        fetchInterviews();
    }, []);

    const handleCompanyChange = (e) => {
        const company = e.target.value;
        setSelectedCompany(company);

        filterEvents({ company });
    };

    const handlePositionChange = (e) => {
        const position = e.target.value;
        setSelectedPosition(position);

        filterEvents({ position });
    };

    const handleInterviewTypeChange = (e) => {
        const type = e.target.value;
        setSelectedInterviewType(type);

        filterEvents({ type });
    };

    const filterEvents = ({ company = selectedCompany, position = selectedPosition, type = selectedInterviewType }) => {
        const filtered = events.filter(event =>
            (company ? event.company === company : true) &&
            (position ? event.title === position : true) &&
            (type ? event.interviewType === type : true)
        );
        setFilteredEvents(filtered);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setModalIsOpen(true);
    };

    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: '#007bff', // Use a color that fits your design
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block',
        };
        return { style };
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedEvent(null);
    };

    useEffect(() => {
        Modal.setAppElement('#root');
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="calendar-container">
            <h1>Interview Calendar</h1>
            <div className="dropdown-container">
                <select
                    value={selectedCompany}
                    onChange={handleCompanyChange}
                    className="dropdown"
                >
                    <option value="">All Companies</option>
                    {companies.map((company, index) => (
                        <option key={index} value={company}>
                            {company}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedPosition}
                    onChange={handlePositionChange}
                    className="dropdown"
                >
                    <option value="">All Positions</option>
                    {positions.map((position, index) => (
                        <option key={index} value={position}>
                            {position}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedInterviewType}
                    onChange={handleInterviewTypeChange}
                    className="dropdown"
                >
                    <option value="">All Interview Types</option>
                    {interviewTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <Calendar
              localizer={localizer}
              events={filteredEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              eventPropGetter={eventStyleGetter}
              onSelectEvent={handleEventClick}
              min={new Date(1970, 1, 1, 8, 0, 0)}  // 8:00 AM
              max={new Date(1970, 1, 1, 22, 0, 0)} // 10:00 PM
            />

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Interview Details"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                {selectedEvent && (
                    <div>
                        <h2>{selectedEvent.title}</h2>
                        <p><strong>Company:</strong> {selectedEvent.company}</p>
                        <p><strong>Date:</strong> {selectedEvent.start.toDateString()}</p>
                        <p><strong>Time:</strong> {selectedEvent.start.toLocaleTimeString()}</p>
                        <p><strong>Location:</strong> {selectedEvent.location}</p>
                        <p><strong>Description:</strong> {selectedEvent.description}</p>
                        <p><strong>Interview Type:</strong> {selectedEvent.interviewType}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default InterviewCalendar;
