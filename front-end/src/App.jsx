import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
<<<<<<< HEAD
import ApplyDoc from "./pages/ApplyDoc";
=======
import DoctorForm from "./pages/DoctorForm";
>>>>>>> 15cc5dff861052e9ec2020a911d56b2b7aca9adc


function App() {

  // const {loading} = useSelector(state => state.loader)
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute> <Home /> </ProtectedRoute>}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={<ProtectedRoute> <Profile /> </ProtectedRoute>}
<<<<<<< HEAD
          />
          <Route
            path="/ApplayDoc"
            element={<ProtectedRoute> <ApplyDoc /> </ProtectedRoute>}
=======
>>>>>>> 15cc5dff861052e9ec2020a911d56b2b7aca9adc
          />
          <Route path="/apply-doctor" element={<ProtectedRoute> <DoctorForm /> </ProtectedRoute>} />

        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
