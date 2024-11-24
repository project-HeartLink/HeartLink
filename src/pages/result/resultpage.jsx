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
import Syncronization from "./SynchronizationRate";

export const Result = ({ player }) => {
  const navigate = useNavigate();

  const [arrHeartBeatP1, setArrHeartBeatP1] = useState({
    theme1: { heart: [], topic: "" }, //player1の選択したお題の心拍とお題の格納
    theme2: { heart: [], topic: "" },
    theme3: { heart: [], topic: "" },
    theme4: { heart: [], topic: "" },
  });
  const [arrHeartBeatP2, setArrHeartBeatP2] = useState({
    //player2の選択したお題の心拍とお題の格納
    theme1: { heart: [], topic: "" },
    theme2: { heart: [], topic: "" },
    theme3: { heart: [], topic: "" },
    theme4: { heart: [], topic: "" },
  });
  const [maxPlayer1, setMaxPlayer1] = useState(0); //最大の心拍
  const [maxPlayer2, setMaxPlayer2] = useState(0); //最大の心拍
  const [maxKeyPl1, setmaxKeyPl1] = useState([]); //最大の心拍の位置
  const [maxKeyPl2, setmaxKeyPl2] = useState([]); //最大の心拍の位置
  const [arrMaxThemePl1, setArrMaxThemePl1] = useState([]); //pl1の最大の時のお題の名前
  const [arrMaxThemePl2, setArrMaxThemePl2] = useState([]); //pl2最大の時のお題の名前
  const location = useLocation();
  const props = location.state;
  const themes = themesArr; //locateで値を受け取る
  const [syncro, setSyncro] = useState(0); //最大シンクロ率
  const [syncroTheme, setSyncroTheme] = useState(""); //最大シンクロ率のお題
  const [syncroKey, setSyncroKey] = useState(0); //最大シンクロ率の番号

  console.log("player1Name", props.player1Name); //player1の名前
  console.log("player2Name", props.player2Name); //player2の名前
  console.log("arrSelectTopic", props.arrSelectTopic); //選択したお題の配列
  console.log("player", player);

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
    fetch("https://hartlink-api.onrender.com/getTopicArray", { method: "GET" }) //心拍の配列を獲得
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);

        let tempMaxPl1 = 0; //仮の最大心拍
        let tempmaxKeyPl1 = []; // 仮の最大のkey番号
        let tempMaxPl2 = 0; //仮の最大心拍
        let tempmaxKeyPl2 = []; // 仮の最大のkey番号
        let tempMaxSynclo = 0; //仮の最大シンクロ率
        let tempSyncloKeyPl1 = []; // 仮の最大のkey番号

        // プレイヤー1のデータ解析
        for (const key in data.array1) {
          // data.array1は心拍が入っている配列0〜3

          console.log(
            "Syncronization(p1)",
            Syncronization({
              heartRate1: data.array1[key].map(Number),
              heartRate2: data.array2[key].map(Number),
            })
          );
          if (
            tempMaxSynclo <
            Syncronization({
              heartRate1: data.array1[key].map(Number),
              heartRate2: data.array2[key].map(Number),
            })
          ) {
            //最大シンクロ率求めてる
            tempMaxSynclo = Syncronization({
              heartRate1: data.array1[key].map(Number),
              heartRate2: data.array2[key].map(Number),
            });
            tempSyncloKeyPl1 = [key]; // 新しい最大値なので配列をリセット
          } else if (
            tempMaxSynclo ==
            Syncronization({
              heartRate1: data.array1[key].map(Number),
              heartRate2: data.array2[key].map(Number),
            })
          ) {
            tempmaxKeyPl1.push(key);
          }

          setArrHeartBeatP1(() => ({
            theme1: {
              //選択したテーマの番号
              heart: data.array1[0].map(Number),
              topic: themes[props.arrSelectTopic[0]].topic,
            },
            theme2: {
              heart: data.array1[1].map(Number),
              topic: themes[props.arrSelectTopic[1]].topic,
            },
            theme3: {
              heart: data.array1[2].map(Number),
              topic: themes[props.arrSelectTopic[2]].topic,
            },
            theme4: {
              heart: data.array1[3].map(Number),
              topic: themes[props.arrSelectTopic[3]].topic,
            },
          }));

          setArrHeartBeatP2((prev) => ({
            theme1: {
              heart: data.array2[0].map(Number),
              topic: themes[props.arrSelectTopic[0]].topic,
            },
            theme2: {
              heart: data.array2[1].map(Number),
              topic: themes[props.arrSelectTopic[1]].topic,
            },
            theme3: {
              heart: data.array2[2].map(Number),
              topic: themes[props.arrSelectTopic[2]].topic,
            },
            theme4: {
              heart: data.array2[3].map(Number),
              topic: themes[props.arrSelectTopic[3]].topic,
            },
          }));

          data.array1[key].map((index) => {
            //data.array1[key]→心拍が入っている配列0〜3の中から一番高くなった０−３の番号を取ってきた
            const value = parseInt(index);

            if (value > tempMaxPl1) {
              // 最大値を更新
              tempMaxPl1 = value;
              tempmaxKeyPl1 = [key]; // 新しい最大値なので配列をリセット
            } else if (value === tempMaxPl1) {
              // 最大値と同じ場合はテーマを追加
              tempmaxKeyPl1.push(key);
            }
          });
        }

        // プレイヤー2のデータ解析
        for (const key in data.array2) {
          //player2の心拍の配列
          data.array2[key].map((index) => {
            const value = parseInt(index);
            if (value > tempMaxPl2) {
              tempMaxPl2 = value;
              tempmaxKeyPl2 = [key];
            } else if (value === tempMaxPl2) {
              tempmaxKeyPl2.push(key);
            }
          });
        }

        console.log(
          "Player 1 Max HR:",
          tempMaxPl1,
          "Themes:",
          Array.from(new Set(tempmaxKeyPl1)) //同じ数字を避けた
        );
        console.log(
          "Player 2 Max HR:",
          tempMaxPl2,
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
        setMaxPlayer1(tempMaxPl1);
        setmaxKeyPl1(Array.from(new Set(tempmaxKeyPl1))); // 配列をセット
        setMaxPlayer2(tempMaxPl2);
        setmaxKeyPl2(Array.from(new Set(tempmaxKeyPl2))); // 配列をセット
        setSyncro(tempMaxSynclo);
        setSyncroTheme(themes[props.arrSelectTopic[tempSyncloKeyPl1]].topic);
        setSyncroKey(parseInt(tempSyncloKeyPl1));
      });
  };

  console.log("syncro", syncro);
  console.log("setSyncroTheme", syncroTheme);

  console.log("p1", arrHeartBeatP1.theme1);
  console.log("p1", arrHeartBeatP1.theme2);
  console.log("p1", arrHeartBeatP1.theme3);
  console.log("p1", arrHeartBeatP1.theme4);
  console.log("setSyncroKey", syncroKey);

  console.log("arrmaxthemepl1", arrMaxThemePl1);

  console.log("max", maxPlayer2);
  useEffect(() => {
    CatchArray();
  }, []);

  let graphArray = [
    {
      theme: arrHeartBeatP1.theme1.topic,
      p1: arrHeartBeatP1.theme1.heart,
      p2: arrHeartBeatP2.theme1.heart,
    },
    {
      theme: arrHeartBeatP1.theme2.topic,
      p1: arrHeartBeatP1.theme2.heart,
      p2: arrHeartBeatP2.theme2.heart,
    },
    {
      theme: arrHeartBeatP1.theme3.topic,
      p1: arrHeartBeatP1.theme3.heart,
      p2: arrHeartBeatP2.theme3.heart,
    },
    {
      theme: arrHeartBeatP1.theme4.topic,
      p1: arrHeartBeatP1.theme4.heart,
      p2: arrHeartBeatP2.theme4.heart,
    },
  ];

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
                {syncro}
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
              <Box>{syncroTheme}</Box>
              <Graph
                p1={graphArray[syncroKey].p1}
                p2={graphArray[syncroKey].p2}
                p1name={props.player1Name}
                p2name={props.player2Name}
              />
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

                        {info.theme.map((theme, index) => (
                          <Typography
                            key={index}
                            sx={{
                              marginTop: "2vh",
                              padding: "0 1vw 0 1vw",
                              fontSize: "1.3rem",
                            }}
                          >
                            {theme}
                          </Typography>
                        ))}

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
                        paddingTop: "2vh",
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
                          p1name={props.player1Name}
                          p2name={props.player2Name}
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
          onClick={() => resetSubmit()}
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

        {/* <Syncronization heartRate1={heartRate1} heartRate2={heartRate2} /> */}
      </Container>
    </>
  );
};
