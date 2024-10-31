/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Connectpage.scss";
import HeartImg from "../../assets/kkrn_icon_heart_3.png";
import { Box, Button, Typography } from "@mui/material";

export const Connect = () => {
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  let flag = false;

  const CatchError = (err) => {
    console.log("エラー:", err);

    fetch("https://hartlink-api.onrender.com/reset", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        navigate("/");
      });
  };

  useEffect(() => {
    let timeoutId;
    const handleSubmit = () => {
      console.log("動いたよ");
      fetch("https://hartlink-api.onrender.com/connect", { method: "GET" })
        .then((res) => res.json()) //json方式でデータを受け取る
        .then((data) => {
          if (data.connect == "2") {
            navigate("/SelectPlayer");
          } else if (data.connect == "1") {
            console.log("connect:",data.connect)
          } else if (data.connect == "0") {
            if (!flag) {
              flag = true;  //２回目の処理を実行させないようにした
              timeoutId = setTimeout(() => {
                //20秒以上経ったら、アラート出るようにした
                if (!alert("2台目の接続を確認できません")) {
                  CatchError();
                }
              }, 10 * 1000);
            }
          }
        })

        .catch((err) => CatchError(err));
    };

    const intervalId = setInterval(handleSubmit, 5 * 1000);

    //clearIntervalを入れることで、２回される処理を回避
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
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