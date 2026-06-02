import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ToolBox from "../components/common/ToolBox.jsx";
import Container from "../components/layout/container.jsx";
import Content from "../components/layout/content.jsx";
import { FILTER_OPTIONS } from "../constants/index.js";
import TableList from "../components/common/TableList.jsx";
import { TABEL_HEADER } from "../constants/index.js";
import DoctorsModal from "./modals/doctorsModal.jsx";

dayjs.extend(customParseFormat);

const DOCTORS_FILTER_OPTIONS = [
  FILTER_OPTIONS.spec,
  FILTER_OPTIONS.date,
  FILTER_OPTIONS.status2,
];

const DOCTORS_TABEL_HEADER = [
  TABEL_HEADER.name,
  TABEL_HEADER.phone,
  TABEL_HEADER.spec,
  TABEL_HEADER.joinDate,
  TABEL_HEADER.status,
  TABEL_HEADER.action,
];
const convertToISODate = (dateString) => {
  if (!dateString) return "";
  const parsed = dayjs(dateString, "ddd, D MMM YYYY");
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : "";
};

const Doctors = () => {
  const [term, setTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    spec: "All",
    date: "",
    status: "All",
  });

  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/ErfunisM/PharmacyManagementPanel-Database/refs/heads/main/Jsons/doctors.json`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setLoading(false);
      });
  }, []);

  const SEARCHED_DOCTORS = doctors
    .filter((appt) => {
      const name = appt.name?.toLowerCase() ?? "";
      const t = term.toLowerCase();
      return name.startsWith(t);
    })
    .filter(
      (p) => selectedFilters.spec === "All" || p.spec === selectedFilters.spec,
    )
    .filter(
      (p) =>
        selectedFilters.status === "All" || p.status === selectedFilters.status,
    )
    .filter((p) => {
      if (!selectedFilters.date) return true;
      const visitDate = convertToISODate(p.joinDate);
      return visitDate === selectedFilters.date;
    });

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <Container>
      <Content
        modal={<DoctorsModal />}
        title="Doctor"
        buttonTitle="Add a Doctor"
      >
        <ToolBox
          term={term}
          onSearch={setTerm}
          onFilter={setSelectedFilters}
          SearchPlaceholder="Search Doctor"
          onReset={() =>
            setSelectedFilters({
              spec: "All",
              date: "",
              status: "All",
            })
          }
          selectedFilters={selectedFilters}
          filters={DOCTORS_FILTER_OPTIONS}
        />
        <TableList header={DOCTORS_TABEL_HEADER} body={SEARCHED_DOCTORS} />
      </Content>
    </Container>
  );
};

export default Doctors;
