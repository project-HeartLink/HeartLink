/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import redHeartImg from "../../assets/heart_red.png";
import talkThemeBox from "../../assets/talkThemeBox.png";
import "./mainpage.scss";
import ReconnectingWebSocket from "reconnecting-websocket";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import destr from "destr";
import { themesArr } from "./themesArr";

export const Main = () => {
  const themes = themesArr; //locateで値を受け取る
  const [topicIndex, setTopicIndex] = useState(0);
  const socketRef = useRef();
  const [message, setMessage] = useState();
  const [arrThemes, setarrThemes] = useState([]);

  console.log("themes", themes);

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
      console.log("id1:", data.id1);
      console.log("heartRate2", data.heartRate2);
      console.log("topicId", data.topicId);

      function wsTheme(id) {
        for (let i = 0; i < id.length; i++) {
          console.log("topicIdMap", id[i][0]);

          themes.map((theme) => {
            if (id[i][0] == theme.id) {
              console.log("theme.id", theme.topic);
              arrThemes.push(theme.topic);
              console.log("arrThemes", arrThemes);
            }
          });
        }
      }
      wsTheme(data.topicId);
    };

    websocket.addEventListener("message", onMessage);

    // #3.useEffectのクリーンアップの中で、WebSocketのクローズ処理を実行
    return () => {
      websocket.close();
      websocket.removeEventListener("message", onMessage);
    };
  }, []);
  //useEffectの発火が何にも依存しない,初回にしか起動しない。

  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(false);

  const FinishTheme = () => {
    setTopicIndex((index) => {
      if (index === arrThemes.length - 1) {
        setIsDone(true);
        return index;
      } else {
        return index + 1;
      }
    }); //indexが配列の現在地点を指してる
  };
  //player
  let heartBeatP1 = 100;
  let heartBeatP2 = 90;

  const FinishMeasuring = () => {
    //5秒後にリザルト画面に飛ばす
    useEffect(() => {
      console.log("useEffect called");
      const timer = setTimeout(() => {
        navigate("/result");
      }, 5 * 1000);
      return () => {
        console.log("cleanUp");
        clearTimeout(timer);
      };
    }, [isDone]);

    return (
      <>
        <Box
          className="background"
          sx={{
            display: "flex",
          }}
        >
          <Typography
            onClick={() => navigate("/result")}
            variant="body1"
            sx={{
              fontSize: "8vw",
              m: " 80vw auto 0 auto",
            }}
          >
            完了
          </Typography>
        </Box>
        <motion.div
          initial={{
            y: -100,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            y: -100,
            scale: [0, 0, 1.6],
            opacity: 1,
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <img
            src={redHeartImg}
            style={{
              width: "40%",
              height: "auto",
            }}
          />
        </motion.div>
      </>
    );
  };

  const Measuring = () => {
    return (
      <>
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: "8vw",
              mt: "20%",
            }}
          >
            計測中
          </Typography>
          <Box
            sx={{
              mt: "10%",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img
                  src={redHeartImg}
                  style={{
                    width: "80%",
                    height: "auto",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: "7vw",
                      fontFamily: "LXGW WenKai Mono TC",
                    }}
                  >
                    Player1
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: "0vh",
                      fontSize: "3rem",
                      fontFamily: "LXGW WenKai Mono TC",
                    }}
                  >
                    {heartBeatP1}
                  </Typography>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Typography>❤️</Typography>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: "7vw",
                      fontFamily: "LXGW WenKai Mono TC",
                    }}
                  >
                    Player2
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: "0vh",
                      fontSize: "3rem",
                      fontFamily: "LXGW WenKai Mono TC",
                    }}
                  >
                    {heartBeatP2}
                  </Typography>
                </Box>
              </SwiperSlide>
            </Swiper>
          </Box>
          <Box
            sx={{
              m: "0 auto 0 5vw",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={talkThemeBox}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "67%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              {/* {arrThemes.map((topic) => ( */}
              <Typography
                variant="body1"
                sx={{
                  pt: "2vw",
                  fontSize: "7vw",
                  width: "70vw",
                }}
              >
                {arrThemes[topicIndex]}
              </Typography>
              {/* ))} */}

              <Typography
                variant="body1"
                component={motion.div}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                transition={{}}
                onClick={() => FinishTheme()}
                sx={{
                  display: "inline-block",
                  fontSize: "5vw",
                  pt: "2vh",
                }}
              >
                完了
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }} //初期
        animate={{ opacity: 1 }} //表示される時
        exit={{ opacity: 1 }} //ページを離れる時の動き
        transition={{ duration: 1 }}
      >
        {isDone ? <FinishMeasuring /> : <Measuring />}
      </Box>
    </>
  );
};
