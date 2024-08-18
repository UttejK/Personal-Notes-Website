import { Box } from "@mui/material";
import Link from "next/link";

export default async function Home() {
  const response = await fetch(
    "https://raw.githubusercontent.com/UttejK/Personal-Notes/main/" +
      "NotesConfig.json"
  );

  const data = await response.json();
  // console.log(data.folders);

  return (
    <div>
      <main>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh", // Optional, to fill the viewport height
          }}
        >
          <div>Welcome, feel free to go through my notes</div>
          <Box>
            <ul></ul>
            {Object.keys(data.folders).map((f) => (
              <li key={f}>
                <Link href={data.folders[f].url}>{data.folders[f].label}</Link>
              </li>
            ))}
          </Box>
        </Box>
      </main>
    </div>
  );
}
