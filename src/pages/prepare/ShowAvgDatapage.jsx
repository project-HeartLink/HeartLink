/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeartImg from "../../assets/kkrn_icon_heart_3.png";
import { Box, Button, Typography } from "@mui/material";

export const ShowAvgData = () => {
  const Navigate = useNavigate();

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
            sx={{
              fontSize: "8vw",
              mt: "30%",
              mb: "10%",
            }}
          >
            平均心拍
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
          <Typography
            variant="body1"
            sx={{
              fontSize: "5vw",
            }}
          >
            どれくらい心拍が上がるかな？
          </Typography>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.0 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => Navigate("/main")}
            sx={{
              fontSize: "8vw",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#ffdbdb",
              marginTop: "10%",
              border: "10px solid white",
              borderRadius: "15px",
              padding: "2px 30px 2px 30px",
            }}
          >
            計測開始
          </Button>
        </Box>
      </Box>
    </>
  );
};
