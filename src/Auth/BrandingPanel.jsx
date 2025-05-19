import { FaUniversity } from "react-icons/fa";

const BrandingPanel = () => {
  return (
    <div className="md:w-1/2 bg-gradient-to-br from-[#0066CC] to-[#FD9148] text-white p-8 flex flex-col justify-center items-center">
      <FaUniversity className="text-5xl mb-4" />
      <h2 className="text-3xl font-bold mb-2 text-center">UDOM STEM Education</h2>
      <p className="text-center mb-4">Enhancing Mathematics and Science Education in Secondary Schools in Tanzania</p>
      <div className="w-32 h-1 bg-[#FFAD03] rounded-full my-4"></div>
      <p className="text-center text-sm opacity-80 mt-4">
        A Partnership Program with the Ministry of Education Science and Technology (MoEST) sponsored by UNICEF
      </p>
    </div>
  );
};

export default BrandingPanel;