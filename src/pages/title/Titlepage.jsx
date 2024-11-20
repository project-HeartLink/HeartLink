/* eslint-disable react/react-in-jsx-scope */
import { useNavigate } from "react-router-dom";
import fukidashiBackImg from "../../assets/fukidashi.png";
import { motion } from "framer-motion";
import "./Titlepage.scss";
import titleLogo from "../../assets/titlelogo.png";
import titleBackImg from "../../assets/title_backImg.svg";
import { Box, Typography, Stack } from "@mui/material";

export const Title = () => {
  const navigate = useNavigate();

  const handleScreenChange = () => {
    navigate("/start");
  };

  return (
    <>
      <Stack
        onClick={handleScreenChange}
        direction="column"
        textAlign="center"
        sx={{
          height: "calc(100vh-1px)",
          width: "auto",
          maxWidth: "100vw",
        }}
      >
        {/* 吹き出し */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 400 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: -400 }}
          transition={{ type: "spring" }}
          sx={{
            boxSizing: "content-box",
            width: "100%",
          }}
        >
          <Box
            sx={{
              mt: "15vh",
              position: "relative",
            }}
          >
            <img
              src={fukidashiBackImg}
              style={{
                width: "70vw",
                height: "auto",
                minWidth: "300px",
                maxWidth: "500px",
              }}
            />
            <Typography
              variant="body1"
              sx={{
                margin: 0,
                position: "absolute",
                width: "100%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -55%)",
                fontSize: "2.2rem",
              }}
            >
              あなたたちの
              <br />
              相性診断
            </Typography>
          </Box>
        </Box>

        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          sx={{
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Box
            component="img"
            src={titleLogo}
            sx={{
              width: {
                sm: "40vw",
                xs: "40vw",
                md: "25vw",
                lg: "20vw",
                xl: "20vw",
              },
            }}
          />
        </motion.div>
        <Box
          component="img"
          alignContent="center"
          textAlign="center"
          src={titleBackImg}
          sx={{
            zIndex: "-1",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            margin: "0 auto",
            objectFit: "cover",
            height: "20vh",
            width: "auto",
          }}
        />
      </Stack>
    </>
  );
};
