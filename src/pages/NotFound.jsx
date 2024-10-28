/* eslint-disable react/react-in-jsx-scope */
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("タイトル画面に戻ります");
    navigate("/");
  };

  return (
    <>
      <h1>sorry, this page is NotFound</h1>
      <p onClick={handleClick}>Back to main page</p>
    </>
  );
};
