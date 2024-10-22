/* eslint-disable react/react-in-jsx-scope */
import { useNavigate } from "react-router-dom";
import fukidashiBackImg from "../../assets/fukidashi.png";
import { motion } from "framer-motion";
import "./Titlepage.scss";
import TitleHeartImg from "../../assets/IMG_7040.png";
import { Box, Typography } from "@mui/material";

export const Title = () => {
  const Navigate = useNavigate();

  const handleScreenChange = () => {
    Navigate("/start");
  };

  return (
    <>
      <Box>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 400 }} //初期
          animate={{ opacity: 1, y: 0 }} //表示される時
          exit={{ opacity: 1, y: -400 }} //ページを離れる時の動き
          transition={{ type: "spring" }}
        >
          <Box
            sx={{
              mt: "50vw",
              position: "relative",
            }}
          >
            <img
              src={fukidashiBackImg}
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
                transform: "translate(-50%, -60%)",
                fontSize: "10vw",
              }}
            >
              あなたたちの相性診断
            </Typography>
          </Box>
        </Box>
          <Typography
            variant="body1"
            onClick={handleScreenChange}
            sx={{
              mt: "15vw",
              fontSize: "2.5em",
            }}
          >
            Heart
            <br />
            Link
          </Typography>
        </Box>
    </>
  );
};
