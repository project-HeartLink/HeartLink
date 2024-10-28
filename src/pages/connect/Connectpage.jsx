/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Connectpage.scss";
import HeartImg from "../../assets/kkrn_icon_heart_3.png";
import { Box, Button, Typography } from "@mui/material";

export const Connect = () => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const player = "0";
  const navigate = useNavigate();

  const CatchError = (err) => {
    console.log("エラー:",err);

    fetch('https://hartlink-api.onrender.com/reset', { method: "GET" })
      .then(response => response.json())
      .then(data => {
        console.log("data",data)
        navigate(-2);
      })
  };

  useEffect(() => {
    const handleSubmit = () => {
      fetch("https://hartlink-api.onrender.com/connect", { method: "GET" })
        .then((res) => res.json()) //json方式でデータを受け取る
        .then((data) => {

          if (data.connect == player) {
            console.log("success");
            console.log("playerHeartBeat",data)
            navigate("/SelectPlayer")
          } else {
            setTimeout(() => {
              //20秒以上経ったら、アラート出るようにした

              if (!alert("2台目の接続を確認できません")) {
                navigate(-1);
              }
            }, 20 * 1000);
          }
        })

        .catch((err) => CatchError(err));
    };
    const timeout = setTimeout(handleSubmit, 5 * 1000);

    //clearIntervalを入れることで、２回される処理を回避
    return () => {
      clearInterval(timeout);
    };
  }); // 初回時のみ実行する

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
              fontSize: "8vw",
              mt: "30%",
              mb: "10%",
            }}
          >
            {isReady ? "接続完了" : "接続待ち..."}
          </Typography>
          <Box
            component={motion.div}
            animate={{ scale: [0.8, 1, 0.8, 1, 0.8] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          >
            <img
              src={HeartImg}
              style={{
                width: "70%",
                height: "auto",
              }}
            />
          </Box>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.0 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => navigate("/SelectPlayer")}
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
            スタート
          </Button>
        </Box>
      </Box>
    </>
  );
};
