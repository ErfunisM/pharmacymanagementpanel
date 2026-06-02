import CalendarTable from "../components/common/CalendarTable";
import Container from "../components/layout/container";
import Content from "../components/layout/content";
import ScheduleModal from "./modals/scheduleModal";

const Schedule = () => {
  return (
    <Container>
      <Content
        modal={<ScheduleModal />}
        title="Schedule"
        buttonTitle="Add a Time Block"
      >
        <CalendarTable />
      </Content>
    </Container>
  );
};

export default Schedule;
