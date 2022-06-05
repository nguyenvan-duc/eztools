import React from "react";
import Layout from "../components/Layout";
import TitlePage from "../components/PageComponents/TitlePage";
import FirstPercentFormula from "../components/PageComponents/PercentageComponents/FirstPercentFormula";
import SecondPercentFormula from "../components/PageComponents/PercentageComponents/SecondPercentFormula";
import ThirdPercentFormula from "../components/PageComponents/PercentageComponents/ThirdPercentFormula";
const Percentity = () => {
  return (
    <>
      <Layout>
        <div className="max-w-4xl m-auto mt-16 ld:mt-20">
          <TitlePage>Tính giá trị %</TitlePage>
          <FirstPercentFormula />
          <SecondPercentFormula />
          <ThirdPercentFormula />
        </div>
      </Layout>
    </>
  );
};

export default Percentity;
