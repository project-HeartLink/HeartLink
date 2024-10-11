/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { motion } from "framer-motion";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HeartImg from "../../assets/kkrn_icon_heart_3.png";
import talkThemeBox from "../../assets/talkThemeBox.png";
import "./mainpage.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export const Main = () => {
  const Navigate = useNavigate();
  const [isDone, setIsDone] = useState(false);

  let talkTheme = "第一印象を話す";
  let heartBeatP1 = 100;
  let heartBeatP2 = 90;

  const FinishMeasuring = () => {
    return (
      <>
        <Box
          className="background"
          sx={{
            display: "flex",
          }}
        >
          <Typography
           onClick={() => Navigate("/result")}
            variant="body1"
            sx={{
              fontSize: "8vw",
              mt: "30%",
              mb: "10%",
              mx: "auto",
            }}
          >
            完了
          </Typography>
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
                  src={HeartImg}
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
                      fontSize: "8vw",
                    }}
                  >
                    Player1
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: "4vw",
                      fontSize: "6vw",
                    }}
                  >
                    {heartBeatP1}
                  </Typography>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={HeartImg}
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
                      fontSize: "8vw",
                    }}
                  >
                    Player2
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: "4vw",
                      fontSize: "6vw",
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
                }}>
            <Typography
              variant="body1"
              sx={{
                mt: "2vw",
                mb: "2vw",
                fontSize: "8vw",
                width: "70vw",
              }}
            >
              {talkTheme}
            </Typography>

            <Button
              component={motion.button}
              whileTap={{ scale: 0.8 }}
              sx={{
                fontSize: "5vw",
                color: "black",
              }}
            >
              次のお題
            </Button>
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
