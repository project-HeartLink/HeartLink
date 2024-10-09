/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeartImg from "../../assets/kkrn_icon_heart_3.png";
import { Box, Button, Typography } from "@mui/material";

export const GetAvgData = () => {
  const Navigate = useNavigate();

  let titleText = "準備中...";
  let subText = "平均心拍を取得してるよ♡";

  return (
    <>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            onClick={() => Navigate("/showAverage")}
            sx={{
              fontSize: "8vw",
              mt: "30%",
              mb: "10%",
            }}
          >
            {titleText}
          </Typography>
          <Box
            component={motion.div}
            animate={{ scale: [0.8, 1, 0.8, 1, 0.8] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          >
            <img
              src={HeartImg}
              style={{
                width: "70%",
                height: "auto",
              }}
            />
          </Box>
          <Typography variant="body1">{subText}</Typography>
        </Box>
      </Box>
    </>
  );
};
