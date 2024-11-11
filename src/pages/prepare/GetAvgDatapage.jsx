/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeartImg from "../../assets/kkrn_icon_heart_3.png";
import { Box, Button, Typography } from "@mui/material";
import ReconnectingWebSocket from "reconnecting-websocket";

export const GetAvgData = () => {
  const navigate = useNavigate();

  let titleText = "準備中...";
  let subText = "平均心拍を取得してるよ♡";
  const SaveHeartBeat = [];

  const [message, setMessage] = React.useState();
  const socketRef = React.useRef();
  const [heartBeat, setHeartBeat] = useState([]);
  const location = useLocation(); //location.stateでhistory.pushの引数で渡したstateを取り出すことができる
  

  // #0.WebSocket関連の処理は副作用なので、useEffect内で実装
  useEffect(() => {
    // #1.WebSocketオブジェクトを生成しサーバとの接続を開始
    const websocket = new ReconnectingWebSocket(
      "wss://hartlink-api.onrender.com/ws"
    );
    socketRef.current = websocket;

    // #2.メッセージ受信時のイベントハンドラを設定
    const onMessage = (event) => {
      setMessage(event.data);

      // JSON文字列をJavaScriptオブジェクトに変換
      const data = JSON.parse(event.data);

      console.log("event.data:", event.data);
      console.log("id1:", data.id1);
      console.log("heartRate1", data.heartRate1);
      console.log("state",location.state.selectedPlayer)

      SaveHeartBeat.push(location.state.selectedPlayer);
      console.log("🚀 ~ onMessage ~ SaveHeartBeat:", SaveHeartBeat);
    };

    websocket.addEventListener("message", onMessage);

    // #3.useEffectのクリーンアップの中で、WebSocketのクローズ処理を実行
    return () => {
      websocket.close();
      websocket.removeEventListener("message", onMessage);
    };
  }, []);
  //useEffectの発火が何にも依存しない,初回にしか起動しない。

  

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
            onClick={() => navigate("/showAverage")}
            sx={{
              fontSize: "8vw",
              mt: "30%",
              mb: "10%",
            }}
          >
            {titleText}
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
          <Typography variant="body1">{subText}</Typography>
        </Box>
      </Box>
    </>
  );
};