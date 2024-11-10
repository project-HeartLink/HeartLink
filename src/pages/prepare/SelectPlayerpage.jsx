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

export const SelectPlayer = ({ name }) => {
  const [open, setOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [connectValue, setConnectValue] = useState("");
  const [showText, setShowText] = useState("");
  const navigate = useNavigate();
  const startTime = performance.now(); //開始時間の取得
  const status = "ok";

  const handleOpen = () => {
    console.log("open");
    console.log("open");
    setOpen(!open);
  };

  const sendPlayerInfo = () => {
    const data = { player: selectedPlayer, name: name }; // dataを正しい形式で設定

    console.log("ただいま、メールを送信してます", data);
    const url = "https://hartlink-api.onrender.com/sendname";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("ネットワーク応答が正常ではありません");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSelectplayer = (player) => {
    setSelectedPlayer(player);
    setShowText(true);
  };

  let p1 = "Player1";
  let p2 = "Player2";

  const handleSubmit = () => {
    if (selectedPlayer) {
      fetch("https://hartlink-api.onrender.com/ok", { method: "GET" })
        .then((res) => res.json()) //json方式でデータを受け取る
        .then((data) => {
          console.log("data:", data);

          if (data.status === status) {
            setConnectValue(selectedPlayer); //playar番号をセット
            console.log("playar:", selectedPlayer);
            sendPlayerInfo();
            navigate(`/getAverage`, {
              state: { selectedPlayer },
            });
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
                onClick={() => handleSelectplayer(1)}
                selected={selectedPlayer === 1}
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
                onClick={() => handleSelectplayer(2)}
                selected={selectedPlayer === 2}
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
