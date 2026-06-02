import { useEffect, useState } from "react";
import TotalCards from "../components/common/TotalCards";
import Container from "../components/layout/container";
import Content from "../components/layout/content";
import TableList from "../components/common/TableList.jsx";
import { TABEL_HEADER } from "../constants";

const APPOINTMENT_TABEL_HEADER = [
  TABEL_HEADER.national,
  TABEL_HEADER.patient,
  TABEL_HEADER.doctor,
  TABEL_HEADER.time,
  TABEL_HEADER.phone,
];

const TOTAL_CARD_DATA = [
  {
    name: "Total Patient",

    amount: "40689",

    icon: "../../../public/icons/body/Total-Patient.svg",
  },
  {
    name: "Total Appointments",

    amount: "10293",

    icon: "../../../public/icons/body/Total-Appointments.svg",
  },
  {
    name: "Total Sales",

    amount: "8900",

    icon: "../../../public/icons/body/Total-Sales.svg",
  },
  {
    name: "Total Pending",

    amount: "2040",

    icon: "../../../public/icons/body/Total-Pending.svg",
  },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/ErfunisM/PharmacyManagementPanel-Database/refs/heads/main/Jsons/dashboard.json`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setDashboard(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <Container>
      <Content title="Dashboard">
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          {TOTAL_CARD_DATA.map((item) => (
            <TotalCards
              key={item.name}
              total_name={item.name}
              total_amount={item.amount}
              total_icon={item.icon}
            />
          ))}
        </div>
        <div className="flex flex-col mt-4 gap-4 justify-between h-16">
          <h3 className="text-1xl font-bold  p-4">Today's Appoinment</h3>
          <TableList
            header={APPOINTMENT_TABEL_HEADER}
            body={dashboard}
            itemsPerPage={6}
          />
        </div>
      </Content>
    </Container>
  );
};

export default Dashboard;
