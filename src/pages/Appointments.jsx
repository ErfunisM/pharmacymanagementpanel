import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import TableList from "../components/common/TableList.jsx";
import ToolBox from "../components/common/ToolBox.jsx";
import Container from "../components/layout/container.jsx";
import Content from "../components/layout/content.jsx";
import { FILTER_OPTIONS, TABEL_HEADER } from "../constants/index.js";
import AppointmentModal from "./modals/appointmentModal.jsx";

dayjs.extend(customParseFormat);

const convertToISODate = (dateString) => {
  if (!dateString) return "";
  const parsed = dayjs(dateString, "ddd, D MMM YYYY");
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : "";
};

const APPOINTMENT_FILTER_OPTIONS = [
  FILTER_OPTIONS.date,
  FILTER_OPTIONS.time,
  FILTER_OPTIONS.status,
];

const APPOINTMENT_TABEL_HEADER = [
  TABEL_HEADER.national,
  TABEL_HEADER.patient,
  TABEL_HEADER.doctor,
  TABEL_HEADER.date,
  TABEL_HEADER.time,
  TABEL_HEADER.status,
  TABEL_HEADER.action,
];

const Appointments = () => {
  const [term, setTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    date: "",
    time: "",
    status: "All",
  });
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/ErfunisM/PharmacyManagementPanel-Database/refs/heads/main/Jsons/appointments.json`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      });
  }, []);

  const SEARCHED_APPOINTMENTS = appointments
    .filter((appt) => {
      const patient = appt.patient?.toLowerCase() ?? "";
      const t = term.toLowerCase();
      return (
        patient.startsWith(t) || appt.national?.toString().startsWith(term)
      );
    })
    .filter(
      (p) =>
        selectedFilters.status === "All" || p.status === selectedFilters.status,
    )
    .filter((p) => {
      if (!selectedFilters.date) return true;
      const visitDate = convertToISODate(p.date);
      return visitDate === selectedFilters.date;
    });

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Content
        modal={<AppointmentModal />}
        title="Appointments"
        buttonTitle="Add an Appointment"
        modalTitle="Appointment Modal"
      >
        <ToolBox
          term={term}
          onSearch={setTerm}
          onFilter={setSelectedFilters}
          SearchPlaceholder="Search Appointment"
          onReset={() =>
            setSelectedFilters({
              date: "",
              time: "",
              status: "All",
            })
          }
          selectedFilters={selectedFilters}
          filters={APPOINTMENT_FILTER_OPTIONS}
        />

        <div className="mt-4 sm:mt-6">
          <TableList
            header={APPOINTMENT_TABEL_HEADER}
            body={SEARCHED_APPOINTMENTS}
            itemsPerPage={8}
            onActionClick={() => {}}
          />
        </div>
      </Content>
    </Container>
  );
};

export default Appointments;
