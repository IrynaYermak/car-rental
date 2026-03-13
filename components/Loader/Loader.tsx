import { ClockLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="container center">
      <ClockLoader color="rgba(52, 112, 255, 1)" size={65} />
    </div>
  );
}
