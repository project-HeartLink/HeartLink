/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import fukidashiBackImg from "../../assets/fukidashi.png";
import "./Formpage.scss";
import {
  Box,
  Typography,
  Button,
  Stack,
  Modal,
  FormControl,
  Input,
} from "@mui/material";

export const Form = ({ name, setName, password, setPassword }) => {
  const Navigate = useNavigate();

  //モーダルウインドウ
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setName(""); 
    setPassword("")
  }, []);

  const handleNameChange = (e) => {
    console.log(name);
    setName(e.target.value);
  };

  const handlePassChange = (e) => {
    console.log(password);
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (name && password) {
      Navigate(`/connect?roomId=${password}`);
    } else {
      handleOpen() // どちらかが未入力の場合に出すウインドウ
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
        <Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            sx={{ mt: "20%" }}
          >
            {/* 名前入力 */}
            <Typography
              variant="body1"
              sx={{
                fontSize: "8vw",
              }}
            >
              名前
            </Typography>
            <FormControl required color="primary" sx={{ width: "60%" }}>
              <Input
                placeholder="名前を入力"
                name="Name"
                autoComplete="off"
                fullWidth
                disableUnderline
                onChange={handleNameChange}
                sx={{
                  padding: "10px",
                  borderRadius: "15px",
                  border: "3px solid white",
                  backgroundColor: "white",
                }}
              />
            </FormControl>

            {/* 合言葉入力 */}
            <Typography
              variant="body1"
              sx={{
                fontSize: "8vw",
              }}
            >
              合言葉
            </Typography>
            <FormControl required color="primary" sx={{ width: "60%" }}>
              <Input
                placeholder="合言葉を入力"
                name="Password"
                autoComplete="off"
                fullWidth
                disableUnderline
                onChange={handlePassChange}
                sx={{
                  padding: "10px",
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
                mt: 5,
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
                  transform: "translate(-50%, -55%)",
                  fontSize: "8vw",
                }}
              >
                ウォッチをつけてタップ
              </Typography>
            </Box>
          </Box>

          <Button
            component={motion.button}
            whileHover={{ scale: 1.0 }}
            whileTap={{ scale: 0.8 }}
            onClick={handleSubmit}
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
            タップ
          </Button>
      <Modal
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration:0.5 }}


        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "75vw",
            bgcolor: 'background.paper',
            border: '5px solid #A2D2DF',
            borderRadius: "30px",
            p: "8vw",
        }}>
          <Typography
            onClick={handleClose}
            sx={{
              position:"absolute",
              top:"0vw",
              right:"4vw",
              fontSize:"9vw",
              cursor: "pointer"
            }}>
            ×
          </Typography>
          <Typography
          variant="p" 
          sx={{
            fontSize: "5vw",
          }}>
            名前と合言葉の両方を入力してね
          </Typography>
          <Typography
          sx={{
            mt: "4vw",
            fontSize: "4vw",
          }}>
            名前と合言葉を入力すると
          </Typography>
          <Typography
          sx={{
            fontSize: "4vw",
          }}>
            次のページへ進めるよ♪
          </Typography>
        </Box>
      </Modal>
        </Box>
      </Box>
    </>
  );
};
