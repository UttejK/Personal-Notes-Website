"use client";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function page({ params }) {
  const [config, setConfig] = useState(null);
  const [fileBody, setFileBody] = useState("");
  const { folder, file } = params;
  const fetchUrl = `${"https://raw.githubusercontent.com/UttejK/Personal-Notes/main/"}${folder}/${file}`;

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/UttejK/Personal-Notes/main/" +
        "NotesConfig.json"
    )
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((err) => console.error(err));

    fetch(fetchUrl)
      .then((res) => res.text())
      .then((data) => setFileBody(data));
  }, []);
  if (!config) return <Loading />;
  const acceptedFiles = config.folders[folder].notes.map((note) => note.label);
  if (!acceptedFiles.includes(decodeURIComponent(file))) notFound();
  if (fileBody === "") return <Loading />;

  const htmlString = marked(fileBody);

  return (
    <div>
      <Container>
        <p dangerouslySetInnerHTML={{ __html: htmlString }} />
      </Container>
    </div>
  );
}
