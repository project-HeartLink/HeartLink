/* eslint-disable react/react-in-jsx-scope */
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { NotFound } from "./pages/NotFound";
import { Form } from "./pages/form/formpage";
import { Title } from "./pages/title/Titlepage";
import { Connect } from "./pages/connect/Connectpage";
import { SelectPlayer } from "./pages/prepare/SelectPlayerpage";
import { GetAvgData } from "./pages/prepare/GetAvgDatapage";
import { ShowAvgData } from "./pages/prepare/ShowAvgDatapage";
import { Main } from "./pages/main/mainpage";
import { Result } from "./pages/result/resultpage";
import "./App.scss";

function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

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
        <Route path="/selectPlayer" element={<SelectPlayer />} />
        <Route path="/getAverage" element={<GetAvgData />} />
        <Route path="/showAverage" element={<ShowAvgData />} />
        <Route path="/main" element={<Main />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
