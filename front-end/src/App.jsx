import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import ApplyDoc from "./pages/ApplyDoc";


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
          />
          <Route
            path="/ApplayDoc"
            element={<ProtectedRoute> <ApplyDoc /> </ProtectedRoute>}
          />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
