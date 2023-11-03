import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

// const SSE = require('./sse');

import { SSE } from "./sse.js";

function App() {
  const [convo, setConvo] = useState("");

  const eventSourceRef = useRef();

  useEffect(() => {
    // EventSource = SSE;

    return () => {
      eventSourceRef.current?.close()
    }
  }, [eventSourceRef])

  // const sendChatOld = () => {
  //   let event = new EventSource("http://localhost:6012/chat");
  //   eventSourceRef.current = event;
  //   event.onmessage = (message) => {
  //     console.log({ message });
  //     if (message.data == "DONE") {
  //       event.close();
  //     } else {
  //       setConvo((prev) => prev + " " + message.data);
  //     }
  //   }
  //   event.onerror = () => {
  //     event.close();
  //   }
  //   return () => {
  //     event.close()
  //   }
  // }

  const sendChat = () => {
    let source = new SSE('http://localhost:6012/chat', {
      start: false, headers: { 'Content-Type': 'application/json' },
      payload: {
        chat: "abc"
      },
    });
    eventSourceRef.current = source;
    source.addEventListener('message', (message) => {
      console.log({ message });
      if (message.data == "DONE") {
        source.close();
      } else {
        setConvo((prev) => prev + " " + message.data);
      }
    });
    // ... later on
    source.stream();

  }

  const onStart = () => {
  }

  return (
    <div className="App">
      <h1>Chat</h1>
      <p>{convo}</p>
      <button onClick={sendChat}>Send</button>
    </div>
  );
}

export default App;
