/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import talkThemeBox from "../../assets/talkThemeBox.png";
import "./mainpage.scss";
import mainpageFukidashi from "../../assets/mainpage_fukidashi.png";
import ReconnectingWebSocket from "reconnecting-websocket";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import destr from "destr";
import { themesArr } from "./themesArr";
import PropTypes from "prop-types";
import HeartAnimation from "./HeartAnimation";
import HeartBeat from "./heart-beat/HeartBeat";
import {
  GetMethod,
  PostMethod,
  WebsocketMethod,
} from "../../response/ResponseMethod";

export const Main = ({ player }) => {
  const themes = themesArr; //locateで値を受け取る
  const [topicId, setTopicId] = useState([]);
  const socketRef = useRef();
  const [player1Name, setPlayr1Name] = useState("");
  const [player2Name, setPlayr2Name] = useState("");
  const [heartBeatP2, setHeartBeatP2] = useState([]);
  const [arrThemes, setarrThemes] = useState();
  const [index, setIndex] = useState(0); //初期値を１にすることで、mainpageに遷移した直後のお題を写らないようにする
  const [heartBeatP1, setHeartBeatP1] = useState([]);
  const [player1arrHeartBeat, setplayer1arrHeartBeat] = useState({
    theme0: [],
    theme1: [],
    theme2: [],
    theme3: [],
  });
  const [player2arrHeartBeat, setplayer2arrHeartBeat] = useState({
    theme0: [],
    theme1: [],
    theme2: [],
    theme3: [],
  });

  const [speed1, setSpeed1] = useState(1); //アニメーション1の速度
  const [speed2, setSpeed2] = useState(1); //アニメーション2の速度

  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(false);
  const [proIndex, setProIndex] = useState(0);
  const [arrSelectTopic, setArrSelectTopic] = useState([]);
  const [finishButton, setFinishButton] = useState(false);
  const [nextButton, setNextButton] = useState(false);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0); //今どっちの心拍を表示しているかの状態管理

  console.log("themes", themes);

  console.log("player", player);
  console.log(`typeofPlayer: ${typeof player}`);

  const SpeedChanger1 = (heartRate) => {
    console.log("player1arrHeartBeat", heartRate);
    if (heartRate < 70) setSpeed1(1.5);
    else if (heartRate >= 70 && heartRate < 110) setSpeed1(1);
    else if (heartRate >= 110) setSpeed1(0.5);
  };

  const SpeedChanger2 = (heartRate) => {
    if (heartRate < 70) setSpeed2(1.5);
    else if (heartRate >= 70 && heartRate < 110) setSpeed2(1);
    else if (heartRate >= 110) setSpeed2(0.5);
  };

  const data = WebsocketMethod(); //websocket通信をして、現在のデータを取り出す
  console.log("websocket", data);
  console.log("index", data.index);
  console.log("topicId", data.topicId);

  useEffect(() => {
    setArrSelectTopic(data.topicId);

    setPlayr1Name(data.player1);
    setPlayr2Name(data.player2);
    if (data.index < 4) {
      setProIndex(data.index);
    }

    setHeartBeatP1(data.heartRate1);
    setHeartBeatP2(data.heartRate2);

    setTopicId(data.topicId); //setTopicIdに入れることでws以外の処理で使えるようにした

    if (data.index == 0) {
      //mainpageに遷移した直後にお題を写るように
      setarrThemes(themes[data.topicId[0]].topic);
    }

    SpeedChanger1(data.heartRate1);
    SpeedChanger2(data.heartRate2);
  }, [data]);

  console.log("data.index", data.index);

  console.log("player1arrHeartBeat", player1arrHeartBeat);

  //お題ごとに心拍を格納
  useEffect(() => {
    if (heartBeatP1 > 0) {
      setplayer1arrHeartBeat((prev) => ({
        ...prev,
        [`theme${proIndex}`]: [...prev[`theme${proIndex}`], heartBeatP1],
      }));
      setplayer2arrHeartBeat((prev) => ({
        ...prev,
        [`theme${proIndex}`]: [...prev[`theme${proIndex}`], heartBeatP2],
      }));
    }
  }, [heartBeatP1, heartBeatP2]); // heartBeatP1を監視

  const endSend = async () => {
    await GetMethod("https://hartlink-api.onrender.com/end"); //"end"を送る
  };

  useEffect(() => {
    setNextButton(!nextButton);
    if (proIndex != 0) {
      topicId.map((id) => {
        if (topicId[proIndex] === themes[id].id) {
          //今の処理が同じだったら
          setarrThemes(themes[id].topic);
        }
      });
      if (proIndex == 3) {
        setFinishButton(!finishButton);
      }
    }
  }, [proIndex]);

  const FinishTheme = () => {
    setNextButton(!nextButton);
    if (proIndex == topicId.length - 1) {
      setIsDone(true);
      setIndex(index);
    } else {
      setIndex(index + 1);
    }

    if (finishButton) {
      endSend();
    }

    console.log("heartBeatP1", heartBeatP1);

    const sendData = {
      index: index,
      player: player,
    };

    PostMethod("https://hartlink-api.onrender.com/indexTopicId", sendData); //送る

    const dataTopicArray = {
      player: player,
      index: index,
      array:
        player == "1"
          ? player1arrHeartBeat[`theme${index}`]
          : player2arrHeartBeat[`theme${index}`],
    };

    PostMethod("https://hartlink-api.onrender.com/topicArray", dataTopicArray); //送る

    console.log("array", player1arrHeartBeat.theme0);
  };

  const FinishMeasuring = () => {
    //5秒後にリザルト画面に飛ばす
    useEffect(() => {
      const dataGet = async () => {
        const data = await GetMethod("https://hartlink-api.onrender.com/end"); //"end"を送る
        console.log("dataGet", data);
      };

      dataGet();
      console.log("useEffect called");
      const timer = setTimeout(() => {
        navigate("/result", {
          state: {
            player1Name: player1Name,
            player2Name: player2Name,
            arrSelectTopic: arrSelectTopic,
          },
        });
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
            }}
          >
            <Box>
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
            <Box
              sx={{
                position: "absolute",
                top: "35vh",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "-1",
              }}
            >
              <img
                src={mainpageFukidashi}
                style={{
                  width: "75w",
                  height: "auto",
                  maxWidth: "350px",
                }}
              />
              <Box
                sx={{
                  margin: 0,
                  position: "absolute",
                  width: "100%",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -60%)",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.5rem",
                  }}
                >
                  一般的な心拍は
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.5rem",
                  }}
                >
                  男性は60~70
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.5rem",
                  }}
                >
                  女性は70~80
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.5rem",
                  }}
                >
                  と言われているよ
                </Typography>
              </Box>
            </Box>
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
              fontSize: "2rem",
              mt: "15vh",
            }}
          >
            計測中
          </Typography>
          <Box
            sx={{
              m: "3vh auto 0 auto",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "90vw",
              maxWidth: "450px",
            }}
          >
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              onSlideChange={(swiper) =>
                setActiveSlideIndex(swiper.activeIndex)
              }
              initialSlide={activeSlideIndex}
            >
              <SwiperSlide>
                <HeartBeat speed={speed1} />
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
                      fontSize: "2rem",
                    }}
                  >
                    {player1Name}
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: "2rem",
                    }}
                  ></Typography>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <HeartBeat speed={speed2} />
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
                      fontSize: "2rem",
                    }}
                  >
                    {player2Name}
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      mt: "0vh",
                      fontSize: "2rem",
                    }}
                  ></Typography>
                </Box>
              </SwiperSlide>
            </Swiper>
          </Box>
          <Box
            sx={{
              overflow: "hidden",
              m: "0 auto 5vh 3vw",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={talkThemeBox}
              style={{
                width: "75vw",
                height: "auto",
                maxWidth: "400px",
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
                  fontSize: "1.3rem",
                  width: "60vw",
                  maxWidth: "300px",
                }}
              >
                {arrThemes}
              </Typography>
              {/* ))} */}
            </Box>
          </Box>
          {nextButton && (
            <Button
              component={motion.button}
              whileHover={{ scale: 1.0 }}
              whileTap={{ scale: 0.8 }}
              onClick={FinishTheme}
              sx={{
                fontSize: "1.6rem",
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#ffdbdb",
                margin: "2vh auto 0 auto",
                border: "10px solid white",
                borderRadius: "15px",
                padding: "2px 30px 2px 30px",
              }}
            >
              {finishButton ? "完了" : "次のお題へ"}
            </Button>
          )}
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

Main.propTypes = {
  player: PropTypes.string,
};
