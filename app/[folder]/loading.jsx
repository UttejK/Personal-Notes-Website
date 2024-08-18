import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div
      style={{
        height: "90svh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
}
