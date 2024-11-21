/* eslint-disable react/react-in-jsx-scope */
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { NotFound } from "./pages/NotFound";
import { Form } from "./pages/form/Formpage";
import { Title } from "./pages/title/Titlepage";
import { Connect } from "./pages/connect/Connectpage";
import { SelectPlayer } from "./pages/prepare/SelectPlayerpage";
//import { GetAvgData } from "./pages/prepare/GetAvgDatapage";
//import { ShowAvgData } from "./pages/prepare/ShowAvgDatapage";
import { SelectTheme } from "./pages/main/selectThemepage";
import { Main } from "./pages/main/mainpage";
import { Result } from "./pages/result/resultpage";
import "./App.scss";

function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [player, setPlayer] = useState("");

  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route
          path="/start"
          element={
            <Form
              name={name}
              setName={setName}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route path="/connect" element={<Connect />} />
        <Route
          path="/selectPlayer"
          element={<SelectPlayer player={player} setPlayer={setPlayer} name={name}/>}
        />
        {/* <Route path="/getAverage" element={<GetAvgData />} />
        <Route path="/showAverage" element={<ShowAvgData player={player} />} /> */}
        <Route path="/selectTheme" element={<SelectTheme player={player} />} />
        <Route path="/main" element={<Main player={player} />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
