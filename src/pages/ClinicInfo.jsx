// import Appoinments_list from "../components/common/appoinments_list";
import Container from "../components/layout/container";
import Content from "../components/layout/content";
import FormClinicInfo from "./forms/clinicInfoForm";

const ClinicInfo = () => {
  return (
    <Container>
      <Content title="ClinicInfo">
        <div className="flex justify-center p-25 bg-white shadow-sm text-left  rounded-2xl">
          <FormClinicInfo />
        </div>
      </Content>
    </Container>
  );
};

export default ClinicInfo;
