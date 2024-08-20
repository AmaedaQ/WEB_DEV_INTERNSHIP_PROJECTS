import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import EmployerLogin from "./components/Authentication/Employer-Login";
import JobSeekerLogin from "./components/Authentication/Job-Seeker-Login";
import EmployerRegistration from "./components/Authentication/EmployerRegistration";
import JobSeekerRegistration from "./components/Authentication/JobSeekerRegistration";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import EmployerDashboard from "./components/Dashboard/EmployerDashboard";
import JobSeekerDashboard from "./components/Dashboard/JobSeekerDashboard";
import PostJob from "./components/Dashboard/PostJob";
import CompanyProfile from "./components/Dashboard/CompanyProfile";
import ApplyForm from "./components/Dashboard/ApplyForm";
import ApplicationHistory from "./components/Dashboard/ApplicationHistory";
import JobSeekerProfile from "./components/Dashboard/JobSeekerProfile";
import JobApplications from "./components/Dashboard/JobApplications";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login/job-seeker" element={<JobSeekerLogin />} />
        <Route path="/login/employer" element={<EmployerLogin />} />
        <Route
          path="/register/job-seeker"
          element={<JobSeekerRegistration />}
        />
        <Route path="/register/employer" element={<EmployerRegistration />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route
          path="/dashboard/job-seeker"
          element={
            <ProtectedRoute
              allowedRoles={["job_seeker"]}
              element={<JobSeekerDashboard />}
            />
          }
        />
        <Route
          path="/dashboard/employer"
          element={
            <ProtectedRoute
              allowedRoles={["employer"]}
              element={<EmployerDashboard />}
            />
          }
        />
        <Route
          path="/company-profile"
          element={
            <ProtectedRoute
              allowedRoles={["employer"]}
              element={<CompanyProfile />}
            />
          }
        />

        <Route
          path="/apply/:jobId"
          element={
            <ProtectedRoute
              allowedRoles={["job_seeker"]}
              element={<ApplyForm />}
            />
          }
        />
        <Route
          path="/application-history"
          element={
            <ProtectedRoute
              allowedRoles={["job_seeker"]}
              element={<ApplicationHistory />}
            />
          }
        />
        <Route
          path="/applications/:jobId"
          element={
            <ProtectedRoute
              allowedRoles={["employer"]}
              element={<JobApplications />}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              allowedRoles={["job_seeker"]}
              element={<JobSeekerProfile />}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
