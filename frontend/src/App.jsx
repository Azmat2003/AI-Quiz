import React from "react";
import { Routes, Route } from "react-router";
// components
import Navbar from "./components/Navbar.jsx";
import CheckUser from "./components/CheckUser.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import CreateQuiz from "./pages/CreateQuiz.jsx";
import QuizAttempt from "./pages/QuizAttempt.jsx";
import QuizResult from "./pages/QuizResult.jsx";
import Overview from "./pages/dashboard/Overview.jsx";
import MyQuizzes from './pages/dashboard/MyQuizzes.jsx';
import Analytics from './pages/dashboard/Analytics.jsx';
import QuizView from "./pages/QuizView.jsx";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout.jsx";

function App() {
    return (
        <div>
            <Navbar></Navbar>

            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route element={<CheckUser></CheckUser>}>
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="/signup" element={<Signup></Signup>}></Route>
                    <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>}></Route>
                    <Route path="/reset-password/:token" element={<ResetPassword></ResetPassword>}></Route>
                </Route>

                <Route element={<ProtectedRoute></ProtectedRoute>}>
                    <Route path="/profile" element={<Profile></Profile>}></Route>
                    <Route path="/edit-profile" element={<EditProfile></EditProfile>}></Route>
                    <Route path="/create-quiz" element={<CreateQuiz></CreateQuiz>}></Route>
                    <Route path="/quiz/:quizId/attempt" element={<QuizAttempt></QuizAttempt>}></Route>
                    <Route path="/quiz/:quizId/result" element={<QuizResult></QuizResult>}></Route>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<Overview></Overview>}></Route>
                        <Route path="quizzes" element={<MyQuizzes></MyQuizzes>}></Route>
                        <Route path="analytics" element={<Analytics></Analytics>}></Route>
                    </Route>
                    <Route path="/quiz/:quizId/attempt" element={<QuizView></QuizView>}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
