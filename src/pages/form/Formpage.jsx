/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import fukidashiBackImg from "../../assets/fukidashi.png";
import "./Formpage.scss";
import ningen from "../../assets/coupleResult.svg";
import {
  Box,
  Typography,
  Button,
  Stack,
  Modal,
  FormControl,
  Input,
} from "@mui/material";

export const Form = ({ name, setName }) => {
  const navigate = useNavigate();

  //モーダルウインドウ
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setName("");
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (name) {
      navigate(`/connect`);
    } else {
      handleOpen(); // どちらかが未入力の場合に出すウインドウ
    }
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
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          sx={{ mt: "15vh" }}
        >
          {/* 名前入力 */}
          <Typography
            variant="body1"
            sx={{
              fontSize: "2rem",
            }}
          >
            名前
          </Typography>
          <FormControl
            required
            color="primary"
            sx={{ width: "60%", maxWidth: "400px" }}
          >
            <Input
              autoFocus
              placeholder="名前を入力"
              name="Name"
              autoComplete="off"
              fullWidth
              disableUnderline
              onChange={handleNameChange}
              sx={{
                mt: "2vh",
                padding: "1rem",
                borderRadius: "15px",
                border: "3px solid white",
                backgroundColor: "white",
              }}
            />
          </FormControl>
        </Stack>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 400 }} //初期
          animate={{ opacity: 1, y: 0 }} //表示される時
          exit={{ opacity: 1, y: -400 }} //ページを離れる時の動き
          transition={{ type: "spring" }}
        >
          <Box
            sx={{
              mt: "7vh",
              position: "relative",
            }}
          >
            <img
              src={fukidashiBackImg}
              style={{
                width: "75%",
                height: "auto",
                maxWidth: "350px",
              }}
            />
            <Typography
              variant="body1"
              sx={{
                margin: 0,
                whiteSpace: "pre-line",
                position: "absolute",
                width: "100%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -55%)",
                fontSize: "2rem",
              }}
            >
              ウォッチをつけて
              <br />
              タップ
            </Typography>
          </Box>
        </Box>

        <Button
          component={motion.button}
          whileHover={{ scale: 1.0 }}
          whileTap={{ scale: 0.8 }}
          onClick={handleSubmit}
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#ffdbdb",
            marginTop: "2vh",
            border: "10px solid white",
            borderRadius: "15px",
            padding: "2px 30px 2px 30px",
          }}
        >
          タップ
        </Button>
        <img
          src={ningen}
          style={{
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
              height: "10vh",
              width: "75vw",
              maxWidth: "350px",
              bgcolor: "background.paper",
              border: "3px solid #FF4BB7",
              borderRadius: "30px",
              px: "5vw",
              py: "5vh",
            }}
          >
            <Typography
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: "0vw",
                right: "4vw",
                fontSize: "2.5rem",
                cursor: "pointer",
              }}
            >
              ×
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: "1.5rem",
              }}
            >
              名前を入力してね
            </Typography>
            <Typography
              sx={{
                mt: "1vh",
                fontSize: "1.1rem",
              }}
            >
              名前を入力すると
            </Typography>
            <Typography
              sx={{
                fontSize: "1.1rem",
              }}
            >
              次のページへ進めるよ♪
            </Typography>
          </Box>
        </Modal>
      </Box>
    </>
  );
};
