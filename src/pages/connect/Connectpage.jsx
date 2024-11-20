/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Connectpage.scss";
import { Box, Typography, Modal } from "@mui/material";
import HeartWave from "./heart-wave/HeartWave";

export const Connect = () => {
  const [isReady, setIsReady] = useState(false);
  const [dataConnect, setDataConnect] = useState("0");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    CatchError();
    setOpen(false);
  };
  const CatchError = (err) => {
    console.log("エラー:", err);

    fetch("https://hartlink-api.onrender.com/reset", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        navigate("/");
      });
  };

  useEffect(() => {
    const handleSubmit = () => {
      console.log("動いたよ");
      fetch("https://hartlink-api.onrender.com/connect", { method: "GET" })
        .then((res) => res.json()) //json方式でデータを受け取る
        .then((data) => {
          if (data.connect == "2") {
            setDataConnect(data.connect);
            console.log("data.connect:", data.connect);
            setIsReady(true);
            setTimeout(() => navigate("/SelectPlayer"), 3 * 1000);
          } else if (data.connect == "1") {
            setDataConnect(data.connect);
            console.log("data.connect:", data.connect);
          } else if (data.connect == "0") {
            setDataConnect(data.connect);
            console.log("data.connect", data);
          }
        })

        .catch((err) => CatchError(err));
    };
    const timeoutId = setTimeout(() => {
      //20秒以上経ったら、アラート出るようにした
      if (dataConnect != "2") {
        console.log("dataConnect", dataConnect);
        handleOpen();
      }
    }, 40 * 1000); //本番は40秒くらいあればいいと思うため変更

    const intervalId = setInterval(handleSubmit, 5 * 1000);

    //clearIntervalを入れることで、２回される処理を回避
    return () => {
      console.log("クリーンアップ: インターバルとタイムアウトの解除");
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []); // 初回時のみ実行する

  return (
    <>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "2rem",
              width: "10rem",
              mt: "15vh",
              mb: "10vh",
            }}
          >
            {isReady ? "接続完了" : "接続待ち..."}
          </Typography>
          <Box
            component={motion.div}
            //animate={{ scale: [0.8, 1, 0.8, 1, 0.8] }}
            //transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            sx={{
              height: "40vh",
            }}
          >
            <HeartWave fillLevel={parseInt(dataConnect)} />
          </Box>
        </Box>
      </Box>
      <Modal
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "75vw",
            maxWidth: "400px",
            maxHeight: "200px",
            bgcolor: "background.paper",
            border: "3px solid #FF4BB7",
            borderRadius: "30px",
            px: "5vw",
            py: "5vh",
          }}
        >
          <Typography
            variant="p"
            sx={{
              fontSize: "1.2rem",
            }}
          >
            接続に失敗しました...
          </Typography>
          <Typography
            component={motion.div}
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.8,
            }}
            onClick={handleClose}
            variant="p"
            sx={{
              margin: "3vh auto 0 auto",
              width: "fit-content",
              fontSize: "1.5rem",
              borderBottom: "2px solid #6B75FF",
              color: "#6B75FF",
            }}
          >
            タイトルへ
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
