import { useState, useEffect, useRef } from "react";
import botPic from "./assets/bot.png";
import profilePic from "./assets/profile.png";
function Chatbot() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const [botReplies, setBotReplies] = useState([]);
  const scrollRef = useRef(null);
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
  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [message, botReplies]);

  return (
    <>
      <div className="all">
        <div className="message-container">
          {message.map((m, index) => (
            <div className="message-block" key={index}>
              <div className="message">
                <p>{m}</p>
                <img src={profilePic} alt="User Avatar" />
              </div>
              {botReplies[index] && (
                <div className="bot">
                  <img src={botPic} alt="Bot Avatar" />
                  <p>{botReplies[index]}</p>
                </div>
              )}
            </div>
          ))}
          <div ref={scrollRef}></div>
        </div>

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
      </div>
    </>
  );
}
export default Chatbot;
