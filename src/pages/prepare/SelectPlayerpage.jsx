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

export const SelectPlayer = ({ player, setPlayer }) => {
  const [open, setOpen] = useState(false);

  const [connectValue, setConnectValue] = useState("");
  const [showText, setShowText] = useState("");
  const navigate = useNavigate();
  const startTime = performance.now(); //開始時間の取得
  const status = "ok";

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSelectplayer = (player) => {
    setPlayer(player);
    setShowText(true);
  };

  let p1 = "Player1";
  let p2 = "Player2";

  const handleSubmit = () => {
    if (player) {
      fetch("https://hartlink-api.onrender.com/ok", { method: "GET" })
        .then((res) => res.json()) //json方式でデータを受け取る
        .then((data) => {
          console.log("data:", data);

          if (data.status === status) {
            setConnectValue(player); //playar番号をセット
            console.log("playar:", player);
            navigate("/getAverage");
          }
        })

        .catch((err) => console.error("Error fetching data:", err));
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
                onClick={() => handleSelectplayer(p1)}
                selected={player === p1}
              >
                <ListItemText
                  primary={p1}
                  primaryTypographyProps={{
                    fontSize: "1.5rem",
                    fontFamily: "Hachi Maru Pop, serif",
                  }}
                />
              </ListItemButton>
              <ListItemButton
                sx={{ alignItems: "center" }}
                onClick={() => handleSelectplayer(p2)}
                selected={player === p2}
              >
                <ListItemText
                  primary={p2}
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