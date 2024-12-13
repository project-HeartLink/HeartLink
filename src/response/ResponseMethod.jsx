import { useEffect, useRef, useState } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import destr from "destr";

export const getMethod = (link) => {
  return fetch(link, { method: "GET" })
    .then((res) => res.json()) //json方式でデータを受け取る
    .then((data) => {
      console.log("data:", data);
      return data;
    })

    .catch((err) => console.error("Error fetching data:", err));
};

export const postMethod = (link, data) => {
  return fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json()) //json方式でデータを受け取る
    .then((data) => {
      console.log("data:", data);
      return data;
    })

    .catch((err) => console.error("Error fetching data:", err));
};

export const websocketMethod = () => {
  const [message, setMessage] = useState({}); // WebSocket メッセージを保持
  const socketRef = useRef();
  useEffect(() => {
    const websocket = new ReconnectingWebSocket(
      "wss://hartlink-api.onrender.com/ws"
    );
    socketRef.current = websocket;

    websocket.onopen = () => {
      socketRef.current?.send("0.0");
    };

    // #2.メッセージ受信時のイベントハンドラを設定
    const onMessage = (event) => {
      const data = destr(event.data);
      console.log("event.data:", event.data);
      setMessage(data); // メッセージを状態に保存

      
    };
    websocket.addEventListener("message", onMessage);

    // #3.useEffectのクリーンアップの中で、WebSocketのクローズ処理を実行
    return () => {
      websocket.close();
      websocket.removeEventListener("message", onMessage);
    };
  }, []);

  return message
};

//
// useEffect(() => {
//   const websocket = new ReconnectingWebSocket(
//     "wss://hartlink-api.onrender.com/ws"
//   );
//   socketRef.current = websocket;

//   websocket.onopen = () => {
//     socketRef.current?.send("0.0");
//   };

//   // #2.メッセージ受信時のイベントハンドラを設定
//   const onMessage = (event) => {
//     // JSON文字列をJavaScriptオブジェクトに変換
//     const data = destr(event.data);

//     console.log("event.data:", event.data);

//     console.log("topicId", data.topicId);
//     setArrSelectTopic(data.topicId);
//     console.log("data.index", data.index);

//     setPlayr1Name(data.player1);
//     setPlayr2Name(data.player2);
//     if (data.index < 4) {
//       setProIndex(data.index);
//     }
//     console.log("player1arrHeartBeat", player1arrHeartBeat);

//     setHeartBeatP1(data.heartRate1);

//     setHeartBeatP2(data.heartRate2);

//     setTopicId(data.topicId); //setTopicIdに入れることでws以外の処理で使えるようにした
//     console.log("topicId", data.topicId);

//     if (data.index == 0) {
//       //mainpageに遷移した直後にお題を写るように
//       setarrThemes(themes[data.topicId[0]].topic);
//     }

//     SpeedChanger1(data.heartRate1);
//     SpeedChanger2(data.heartRate2);
//   };

//   websocket.addEventListener("message", onMessage);

//   // #3.useEffectのクリーンアップの中で、WebSocketのクローズ処理を実行
//   return () => {
//     websocket.close();
//     websocket.removeEventListener("message", onMessage);
//   };
// }, []);
