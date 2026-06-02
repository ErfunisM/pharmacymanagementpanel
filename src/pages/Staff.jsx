import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ToolBox from "../components/common/ToolBox.jsx";
import Container from "../components/layout/container.jsx";
import Content from "../components/layout/content.jsx";
import { FILTER_OPTIONS } from "../constants/index.js";
import TableList from "../components/common/TableList.jsx";
import { TABEL_HEADER } from "../constants/index.js";
import StaffModal from "./modals/staffModal.jsx";

// اکستنشن dayjs
dayjs.extend(customParseFormat);

const STAFF_FILTER_OPTIONS = [
  FILTER_OPTIONS.depart,
  FILTER_OPTIONS.date,
  FILTER_OPTIONS.status2,
];

const STAFF_TABEL_HEADER = [
  TABEL_HEADER.name,
  TABEL_HEADER.phone,
  TABEL_HEADER.depart,
  TABEL_HEADER.joinDate,
  TABEL_HEADER.status,
  TABEL_HEADER.action,
];

// ✅ تابع تبدیل تاریخ (مخصوص joinDate)
const convertToISODate = (dateString) => {
  if (!dateString) return "";
  const parsed = dayjs(dateString, "ddd, D MMM YYYY");
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : "";
};

const Staff = () => {
  const [term, setTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    depart: "All",
    date: "",
    status: "All",
  });

  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/ErfuniisM/AfiaTechDataBase/refs/heads/main/data/staff.json`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setStaff(data);
        setLoading(false);
      });
  }, []);

  // ✅ اضافه شدن فیلتر تاریخ
  const SEARCHED_STAFF = staff
    .filter((appt) => {
      const name = appt.name?.toLowerCase() ?? "";
      const t = term.toLowerCase();
      return name.startsWith(t);
    })
    .filter(
      (p) =>
        selectedFilters.depart === "All" || p.depart === selectedFilters.depart,
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
        modal={<StaffModal />}
        title="Staff"
        buttonTitle="Add a Staff Member"
      >
        <ToolBox
          term={term}
          onSearch={setTerm}
          onFilter={setSelectedFilters}
          SearchPlaceholder="Search Staff"
          onReset={() =>
            setSelectedFilters({
              depart: "All",
              date: "",
              status: "All",
            })
          }
          selectedFilters={selectedFilters}
          filters={STAFF_FILTER_OPTIONS}
        />
        <TableList header={STAFF_TABEL_HEADER} body={SEARCHED_STAFF} />
      </Content>
    </Container>
  );
};

export default Staff;
