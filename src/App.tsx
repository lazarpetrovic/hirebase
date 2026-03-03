import { Routes, Route } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import Dashboard from "./components/Dashboard/Dashboard"
import DashboardLayout from "./components/Dashboard/DashboardLayout"
import Applications from "./components/Applications/Applications"
import Settings from "./components/Settings/Settings"
import ProtectedRoute from "./ProtectedRoute"
import { ApplicationsProvider } from "./ApplicationsContext"

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <ApplicationsProvider>
            <DashboardLayout />
          </ApplicationsProvider>
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="applications" element={<Applications />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

