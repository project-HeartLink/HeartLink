/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import talkThemeBox from "../../assets/talkThemeBox.png";
import "./mainpage.scss";
import ReconnectingWebSocket from "reconnecting-websocket";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import destr from "destr";
import { themesArr } from "./themesArr";

import HeartAnimation from "./HeartAnimation";
import HeartBeat from "./heart-beat/HeartBeat";

export const Main = () => {
  const themes = themesArr; //locateで値を受け取る
  const [topicId, setTopicId] = useState([]);
  const socketRef = useRef();
  const [player1Name, setPlayr1Name] = useState();
  const [player2Name, setPlayr2Name] = useState();
  const [heartBeatP2, setHeartBeatP2] = useState();
  const [arrThemes, setarrThemes] = useState();
  const [index, setIndex] = useState(1); //初期値を１にすることで、mainpageに遷移した直後のお題を写らないようにする
  const [heartBeatP1, setHeartBeatP1] = useState([]);
  const [heartBeat2P1, setHeartBeat2P1] = useState([]);
  const [arrHeartBeatTheme, setArrHeartBeatTheme] = useState({
    theme1: [],
    theme2: [],
    theme3: [],
    theme4: [],
  });
  const [arrHeartBeat, setArrHeartBeat] = useState();
  const heartBeatSet = ["123", "113", "99", "123", "89"];

  ///////////////////////////////////////////////////// デバッグ用にラ順次取得する
  let debugIndex = 0;

  const getSequentialHeartBeat = () => {
    const value = heartBeatSet[debugIndex];
    debugIndex = (debugIndex + 1) % heartBeatSet.length;
    return value;
  };

  console.log("themes", themes);

  useEffect(() => {
    const debugInterval = setInterval(() => {
      const debugHeartBeat = getSequentialHeartBeat();
      setHeartBeatP1(debugHeartBeat); // 状態更新
    }, 1000);

    // タイマーを10秒後にクリア
    const timeout = setTimeout(() => {
      clearInterval(debugInterval);
    }, 10 * 1000);

    // クリーンアップ関数でタイマーをクリア
    return () => {
      clearInterval(debugInterval);
      clearTimeout(timeout);
    };
  }, []); // 依存配列は空。これにより一度だけ実行される。

  console.log("heartBeatP1", heartBeatP1);

  if (index == 1) {
    //setHeartBeatP1((prev) => [...prev, debugHeartBeat]); // デバッグ用の値をステートに設定

    useEffect(() => {
      // heartBeatP1が変更されたときにarrHeartBeatThemeを更新
      setArrHeartBeatTheme((prev) => ({
        ...prev,
        theme1: [...prev.theme1, heartBeatP1], // 最新のheartBeatP1でtheme1を更新
      }));
    }, [heartBeatP1]); // heartBeatP1を監視

    console.log("1回目");
  }
  if (index == 2) {
    useEffect(() => {
      // heartBeatP1が変更されたときにarrHeartBeatThemeを更新
      setArrHeartBeatTheme((prev) => ({
        ...prev,
        theme2: [...prev.theme2, heartBeatP1], // 最新のheartBeatP1でtheme1を更新
      }));
    }, [heartBeatP1]); // heartBeatP1を監視

    console.log("２回目");
  }
  if (index == 3) {
    useEffect(() => {
      // heartBeatP1が変更されたときにarrHeartBeatThemeを更新
      setArrHeartBeatTheme((prev) => ({
        ...prev,
        theme3: [...prev.theme3, heartBeatP1], // 最新のheartBeatP1でtheme1を更新
      }));
    }, [heartBeatP1]); // heartBeatP1を監視
    console.log("３回目");
  }
  if (index == 4) {
    useEffect(() => {
      setArrHeartBeatTheme((prev) => ({
        ...prev,
        theme4: [...prev.theme4, heartBeatP1],
      }));
    },[heartBeatP1]);
    console.log("４回目");
  }

  console.log("array");

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
      // JSON文字列をJavaScriptオブジェクトに変換
      const data = destr(event.data);

      console.log("event.data:", event.data);
      console.log("heartRate2", data.heartRate1);
      console.log("topicId", data.topicId);

      console.log("🚀 ~ onMessage ~ player1Name:", typeof data.player1);

      setPlayr1Name(data.player1);
      setPlayr2Name(data.player2);

      console.log("arrHeartBeatTheme", arrHeartBeatTheme);

      setHeartBeatP2(data.heartRate2);
      console.log("🚀 ~ onMessage ~ heartBeatP2:", arrHeartBeatTheme.theme2);

      console.log("🚀 ~ onMessage ~ player2Name:", player2Name);

      console.log("data.topicId", data.topicId[2]);

      //data.topicId = [[1], [3], [5]]; ///////////////////////////////////////////今はnullだから仮に入れた

      //const topicIds = data.topicId.map((topicid) => topicid[0]); //[[1], [3], [5]]だったのを[1,3,5]に直した
      setTopicId(data.topicId); //setTopicIdに入れることでws以外の処理で使えるようにした

      setarrThemes(themes[data.topicId[0]].topic); //mainpageに遷移した直後にお題を写るように
    };

    websocket.addEventListener("message", onMessage);

    // #3.useEffectのクリーンアップの中で、WebSocketのクローズ処理を実行
    return () => {
      websocket.close();
      websocket.removeEventListener("message", onMessage);
    };
  }, []);

  console.log("hearBeatP1", arrHeartBeatTheme.theme1);
  console.log("hearBeatP1", arrHeartBeatTheme.theme2);
  console.log("hearBeatP1", arrHeartBeatTheme.theme3);
  console.log("hearBeatP1", arrHeartBeatTheme.theme4);

  console.log("index", index);

  //getHeartBeatTheme(index)
  console.log("arrHeartBeat", arrHeartBeat);
  //useEffectの発火が何にも依存しない,初回にしか起動しない。

  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(false);

  console.log("topicId.length", topicId);

  const FinishTheme = () => {
    console.log("indewx", index);
    if (index == topicId.length) {
      setIsDone(true);
      setIndex(index);
    } else {
      topicId.map((id) => {
        console.log("themes[index].id", themes[id]);
        if (topicId[index] === themes[id].id) {
          console.log("setarrThemes(themes.topicId)", themes[id].topic);
          setarrThemes(themes[id].topic);
        }
      });

      setIndex(index + 1);
    }

    // }); //indexが配列の現在地点を指してる
  };
  //player

  console.log("player1", player1Name);

  const FinishMeasuring = () => {
    //5秒後にリザルト画面に飛ばす
    useEffect(() => {
      fetch("https://hartlink-api.onrender.com/end", { method: "GET" })
        .then((res) => res.json()) //json方式でデータを受け取る
        .then((data) => {
          console.log("data:", data);
        })

        .catch((err) => console.error("Error fetching data:", err));

      console.log("useEffect called");
      const timer = setTimeout(() => {
        navigate("/result", { player1: player1Name, player2: player2Name });
      }, 5 * 1000);
      return () => {
        console.log("cleanUp");
        clearTimeout(timer);
      };
    }, [isDone]);

    return (
      <>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <HeartAnimation />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "-1",
              width: "100vw",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "2rem",
              }}
            >
              おわり！
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.1rem",
              }}
            >
              あなたたちの相性は...
            </Typography>
          </Box>
        </Box>
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
              overflow: "hidden",
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
                <HeartBeat speed={1} />

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
                    variant="h2"
                    sx={{
                      fontSize: "7vw",
                    }}
                  >
                    {player1Name}
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      mt: "0vh",
                      fontSize: "3rem",
                    }}
                  >
                    {/* {getHeartBeatTheme(index)} */}
                    aiu
                  </Typography>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <HeartBeat speed={1} />
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
                    variant="h2"
                    sx={{
                      fontSize: "7vw",
                    }}
                  >
                    {player2Name}
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      mt: "0vh",
                      fontSize: "3rem",
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
              minWidth: 0,
              overflow: "hidden",
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
                top: "60%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              {/* {arrThemes.map((topic) => ( */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: "7vw",
                  width: "70vw",
                }}
              >
                {arrThemes}
              </Typography>
              {/* ))} */}
            </Box>
          </Box>
          <Typography
            variant="body1"
            component={motion.div}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            transition={{}}
            onClick={() => FinishTheme()}
            sx={{
              fontSize: "5vw",
              pt: "2vh",
            }}
          >
            完了
          </Typography>
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
        sx={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {isDone ? <FinishMeasuring /> : <Measuring />}
      </Box>
    </>
  );
};
