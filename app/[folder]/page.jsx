import {
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function page({ params }) {
  // console.log(
  //   "https://raw.githubusercontent.com/UttejK/Personal-Notes/main/" +
  //     "NotesConfig.json"
  // );

  const response = await fetch(
    "https://raw.githubusercontent.com/UttejK/Personal-Notes/main/" +
      "NotesConfig.json"
  );

  const data = await response.json();

  const currentFolder = data.folders[params.folder];
  const acceptedFolders = Object.keys(data.folders);
  const { folder } = params;

  if (!acceptedFolders.includes(folder)) notFound();

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h5">{folder}</Typography>
        </CardContent>
        <CardContent>
          <Stack>
            {currentFolder.notes.map((note) => (
              <div key={note.label}>
                <Button>
                  <Link href={`/${folder}${note.url}`}>{note.label}</Link>
                </Button>
              </div>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
