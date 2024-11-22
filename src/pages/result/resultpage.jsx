/* eslint-disable react/react-in-jsx-scope */
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeartImg from "../../assets/RedHeart.png";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import destr from "destr";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Graph } from "./graph";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { themesArr } from "../main/themesArr";

export const Result = ({ player }) => {
  const navigate = useNavigate();

  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();
  const [showId, setShowId] = useState();
  const [arrHeartBeatP1, setArrHeartBeatP1] = useState({
    p1: { heart: [], theme: "" },
    p2: { heart: [], theme: "" },
    p3: { heart: [], theme: "" },
    p4: { heart: [], theme: "" },
  });
  const [arrHeartBeatP2, setArrHeartBeatP2] = useState({
    p1: { heart: [], theme: "" },
    p2: { heart: [], theme: "" },
    p3: { heart: [], theme: "" },
    p4: { heart: [], theme: "" },
  });
  const [maxPlayer1, setMaxPlayer1] = useState(0);
  const [maxPlayer2, setMaxPlayer2] = useState(0);
  const [maxKeyPl1, setmaxKeyPl1] = useState([]);
  const [maxKeyPl2, setmaxKeyPl2] = useState([]);
  const [arrMaxThemePl1, setArrMaxThemePl1] = useState([]);
  const [arrMaxThemePl2, setArrMaxThemePl2] = useState([]);
  const location = useLocation();
  const props = location.state;
  const themes = themesArr; //locateで値を受け取る

  console.log("player1Name", props.player1Name);
  console.log("player2Name", props.player2Name);
  console.log("arrSelectTopic", props.arrSelectTopic);

  //最大心拍&そのお題の情報を格納しておく
  let playerInfo = [
    {
      name: props.player1Name,
      theme: arrMaxThemePl1,
      bestHR: maxPlayer1,
    },
    {
      name: props.player2Name,
      theme: arrMaxThemePl2,
      bestHR: maxPlayer2,
    },
  ];

  //お題ごとの結果を表示する時の情報を格納しておく

  const CatchArray = () => {
    fetch("https://hartlink-api.onrender.com/getTopicArray", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);

        let tempMaxPlayer1 = 0;
        let tempmaxKeyPl1 = []; // 最大値に対応するテーマの配列
        let tempMaxPlayer2 = 0;
        let tempmaxKeyPl2 = []; // プレイヤー2用

        // プレイヤー1のデータ解析
        for (const key in data.array1) {
          console.log("data.arr", parseInt(data.array1[key]));

          setArrHeartBeatP1((prev) => ({
            p1: {
              heart: data.array1[0].map(Number),
              theme: themes[props.arrSelectTopic[0]].topic,
            },
            p2: {
              heart: data.array1[1].map(Number),
              theme: themes[props.arrSelectTopic[1]].topic,
            },
            p3: {
              heart: data.array1[2].map(Number),
              theme: themes[props.arrSelectTopic[2]].topic,
            },
            p4: {
              heart: data.array1[3].map(Number),
              theme: themes[props.arrSelectTopic[3]].topic,
            },
          }));

          setArrHeartBeatP2((prev) => ({
            p1: {
              heart: data.array2[0].map(Number),
              theme: themes[props.arrSelectTopic[0]].topic,
            },
            p2: {
              heart: data.array2[1].map(Number),
              theme: themes[props.arrSelectTopic[1]].topic,
            },
            p3: {
              heart: data.array2[2].map(Number),
              theme: themes[props.arrSelectTopic[2]].topic,
            },
            p4: {
              heart: data.array2[3].map(Number),
              theme: themes[props.arrSelectTopic[3]].topic,
            },
          }));

          data.array1[key].forEach((index) => {
            const value = parseInt(index);

            if (value > tempMaxPlayer1) {
              // 最大値を更新
              tempMaxPlayer1 = value;
              tempmaxKeyPl1 = [key]; // 新しい最大値なので配列をリセット
            } else if (value === tempMaxPlayer1) {
              // 最大値と同じ場合はテーマを追加
              tempmaxKeyPl1.push(key);
            }
          });
        }

        // プレイヤー2のデータ解析
        for (const key in data.array2) {
          data.array2[key].forEach((index) => {
            const value = parseInt(index);
            if (value > tempMaxPlayer2) {
              tempMaxPlayer2 = value;
              tempmaxKeyPl2 = [key];
            } else if (value === tempMaxPlayer2) {
              tempmaxKeyPl2.push(key);
            }
          });
        }

        console.log(
          "Player 1 Max HR:",
          tempMaxPlayer1,
          "Themes:",
          Array.from(new Set(tempmaxKeyPl1)) //同じ数字を避けた
        );
        console.log(
          "Player 2 Max HR:",
          tempMaxPlayer2,
          "Themes:",
          Array.from(new Set(tempmaxKeyPl2))
        );

        // 状態を一括更新

        const newArrP1 = Array.from(new Set(tempmaxKeyPl1)).map(
          (id) => themes[props.arrSelectTopic[id]].topic
        );
        const newArrP2 = Array.from(new Set(tempmaxKeyPl2)).map(
          (id) => themes[props.arrSelectTopic[id]].topic
        );

        setArrMaxThemePl1(newArrP1);
        setArrMaxThemePl2(newArrP2);

        setMaxPlayer1(tempMaxPlayer1);
        setmaxKeyPl1(Array.from(new Set(tempmaxKeyPl1))); // 配列をセット
        setMaxPlayer2(tempMaxPlayer2);
        setmaxKeyPl2(Array.from(new Set(tempmaxKeyPl2))); // 配列をセット
      });
  };

  console.log("p1", arrHeartBeatP1.p1[0]);
  console.log("p1", arrHeartBeatP1.p2);
  console.log("p1", arrHeartBeatP1.p3);
  console.log("p1", arrHeartBeatP1.p4);

  console.log("arrmaxthemepl1", arrMaxThemePl1);

  console.log("max", maxPlayer2);
  useEffect(() => {
    CatchArray();
  }, []);

  let graphArray = [
    {
      theme: arrHeartBeatP1.p1.theme,
      p1: arrHeartBeatP1.p1.heart,
      p2: arrHeartBeatP2.p1.heart,
    },
    {
      theme: arrHeartBeatP1.p2.theme,
      p1: arrHeartBeatP1.p2.heart,
      p2: arrHeartBeatP2.p2.heart,
    },
    {
      theme: arrHeartBeatP1.p3.theme,
      p1: arrHeartBeatP1.p3.heart,
      p2: arrHeartBeatP2.p3.heart,
    },
    {
      theme: arrHeartBeatP1.p4.theme,
      p1: arrHeartBeatP1.p4.heart,
      p2: arrHeartBeatP2.p4.heart,
    },
  ];
  let syncroMeter = 100; //シンクロ率
  const socketRef = useRef();
  console.log("player", player);
  const resetSubmit = () => {
    console.log(player);
    if (player) {
      fetch("https://hartlink-api.onrender.com/reset", { method: "GET" })
        .then((res) => res.json()) //json方式でデータを受け取る
        .then((data) => {
          console.log("data:", data);
          navigate("/");
        })
        .catch((err) => console.error("Error fetching data:", err));
    }
  };

  return (
    <>
      <Container
        component={motion.div}
        initial={{ opacity: 0 }} //初期
        animate={{ opacity: 1 }} //表示される時
        exit={{ opacity: 1 }} //ページを離れる時の動き
        transition={{ duration: 1 }}
      >
        <Stack direction="column">
          <Typography
            variant="h1"
            sx={{
              fontSize: "2rem",
              mt: "15vh",
            }}
          >
            心拍の分析結果
          </Typography>
          <Typography
            letterSpacing={2}
            variant="body1"
            sx={{
              fontFamily: "Hachi Maru Pop, serif",
              fontSize: "1.8rem",
              m: "10vh auto 10vh auto",
              width: "80vw",
            }}
          >
            {playerInfo[0].name} & {playerInfo[1].name}
          </Typography>
          <Box className="syncMeter">
            <Typography
              sx={{
                margin: "0 auto",
                padding: "1vh 5vw",
                width: "fit-content",
                border: "solid 3px #EC8181",
                borderRadius: "15px",
                fontSize: "1.5rem",
              }}
            >
              シンクロ率
            </Typography>
            <Typography>心拍の動きの類似度</Typography>
            <Box
              sx={{
                mt: 3,
                mb: 3,
                position: "relative",
              }}
            >
              <img
                src={HeartImg}
                style={{
                  width: "30vw",
                  maxWidth: "200px",
                  height: "auto",
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
                  fontSize: "3rem",
                }}
              >
                {syncroMeter}
              </Typography>
            </Box>
            <Typography
              sx={{
                margin: "0 auto",
                padding: "1vh 5vw",
                width: "fit-content",
                border: "solid 3px #EC8181",
                borderRadius: "15px",
                fontSize: "1.5rem",
              }}
            >
              一番シンクロしたお題
            </Typography>
            <Box
              sx={{
                margin: " 2vh auto 0 auto",
                bgcolor: "#FFECEC",
                borderRadius: "20px",
                width: "100%",
                maxWidth: "450px",
                height: "300px",
              }}
            >
              <Graph p1={graphArray[0].p1} p2={graphArray[0].p2} />
            </Box>
          </Box>
          <Box
            className="heartRate"
            sx={{
              mt: "7vh",
            }}
          >
            <Typography
              sx={{
                margin: "0 auto 3vh auto",
                padding: "1vh 5vw",
                width: "fit-content",
                border: "solid 3px #EC8181",
                borderRadius: "15px",
                fontSize: "1.5rem",
              }}
            >
              最大心拍&そのお題
            </Typography>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              style={{
                width: "90vw",
                maxWidth: "450px",
              }}
            >
              {playerInfo.map((info, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Box
                      sx={{
                        margin: "0 auto",
                        width: "78vw",
                        maxWidth: "300px",
                      }}
                    >
                      <Box
                        sx={{
                          padding: "2vh 0",
                          borderRadius: "30px",
                          bgcolor: "#FFECEC",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "1rem",
                          }}
                        >
                          {info.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "1.3rem",
                          }}
                        >
                          
                            {info.theme.map((theme) => (
                              <Box>{theme}</Box>
                            ))}
                          
                        </Typography>
                        <Typography
                          sx={{
                            my: "2vh",
                            fontSize: "2.5rem",
                          }}
                        >
                          {info.bestHR}
                        </Typography>
                      </Box>
                    </Box>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
          <Box className="themesGraph">
            <Typography
              sx={{
                margin: "3vh auto 1vh auto",
                padding: "1vh 5vw",
                width: "fit-content",
                border: "solid 3px #EC8181",
                borderRadius: "15px",
                fontSize: "1.5rem",
              }}
            >
              お題ごとの結果
            </Typography>
            <Typography>お題ごとの心拍の変化をグラフで表示するよ!!</Typography>
            <Swiper
              pagination={true}
              modules={[Pagination]}
              className="mySwiper"
              style={{
                width: "90vw",
                maxWidth: "450px",
              }}
            >
              {graphArray.map((value, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Box
                      sx={{
                        width: "100%",
                        margin: " 2vh auto 0 auto",
                        height: "300px",
                        bgcolor: "#FFECEC",
                        borderRadius: "20px",
                      }}
                    >
                      <Typography>{value.theme}</Typography>
                      <Box
                        sx={{
                          height: "90%",
                          width: "auto",
                        }}
                      >
                        <Graph
                          p1={graphArray[index].p1}
                          p2={graphArray[index].p2}
                        />
                      </Box>
                    </Box>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
        </Stack>
        <Button
          component={motion.button}
          whileHover={{ scale: 1.0 }}
          whileTap={{ scale: 0.8 }}
          onClick={resetSubmit}
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#ffdbdb",
            marginTop: "2vh",
            border: "10px solid white",
            borderRadius: "15px",
            padding: "2px 30px 2px 30px",
          }}
        >
          タイトルへ
        </Button>
      </Container>
    </>
  );
};
