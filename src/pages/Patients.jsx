import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ToolBox from "../components/common/ToolBox.jsx";
import Container from "../components/layout/container.jsx";
import Content from "../components/layout/content.jsx";
import TableList from "../components/common/TableList.jsx";
import { FILTER_OPTIONS, TABEL_HEADER } from "../constants/index.js";
import PatientsModal from "./modals/patientsModal.jsx";

dayjs.extend(customParseFormat);

const PATIENTS_FILTER_OPTIONS = [
  FILTER_OPTIONS.gender,
  FILTER_OPTIONS.date,
  FILTER_OPTIONS.ins,
];

const PATIENTS_TABEL_HEADER = [
  TABEL_HEADER.name,
  TABEL_HEADER.phone,
  TABEL_HEADER.national,
  TABEL_HEADER.lastVisit,
  TABEL_HEADER.gender,
  TABEL_HEADER.ins,
  TABEL_HEADER.action,
];

const convertToISODate = (lastVisitStr) => {
  if (!lastVisitStr) return "";
  const parsed = dayjs(lastVisitStr, "ddd, D MMM YYYY");
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : "";
};

const Patients = () => {
  const [term, setTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    gender: "All",
    date: "",
    ins: "All",
  });

  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/ErfunisM/PharmacyManagementPanel-Database/refs/heads/main/Jsons/patient.json`,
    )
      .then((res) => res.json())
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const SEARCHED_PATIENTS = patients
    .filter((appt) => {
      const name = appt.name?.toLowerCase() ?? "";
      const t = term.toLowerCase();
      const national = appt.national?.toString() ?? "";
      return name.startsWith(t) || national.startsWith(term);
    })
    .filter(
      (p) =>
        selectedFilters.gender === "All" || p.gender === selectedFilters.gender,
    )
    .filter(
      (p) => selectedFilters.ins === "All" || p.ins === selectedFilters.ins,
    )
    .filter((p) => {
      if (!selectedFilters.date) return true;
      const visitDate = convertToISODate(p.lastVisit);
      return visitDate === selectedFilters.date;
    });

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <Container>
      <Content
        modal={<PatientsModal />}
        title="Patients"
        buttonTitle="Add a Patients"
      >
        <ToolBox
          term={term}
          onSearch={setTerm}
          onFilter={setSelectedFilters}
          SearchPlaceholder="Search Patients"
          onReset={() =>
            setSelectedFilters({
              gender: "All",
              date: "",
              ins: "All",
            })
          }
          selectedFilters={selectedFilters}
          filters={PATIENTS_FILTER_OPTIONS}
        />
        <TableList header={PATIENTS_TABEL_HEADER} body={SEARCHED_PATIENTS} />
      </Content>
    </Container>
  );
};

export default Patients;
