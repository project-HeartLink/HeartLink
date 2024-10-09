/* eslint-disable react/react-in-jsx-scope */
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeartImg from "../../assets/kkrn_icon_heart_3.png";
import CoupleImg from "../../assets/coupleResult.svg";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

export const Result = () => {
  const Navigate = useNavigate();

  let player1 = "ami";
  let player2 = "yuto";
  let type = "恋人";
  let dokidokiMeter = 100;

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
                  width: "80%",
                  height: "auto",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  margin: 0,
                  whiteSpace: "pre-line",
                  position: "absolute",
                  width: "70%",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -55%)",
                  fontSize: "8vw",
                  fontFamily: "Hachi Maru Pop, serif",
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
    プレイヤー
  </Typography>
  <Typography
    variant="body1"
    sx={{
      fontFamily: "Hachi Maru Pop, serif",
      fontSize: "8vw", 
      width: "20vw"
    }}
  >
    との
  </Typography>
  <Stack
    direction="row"
    alignItems="flex-end"
    spacing={5}
  >
  <Typography
    variant="body1" 
    sx={{
      fontFamily: "Hachi Maru Pop, serif",
      fontSize: "10vw", 
      color: "red",
      width: "32vw"
    }}
  >
    関係性
  </Typography>
  <Typography
    variant="body1" 
    sx={{
      fontFamily: "Hachi Maru Pop, serif",
      fontSize: "8vw", 
      width: "20vw"
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
            onClick={() => Navigate("/")}
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
