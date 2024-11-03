/* eslint-disable react/react-in-jsx-scope */
import { useNavigate } from "react-router-dom";
import fukidashiBackImg from "../../assets/fukidashi.png";
import { motion } from "framer-motion";
import "./Titlepage.scss";
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
        sx={{
          height: "90vh",
          width: "90vw",
          padding: "0 5vw",
        }}
      >
        {/* 吹き出し */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 400 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: -400 }}
          transition={{ type: "spring" }}
        >
          <Box
            sx={{
              mt: "20vh",
              position: "relative",
            }}
          >
            <img
              src={fukidashiBackImg}
              style={{
                width: "80vw",
                height: "auto",
                maxWidth: "400px",
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
                fontSize: "2.5rem",
              }}
            >
              あなたたちの
              <br />
              相性診断
            </Typography>
          </Box>
        </Box>

        {/* タイトル */}
        <Typography
          variant="body1"
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          onClick={handleScreenChange}
          sx={{
            mt: "20vh",
            fontSize: "2.5rem",
          }}
        >
          Heart
          <br />
          Link
        </Typography>
      </Stack>
    </>
  );
};
