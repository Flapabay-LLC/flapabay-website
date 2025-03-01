

import Home_V1 from "./homes/home-v1/page";
import Wrapper from "./layout-wrapper/wrapper";

import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "Home || Flapabay- Apartment Rental, Experiences and More!",
};

export default function Mainpage() {
  return (
    <Wrapper>
      <MetaData meta={metaInformation} />
      <Home_V1 />
     
    </Wrapper>
  );
}
