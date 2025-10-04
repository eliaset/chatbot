import { useState, useEffect } from "react";
import botPic from "./assets/bot.png";
import profilePic from "./assets/profile.png";
function Chatbot() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const [botReplies, setBotReplies] = useState([]);

  const change = (e) => {
    setInput(e.target.value);
  };
  const send = async () => {
    if (input.trim() === "") return;
    setMessage([...message, input]);
    const reply = await window.Chatbot.getResponseAsync(input);
    setBotReplies([...botReplies, reply]);
    setInput("");
  };
  const EnterEsc = async (e) => {
    if (e.key === "Enter") {
      send();
    }
    if (e.key === "Escape") {
      setInput("");
    }
  };

  return (
    <>
      <div className="all">
        <div className="input-container">
          <input
            className="input"
            onKeyDown={EnterEsc}
            onChange={change}
            value={input}
          ></input>
          <button className="send" onClick={send}>
            Send
          </button>
        </div>
        {message.map((m, index) => (
          <div className="message-container" key={index}>
            <div className="message">
              <p key={index}>{m}</p>

              <img src={profilePic} />
            </div>
            <div className="bot">
              <img src={botPic} />
              <p key={index}>{botReplies[index]}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default Chatbot;
