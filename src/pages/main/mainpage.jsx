/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { motion } from "framer-motion";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HeartImg from "../../assets/kkrn_icon_heart_3.png";

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
  component={motion.div}
  animate={{ scale: [0.8, 1, 0.8, 1, 0.8] }}
  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
  sx={{
    mt: "15%",
    mb: "0%",
    position: "relative", 
    display: "flex",
    justifyContent: "center", 
    alignItems: "center", 
  }}
>
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
        mt:"4vw",
        fontSize: "6vw",
      }}
    >
      {heartBeatP1}
    </Typography>
  </Box>
</Box>
          <Box
            sx={{
              margin: "0% auto",
              border: "15px solid white",
              borderRadius: "30px",
              width: "90%",
              height: "10%",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                mt: "10vw",
                fontSize: "8vw",
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
          <Button
            component={motion.button}
            whileTap={{ scale: 0.8 }}
            onClick={() => Navigate("/result")}
            sx={{
              fontSize: "8vw",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#ffdbdb",
              marginTop: "5%",
              border: "10px solid white",
              borderRadius: "15px",
              padding: "2px 20px 2px 30px",
            }}
          >
            タップ
          </Button>
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
