import { Wrapper } from "./styles";
const AppBar = () => (
  <Wrapper   className="h-[32px] flex flex-col bg-black items-center justify-center sticky w-screen top-0 left-0 right-0">
    <h4 className="text-appBar font-bold text-[13px]">Halbestunde</h4>
  </Wrapper>
);

export default AppBar;