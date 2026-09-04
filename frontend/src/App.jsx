import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./style.css"

import Register from "./pages/Register";
import Login from "./pages/Login";

import StudentDashboard from "./pages/student/StudentDashboard";
import LessonList from "./pages/student/LessonList";
import Notifications from "./pages/student/Notifications";

import InstructorDashboard from "./instructor/InstructorDashboard";
import CreateLesson from "./instructor/CreateLesson";
import LessonRegistrations from "./instructor/LessonRegistrations";
import Profile from "./instructor/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/lessons"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <LessonList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/notifications"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor"
          element={
            <ProtectedRoute allowedRole="INSTRUCTOR">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/create-lesson"
          element={
            <ProtectedRoute allowedRole="INSTRUCTOR">
              <CreateLesson />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/lessons/:id/registrations"
          element={
            <ProtectedRoute allowedRole="INSTRUCTOR">
              <LessonRegistrations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/profile"
          element={
            <ProtectedRoute allowedRole="INSTRUCTOR">
              <Profile />
            </ProtectedRoute>
          }
        />

       
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;