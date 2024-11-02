/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import redHeartImg from "../../assets/heart_red.png";
import talkThemeBox from "../../assets/talkThemeBox.png";
import "./mainpage.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export const Main = () => {
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(false);

  //player
  let talkTheme = "第一印象を話す";
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
              <Typography
                variant="body1"
                sx={{
                  pt: "2vw",
                  fontSize: "7vw",
                  width: "70vw",
                }}
              >
                {talkTheme}
              </Typography>

              <Typography
                variant="body1"
                component={motion.div}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                transition={{}}
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
        <Typography
          variant="body1"
          onClick={() => setIsDone(!isDone)}
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            backgroundColor: "red",
            width: "3vw",
            height: "3vw",
          }}
        ></Typography>
        {isDone ? <FinishMeasuring /> : <Measuring />}
      </Box>
    </>
  );
};
