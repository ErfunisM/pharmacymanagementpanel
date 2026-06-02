import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Appointments from "./pages/Appointments";
import ClinicInfo from "./pages/ClinicInfo.jsx";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Schedule from "./pages/Schedule";
import Pharmacies from "./pages/Pharmacies";
import Staff from "./pages/Staff";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* مسیر اصلی */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* صفحات */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/pharmacies" element={<Pharmacies />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/clinicinfo" element={<ClinicInfo />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;
