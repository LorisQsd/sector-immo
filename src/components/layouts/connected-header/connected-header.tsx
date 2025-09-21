import { MobileSideBarTrigger } from "../../ui/sidebar";
import { Header } from "../header";
import { HeaderTitle } from "./header-title";

export function ConnectedHeader() {
  return (
    <Header>
      <HeaderTitle />
      <MobileSideBarTrigger />
    </Header>
  );
}
