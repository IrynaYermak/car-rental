import { ClockLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={`container center ${css.loader}`}>
      <ClockLoader color="rgba(52, 112, 255, 1)" size={65} />
    </div>
  );
}
