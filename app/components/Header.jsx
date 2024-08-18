"use client";
import MenuIcon from "@mui/icons-material/Menu";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Header({}) {
  const [config, setConfig] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const pathName = usePathname();

  useEffect(() => {
    let data = sessionStorage.getItem("pages");

    if (data) {
      setConfig(JSON.parse(data));
      // console.log("data is defined");
    } else
      fetch(
        "https://raw.githubusercontent.com/UttejK/Personal-Notes/main/" +
          "NotesConfig.json"
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch configuration");
          }
          return response.json();
        })
        .then((data) => {
          sessionStorage.setItem("pages", JSON.stringify(data));
          setConfig(data);
        })
        .catch((err) => console.error(err.message));
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  if (!config) {
    return <>Loading...</>;
  }

  const pages = config.folders;
  // console.log(pages);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            variant="h6"
            // noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <NotesOutlinedIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography>Notes</Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              {pages &&
                Object.keys(pages)?.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    href={pages[page].url}
                  >
                    <Typography
                      textAlign="center"
                      color={() => (pathName === page ? "blue" : "black")}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Notes
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages &&
              Object.keys(pages).map((page) => (
                <Button
                  key={page}
                  href={pages[page].url}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    fontWeight:
                      pathName.slice(1, pathName.length) === page
                        ? "bold"
                        : "normal",
                    display: "block",
                  }}
                >
                  {page}
                </Button>
              ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
