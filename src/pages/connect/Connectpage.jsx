/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Connectpage.scss";
import HeartImg from "../../assets/kkrn_icon_heart_3.png";
import { Box, Typography } from "@mui/material";
import HeartWave from "./heart-wave/HeartWave";

export const Connect = () => {
  const [isReady, setIsReady] = useState(false);
  const [dataConnect, setDataConnect] = useState("0");
  const navigate = useNavigate();

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
        if (!alert("2台目の接続を確認できません")) {
          CatchError();
        }
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
    </>
  );
};
