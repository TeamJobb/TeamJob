import React, { useState, useEffect, useContext } from 'react'; 
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider, UserContext } from './components/users/UserContext.jsx'; 
import Navbar from './components/Navbar.jsx';
import Hero from './Pages/Home/Hero.jsx';
import Error from "./Pages/Error/Error.jsx";
import CreateAccountPage from "./components/users/Sign Up/SignUp.jsx";
import LoginPage from "./components/users/Login/Login.jsx";
import ProfilePage from './components/users/ProfilePage.jsx';
import Header from './components/users/Header.jsx'
import JobDetails from './components/users/JobDetails.jsx'
import ApplyJobPage from './components/users/ApplyJobPage.jsx'; 
import UserList from './components/users/UserList.jsx'; 
import ErrorBoundary from './components/users/ErrorBoundary.jsx';
import EmployerRegister from './components/Employers/employerRegister.jsx';
import EmployerLogin from './components/Employers/LoginEmployer.jsx';
import HomePageEmployer from './components/Employers/employerHome.jsx';
import CVSearchPage from './components/Employers/CVSearchPage.jsx';
import PostJobForm from './components/Employers/PostJobPage.jsx';
import UserApplicationsPage from './components/users/ApplicationPage.jsx';
import Chat from '../../client/src/components/users/chat/ChatContainer.jsx';
import Contact from '../../client/src/Pages/Contact/Contact.jsx';
import socket from '../../client/src/utils/socket.js';
import NavbarEmployer from './components/Employers/NavBarEmployer.jsx'; 
import ViewProfilePage from './components/users/ProfilePage view.jsx';
import FreeAdviceService from './components/FreeAdviceService.jsx';
import LearnMore from './components/LearnMore.jsx';
import ProhibitedActions from './components/Prohibited actions.jsx';
import EditJob from './components/Employers/Myworkspace.jsx'
import Footer from './components/Footer.jsx';
import Error404 from "./Pages/404 Page/404.jsx";

function AppContent({ socket }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(""); 
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user: currentUser } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3022/api/users");
        setUsers(res.data);
        console.log (res.data)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleLogin = (role) => {    
    setLoggedIn(true);
    setRole(role);
  };

  return (
    <>
      
      {loggedIn ? (
        role === "employer" ?  <NavbarEmployer /> :  <Header />
      ) : (
        <Navbar />
       
      )}

      <div className="content">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/Contact-Us" element={<Contact />} />
          <Route path="/error" element={<Error />} />
          <Route path="/sign-up" element={<CreateAccountPage />} />
          <Route 
            path="/login" 
            element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn}  handleLogin ={handleLogin} />} 
          />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/Viewprofile/:id" element={<ViewProfilePage />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/apply-job/:jobId" element={<ApplyJobPage />} />
          <Route path="/employer-register" element={<EmployerRegister />} />
          <Route 
            path="/login-Employer" 
            element={<EmployerLogin   handleLogin ={handleLogin} />} 
          />
          <Route path="/Home-Employer" element={<HomePageEmployer />} />
          <Route path="/cv-search" element={<CVSearchPage />} />
          <Route path="/post-job" element={<PostJobForm />} />
          <Route path="/user/:userId/applications" element={<UserApplicationsPage />} />
          <Route path="/user-list" element={<UserList users={users} selectUser={handleSelectUser} />} />
          <Route path="/free-advice" element={<FreeAdviceService />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/prohibited-actions" element={<ProhibitedActions />} />
          <Route path="/Myworkspace" element={<EditJob />} />
          <Route path="*" element={<Error404 />} />
        </Routes>

        {/* Conditional rendering of the Chat component */}
        {loggedIn && location.pathname === '/user-list' && selectedUser && (
          <div className="chat-container">
            <Chat currentUser={currentUser} selectedUser={selectedUser} />
          </div>
        )}
        
      </div>
      {location.pathname === '/' && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <UserProvider>
        <AppContent socket={socket} />
      </UserProvider>
    </Router>
  );
}

export default App;