
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './components/users/UserContext.jsx'; 
import Navbar from './components/Navbar.jsx';
import Hero from './Pages/Home/Hero.jsx';
import Error from "./Pages/Error/Error.jsx";
import CreateAccountPage from "./components/users/Sign Up/SignUp.jsx";
import LoginPage from "./components/users/Login/Login.jsx";
import ProfilePage from './components/users/ProfilePage.jsx';
import CompanyDetails from './components/users/CompanyDetails.jsx'; // Importez le composant CompanyDetails
import Header from './components/users/Header.jsx'
import JobDetails from './components/users/JobDetails.jsx'
import ApplyPage from './components/users/ApplyPagenon.jsx'; // Importez le composant ApplyPage
import UserList from './components/users/UserList.jsx'; 
import Dashboard from './components/users/Dashboard.jsx';   
import Templates from './components/users/Templates.jsx';
import Features from './components/users/Features.jsx';
import ErrorBoundary from './components/users/ErrorBoundary.jsx';
import BlogCard from './components/users/BlogCard.jsx';
import EmployerRegister from './components/Employers/employerRegister.jsx';
import EmployerLogin from './components/Employers/LoginEmployer.jsx';
import HomePageEmployer from './components/Employers/employerHome.jsx';
import CVSearchPage from './components/Employers/CVSearchPage.jsx';
import PostJobForm from './components/Employers/PostJobPage.jsx';
import Workspace from './components/Employers/MyWorkSpace.jsx';
import ApplyJobPage from './components/users/ApplyJobPage.jsx';
import Applications from './components/users/ApplicationPage.jsx'

function AppContent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);
  return (
    <>
      {loggedIn ? <Header /> : <Navbar />}

      <div className="content">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/error" element={<Error />} />
          <Route path="/sign-up" element={<CreateAccountPage />} />
          <Route path="/login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/company/:id" element={<CompanyDetails />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/apply/:id" element={<ApplyPage />} />
          <Route path="/Templates" element={<Templates />} />
          <Route path="/Features" element={<Features />} />
          <Route path="/blog" element={<BlogCard />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/sign-up-Employer" element={<EmployerRegister />} />
          <Route path="/login-Employer" element={<EmployerLogin />} />
          <Route path="/Home-Employer" element={<HomePageEmployer />} />
          <Route path="/CV-Search" element={<CVSearchPage />} />
          <Route path="/Post-Job" element={<PostJobForm />} />
          <Route path="/Workspace" element={<Workspace />} />
          <Route path="/apply/:jobId" element={<ApplyJobPage />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <UserProvider>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </UserProvider>
    </Router>
  );
}

export default App;