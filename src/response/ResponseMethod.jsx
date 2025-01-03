import { useEffect, useRef, useState } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import destr from "destr";

export const GetMethod = (link) => {
  return fetch(link, { method: "GET" })
    .then((res) => res.json()) //json方式でデータを受け取る
    .then((data) => {
      console.log("data:", data);
      return data;
    })

    .catch((err) => console.error("Error fetching data:", err));
};

export const PostMethod = (link, data) => {
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

export const WebsocketMethod = () => {
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

  return message;
};
