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
import Syncronization from "./SynchronizationRate";

export const Result = ({ player }) => {
  const navigate = useNavigate();

  const [message, setMessage] = useState();
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();
  const [showId, setShowId] = useState();
  const location = useLocation();
  const getPlayer = location.state;

  //最大心拍&そのお題の情報を格納しておく
  let playerInfo = [
    {
      name: "ayumu",
      theme: "初恋の思い出",
      bestHR: 100,
    },
    {
      name: "hiroto",
      theme: "第一印象について話す",
      bestHR: 130,
    },
  ];

  //お題ごとの結果を表示する時の情報を格納しておく
  let graphArray = [
    {
      theme: "お題1",
      p1: [
        99, 84, 97, 88, 90, 93, 92, 94, 95, 86, 89, 91, 88, 87, 82, 96, 83, 81,
        85, 100, 86, 99, 90, 80, 83, 91, 88, 97, 94, 85, 93, 92, 100, 96, 84,
        89, 87, 83, 99, 90, 92, 88, 86, 95, 91, 80, 87, 89, 94, 93, 84, 81, 85,
        96, 82, 100, 99, 83, 90, 97,
      ],
      p2: [
        90, 88, 81, 95, 97, 89, 84, 92, 94, 93, 99, 85, 86, 87, 91, 88, 83, 96,
        82, 100, 94, 81, 92, 93, 88, 99, 80, 86, 97, 84, 95, 83, 87, 100, 96,
        90, 91, 90, 85, 83, 89, 82, 96, 94, 86, 84, 93, 100, 92, 97, 87, 91, 81,
        80, 89, 95, 99, 88, 87, 90,
      ],
    },
    {
      theme: "お題2",
      p1: [
        96, 83, 90, 99, 91, 84, 87, 88, 86, 93, 89, 92, 100, 97, 81, 95, 94, 85,
        80, 99, 83, 91, 84, 82, 94, 88, 96, 92, 95, 80, 87, 93, 97, 90, 85, 89,
        86, 81, 100, 89, 90, 99, 88, 96, 82, 97, 94, 91, 95, 84, 85, 83, 93, 80,
        87, 100, 86, 92, 83, 81,
      ],
      p2: [
        91, 87, 83, 85, 84, 90, 97, 94, 82, 96, 88, 80, 93, 99, 92, 81, 89, 94,
        95, 100, 97, 86, 88, 92, 85, 84, 83, 93, 91, 87, 80, 82, 96, 86, 99, 88,
        94, 81, 83, 90, 97, 95, 93, 100, 80, 89, 84, 92, 87, 86, 96, 94, 90, 85,
        83, 97, 82, 99, 81, 88,
      ],
    },
    {
      theme: "お題3",
      p1: [
        99, 89, 86, 92, 80, 83, 94, 85, 91, 81, 96, 87, 93, 90, 100, 88, 84, 97,
        95, 82, 91, 86, 85, 99, 89, 88, 83, 94, 96, 81, 92, 100, 90, 93, 80, 87,
        84, 95, 97, 86, 88, 85, 99, 89, 83, 81, 92, 96, 87, 94, 93, 100, 90, 84,
        80, 97, 95, 88, 86, 89,
      ],
      p2: [
        95, 92, 96, 89, 97, 84, 81, 86, 85, 90, 100, 87, 99, 80, 94, 93, 91, 88,
        83, 82, 96, 89, 100, 81, 92, 95, 84, 93, 94, 86, 85, 80, 87, 83, 99, 97,
        90, 91, 88, 86, 84, 85, 83, 95, 89, 87, 100, 82, 96, 92, 80, 90, 81, 97,
        88, 91, 99, 93, 94, 89,
      ],
    },
    {
      theme: "お題4",
      p1: [
        92, 84, 89, 96, 85, 90, 81, 82, 94, 88, 91, 97, 86, 83, 98, 95, 84, 93,
        87, 100, 92, 90, 85, 99, 80, 88, 97, 96, 83, 89, 92, 91, 94, 86, 90, 88,
        87, 99, 95, 93, 89, 84, 98, 91, 92, 80, 100, 85, 88, 96, 93, 87, 90, 89,
        84, 91, 97, 82, 83, 94,
      ],
      p2: [
        81, 88, 84, 90, 96, 95, 99, 83, 86, 100, 92, 97, 85, 94, 93, 91, 82, 88,
        80, 89, 84, 86, 91, 95, 89, 87, 92, 88, 100, 85, 80, 98, 94, 93, 90, 99,
        87, 82, 97, 83, 92, 96, 84, 94, 91, 99, 89, 90, 86, 85, 81, 88, 82, 100,
        87, 83, 97, 96, 93, 88,
      ],
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

  //console.log("player1",getPlayer.player1)

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
                          {info.theme}
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
