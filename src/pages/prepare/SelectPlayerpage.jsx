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
import { getMethod, postMethod } from "../../response/ResponseMethod";

export const SelectPlayer = ({ player, setPlayer, name }) => {
  const [open, setOpen] = useState(false);

  const [connectValue, setConnectValue] = useState(""); //選んだplayar番号をセット
  const [showText, setShowText] = useState("");
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSelectplayer = (player) => {
    setPlayer(player);
    setShowText(true);
  };

  const handleSubmit = async () => {
    if (player) {
      //promise
      setConnectValue(player); //playar番号をセット
      navigate("/selectTheme");
      sendinfo();
    } else {
      setShowText(false);
    }
  };

  const sendinfo = () => {
    const sendData = { player: player, name: name };
    if (player) {
      postMethod("https://hartlink-api.onrender.com/sendname", sendData); //送る
    } else {
      setShowText(false);
    }
  };

  return (
    <>
      <Box
        className="background"
        sx={{
          mt: "15vh",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: "2rem",
          }}
        >
          あなたは
        </Typography>
        <Box
          sx={{
            m: "10vh auto 0 auto",
            width: "80vw",
            maxWidth: "500px",
            height: "30vh",
          }}
        >
          <ListItemButton onClick={handleOpen} sx={{ alignItems: "center" }}>
            <ListItemText
              primary="Playerを選択してね"
              primaryTypographyProps={{
                fontSize: "1.5rem",
                fontFamily: "Hachi Maru Pop, serif",
              }}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{
                  alignItems: "center",
                }}
                onClick={() => handleSelectplayer("1")}
                selected={player === "1"}
              >
                <ListItemText
                  primary={"player1"}
                  primaryTypographyProps={{
                    fontSize: "1.5rem",
                    fontFamily: "Hachi Maru Pop, serif",
                  }}
                />
              </ListItemButton>
              <ListItemButton
                sx={{ alignItems: "center" }}
                onClick={() => handleSelectplayer("2")}
                selected={player === "2"}
              >
                <ListItemText
                  primary={"player2"}
                  primaryTypographyProps={{
                    fontSize: "1.5rem",
                    fontFamily: "Hachi Maru Pop, serif",
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
          onClick={handleSubmit}
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#ffdbdb",
            marginTop: "2vh",
            border: "10px solid white",
            borderRadius: "15px",
            padding: "2px 30px 2px 30px",
          }}
        >
          準備完了
        </Button>
        {showText ? (
          <></>
        ) : (
          <Typography variant="body1" sx={{ fontSize: "1rem", mt: "2vh" }}>
            Playerを選択したら次に進めるよ♡
          </Typography>
        )}
      </Box>
    </>
  );
};
