/* eslint-disable react/react-in-jsx-scope */
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeartImg from "../../assets/RedHeart.png";
import CoupleImg from "../../assets/coupleResult.svg";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import destr from "destr";

export const Result = ({ player }) => {
  const navigate = useNavigate();

  const [message, setMessage] = useState();
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [showId, setShowId] = useState("");

  let type = "恋人";
  let dokidokiMeter = 100;
  const socketRef = useRef();
  console.log("player", player);

  // #0.WebSocket関連の処理は副作用なので、useEffect内で実装
  useEffect(() => {
    // #1.WebSocketオブジェクトを生成しサーバとの接続を開始
    const websocket = new ReconnectingWebSocket(
      "wss://hartlink-api.onrender.com/ws"
    );
    socketRef.current = websocket;

    websocket.onopen = () => {
      //そのページを開いた瞬間に心拍取得するようにした
      // WebSocket接続が確立されたらメッセージを送信
      socketRef.current?.send("0.0");
    };

    // #2.メッセージ受信時のイベントハンドラを設定
    const onMessage = (event) => {
      setMessage(event.data);

      // JSON文字列をJavaScriptオブジェクトに変換
      //const data = JSON.parse(event.data);
      const data = destr(event.data);

      // undefined
      // destr()

      console.log("event.data:", event.data);
      console.log("id1:", typeof data.id1);
      console.log("heartRate2", data.heartRate2);
      console.log("topicId", data.topicId);

      setPlayer1(data.id1);
      setPlayer2(data.id2);
      setShowId(player === "player1" ? data.id1 : data.id2);
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
      <Container
        component={motion.div}
        initial={{ opacity: 0 }} //初期
        animate={{ opacity: 1 }} //表示される時
        exit={{ opacity: 1 }} //ページを離れる時の動き
        transition={{ duration: 1 }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "10vw",
                mt: "30%",
              }}
            >
              胸キュン度
            </Typography>
          </Box>
          <Box>
            <Box
              sx={{
                mt: 5,
                position: "relative",
              }}
            >
              <img
                src={HeartImg}
                style={{
                  width: "200px",
                  height: "200px",
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  margin: 0,
                  whiteSpace: "pre-line",
                  position: "absolute",
                  width: "70%",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -55%)",
                  fontSize: "8vw",
                }}
              >
                {dokidokiMeter}
              </Typography>
            </Box>
            <Typography
              letterSpacing={2}
              variant="body1"
              sx={{
                fontFamily: "Hachi Maru Pop, serif",
                fontSize: "8vw",
                m: "20% auto",
                width: "80vw",
              }}
            >
              {player1} & {player2}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{
              mt: "40%",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Hachi Maru Pop, serif",
                fontSize: "8vw",
                width: "60vw",
                m: "0 auto",
              }}
            >
              {showId}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Hachi Maru Pop, serif",
                fontSize: "8vw",
                width: "20vw",
              }}
            >
              との
            </Typography>
            <Stack direction="row" alignItems="flex-end" spacing={5}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Hachi Maru Pop, serif",
                  fontSize: "10vw",
                  color: "red",
                  width: "32vw",
                }}
              >
                関係性
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Hachi Maru Pop, serif",
                  fontSize: "8vw",
                  width: "20vw",
                }}
              >
                は...
              </Typography>
            </Stack>
          </Stack>

          <Typography
            variant="body1"
            sx={{
              fontFamily: "Hachi Maru Pop, serif",
              fontSize: "12vw",
              mt: "15%",
              mb: "15%",
            }}
          >
            {type}
          </Typography>
          <img
            src={CoupleImg}
            style={{
              width: "19vw",
              height: "auto",
            }}
          />
          <Box
            sx={{
              margin: "20% auto",
              border: "10px solid white",
              width: "90%",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Hachi Maru Pop, serif",
                margin: "5% 3% 5% 3%",
                fontSize: "6vw",
              }}
            >
              余計なことを言わないことが関係を継続させるコツです
            </Typography>
          </Box>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.0 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => navigate("/")}
            sx={{
              fontSize: "8vw",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#ffdbdb",
              marginTop: "10%",
              border: "10px solid white",
              borderRadius: "15px",
              padding: "2px 30px 2px 30px",
              width: "65vw",
            }}
          >
            タイトルへ
          </Button>
        </Box>
      </Container>
    </>
  );
};
