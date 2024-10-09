/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export const SelectPlayer = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };

  let p1 = "Player1";
  let p2 = "Player2";

  return (
    <>
      <Box
        className="background"
        sx={{
          mt: "30%",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: "8vw",
            mb: "10%",
          }}
        >
          あなたは
        </Typography>
        <Box
          sx={{
            mt: "15%",
            height: "50vw",
          }}
        >
          <ListItemButton onClick={handleOpen} sx={{ pl: 7 }}>
            <ListItemText
              primary="Player"
              primaryTypographyProps={{
                fontSize: "5vw",
                fontFamily: "Kaisei Decol, serif",
              }}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  primary={p1}
                  primaryTypographyProps={{
                    fontSize: "6vw",
                    fontFamily: "Kaisei Decol, serif",
                  }}
                />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  primary={p2}
                  primaryTypographyProps={{
                    fontSize: "6vw",
                    fontFamily: "Kaisei Decol, serif",
                  }}
                />
              </ListItemButton>
            </List>
          </Collapse>
        </Box>
        <Button
          component={motion.button}
          whileHover={{ scale: 1.0 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => navigate("/getAverage")}
          sx={{
            fontSize: "8vw",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#ffdbdb",
            marginTop: "10%",
            border: "10px solid white",
            borderRadius: "15px",
            padding: "2px 30px 2px 30px",
          }}
        >
          準備完了
        </Button>
      </Box>
    </>
  );
};
