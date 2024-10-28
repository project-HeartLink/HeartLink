/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Typography, Stack, Modal } from "@mui/material";
import HeartImg from "../../assets/kkrn_icon_heart_3.png";

export const SelectTheme = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [SelectedTheme, setSelectedTheme] = useState(null);
  const handleOpen = (theme) => {
    setOpen(true);
    setSelectedTheme(theme);
  };
  const handleClose = () => setOpen(false);

  let themes = [
    "理想のデートは何？",
    "第一印象を話す",
    "人を好きになる瞬間は？",
  ];

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
              fontSize: "2rem",
              mt: "30%",
              mb: "10%",
            }}
          >
            お題
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: "1rem",
              mt: "5vh",
              mb: "10vh",
            }}
          >
            お題を一つ選択してね♡
          </Typography>
          <Stack
            direction="column"
            spacing={0}
            sx={{
              width: "100vw",
            }}
          >
            {themes.map((theme, index) => (
              <Box
                key={index}
                display="flex"
                flexDirection="row"
                onClick={() => handleOpen(theme)}
                sx={{
                  borderTop: "5px solid #FFFFFF",
                  py: "5vh",
                  pl: "20vw",
                  cursor: "pointer",
                }}
              >
                <img
                  src={HeartImg}
                  style={{
                    objectFit: "contain",
                    width: "8vw",
                  }}
                  alt={`Theme ${index + 1}`}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.3rem",
                    textAlign: "start",
                    pl: "5px",
                    width: "60vw",
                  }}
                >
                  {theme}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

      <Modal
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "75vw",
            bgcolor: "background.paper",
            border: "3px solid #FF4BB7",
            borderRadius: "30px",
            p: "8vw",
          }}
        >
          <Typography
            variant="p"
            sx={{
              fontSize: "4vw",
            }}
          >
            選択したのは
          </Typography>
          <Typography
            sx={{
              mt: "2vw",
              fontSize: "5vw",
            }}
          >
            『{SelectedTheme}』
          </Typography>
          <Stack
            direction="row"
            spacing={4}
            sx={{
              mt: "1rem",
              alignItems: "cneter",
              justifyContent: "center",
            }}
          >
            <Typography
              component={motion.div}
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.8,
              }}
              onClick={() => navigate("/main")}
              variant="p"
              sx={{
                fontSize: "1.5rem",
                borderBottom: "2px solid #FF6BBE",
                color: "#FF6BBE",
              }}
            >
              Yes
            </Typography>
            <Typography
              component={motion.div}
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.8,
              }}
              onClick={handleClose}
              variant="p"
              sx={{
                fontSize: "1.5rem",
                borderBottom: "2px solid #6B75FF",
                color: "#6B75FF",
              }}
            >
              No
            </Typography>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
