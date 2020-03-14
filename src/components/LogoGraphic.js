import React from "react";
import PanAfricanLogo from "../svgs/PanAfricanLogo";
import NeutralLogo from "../svgs/NeutralLogo";

const LogoGraphic = props => {
  console.log(`props`, props.graphic.theme.main);
  if (props.graphic.theme.main === "panAfrican") {
    return <PanAfricanLogo />;
  } else {
    return <NeutralLogo />;
  }
};

export default LogoGraphic;
