/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeartImg from "../../assets/kkrn_icon_heart_3.png";
import { Box, Button, Typography } from "@mui/material";
import ReconnectingWebSocket from "reconnecting-websocket";

export const ShowAvgData = ({ player }) => {
  const navigate = useNavigate();
  const SaveHeartBeat = ["12","40","90"];
  let averageHeartbeat = 0;

  const [message, setMessage] = React.useState();
  const socketRef = React.useRef();
  const [heartBeat, setHeartBeat] = useState([]);
  const location = useLocation(); //location.stateでhistory.pushの引数で渡したstateを取り出すことができる
  let sum = 0;
  let index = 0;

  // #0.WebSocket関連の処理は副作用なので、useEffect内で実装
  useEffect(() => {
    // #1.WebSocketオブジェクトを生成しサーバとの接続を開始
    const websocket = new ReconnectingWebSocket(
      "wss://hartlink-api.onrender.com/ws/12345"
    );
    socketRef.current = websocket;

    websocket.addEventListener("open", () => {
      //そのページを開いた瞬間に心拍取得するようにした
      // WebSocket接続が確立されたらメッセージを送信
      socketRef.current?.send("0.0");
    });

    // #2.メッセージ受信時のイベントハンドラを設定
    const onMessage = (event) => {
      setMessage(event.data);

      // JSON文字列をJavaScriptオブジェクトに変換
      const data = JSON.parse(event.data);

      console.log("event.data:", event.data);
      console.log("id1:", data.id1);
      console.log("heartRate1", data.heartRate1);
      console.log("state", player);

      if (player == "Player1") {
        SaveHeartBeat.push(data.heartRate1);

        SaveHeartBeat.map((heartbeat) => {
          const heartbeatInt = parseInt(heartbeat, 10);
          console.log("heartbeatInt", heartbeatInt);
          sum += heartbeatInt;
          index++;
        });
        console.log("sum:", sum);
        averageHeartbeat = sum / index;
        console.log("averageHeartbeat", averageHeartbeat);
      }
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
            sx={{
              fontSize: "8vw",
              mt: "30%",
              mb: "10%",
            }}
          >
            平均心拍
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
          <Typography
            variant="body1"
            sx={{
              fontSize: "5vw",
            }}
          >
            どれくらい心拍が上がるかな？
          </Typography>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.0 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => navigate("/selectTheme")}
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
            計測開始
          </Button>
        </Box>
      </Box>
    </>
  );
};