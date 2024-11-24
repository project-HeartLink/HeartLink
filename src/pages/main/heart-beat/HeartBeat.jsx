/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // 追加
import "./HeartBeat.scss";
import Heart from "./RedHeart.png";
import { Box, Typography } from "@mui/material";

function HeartBeat({ speed }) {
  const [animationDuration, setAnimationDuration] = useState(speed);

  useEffect(() => {
    setAnimationDuration(speed);
  }, [speed]);

  return (
    <>
      <Box
        className="animate73 hbwidth"
        style={{
          animationDuration: `${animationDuration}s`,
          WebkitAnimationDuration: `${animationDuration}s`,
          MozAnimationDuration: `${animationDuration}s`,
        }}
      >
        <img
          src={Heart}
          alt="Heart"
          width="60%"
          height="auto"
          style={{
            maxWidth: "300px",
          }}
        />
      </Box>
    </>
  );
}

// speedプロップの型定義
HeartBeat.propTypes = {
  speed: PropTypes.number.isRequired,
};

export default HeartBeat;
