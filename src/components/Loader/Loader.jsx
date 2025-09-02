import { GridLoader } from "react-spinners";

export default function Loader() {
  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        marginTop: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GridLoader size={10} color={"#9b6c43"} />
    </div>
  );
}
