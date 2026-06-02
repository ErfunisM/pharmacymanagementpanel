import { useEffect, useState } from "react";
import ToolBox from "../components/common/ToolBox.jsx";
import Container from "../components/layout/container.jsx";
import Content from "../components/layout/content.jsx";
import TableList from "../components/common/TableList.jsx";
import { FILTER_OPTIONS, TABEL_HEADER } from "../constants/index.js";
import PharmaciesModal from "./modals/pharmaciesModal.jsx";

const PHARMACIES_FILTER_OPTIONS = [FILTER_OPTIONS.branch];

const PHARMACIES_TABEL_HEADER = [
  TABEL_HEADER.pharmacy,
  TABEL_HEADER.phone,
  TABEL_HEADER.branch,
  TABEL_HEADER.wh,
  TABEL_HEADER.action,
];

const Pharmacies = () => {
  const [term, setTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    branch: "All",
    wh: "",
  });

  const [loading, setLoading] = useState(true);
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/ErfuniisM/AfiaTechDataBase/refs/heads/main/data/pharmacies.json`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPharmacies(data);
        setLoading(false);
      });
  }, []);
  const SEARCHED_PHARMACIES = pharmacies
    .filter((appt) => {
      const pharmacy = appt.pharmacyName?.toLowerCase() ?? "";
      const branch = appt.branch?.toLowerCase() ?? "";
      const t = term.toLowerCase();
      return pharmacy.startsWith(t) || branch.startsWith(t);
    })
    .filter(
      (p) =>
        selectedFilters.branch === "All" || p.branch === selectedFilters.branch,
    );

  if (loading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <Container>
      <Content
        modal={<PharmaciesModal />}
        title="Pharmacies"
        buttonTitle="Add a Pharmacy"
      >
        <ToolBox
          term={term}
          onSearch={setTerm}
          onFilter={setSelectedFilters}
          SearchPlaceholder="Search Pharmacies"
          onReset={() =>
            setSelectedFilters({
              branch: "All",
              wh: "",
            })
          }
          selectedFilters={selectedFilters}
          filters={PHARMACIES_FILTER_OPTIONS}
        />
        <TableList
          header={PHARMACIES_TABEL_HEADER}
          body={SEARCHED_PHARMACIES}
        />
      </Content>
    </Container>
  );
};

export default Pharmacies;
