import React, { useState, useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar/Navbar.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import styles from "./styles.module.css";
import { clientServer } from '@/index';
import toast from 'react-hot-toast';
// import load from '../../../public/loader.gif'

export default function DashboardLayout({children}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleChatBot = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  // auto-scroll to latest message whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
  
    const text = inputValue.trim();
    if (!text) return;

    const newMessages = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setInputValue("");
    setLoading(true);

    try {
      const res = await clientServer.post("/ai/chat",{
        message: text
      })
    
      let replyText = res.data.response;
      setMessages(prev => [...prev, { role: "bot", text: replyText }]);
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      setMessages(prev => [...prev, { role: "bot", text: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.navDiv}><Navbar/></div>
      <div className={styles.midDiv}>{children}</div>

      {!open && (
        <div className={styles.aiContainer} onClick={handleChatBot}>
          <img src="/ai2.jpeg" alt="img" className={styles.ai}/>
          <div className={styles.hovertext}>Ask AI</div>
        </div>
      )}

      {open && (
        <div className={styles.aiChatWindow}>
          <div className={styles.top}>
            <img src="/ai2.jpeg" alt="ai" className={styles.aiinside}/>
            <div>
              <h2>AI Assistant</h2>
              <p>Online</p>
            </div>
            <button className={styles.closeBtn} onClick={handleClose} aria-label="Close chat">x</button>
          </div>

          <div className={styles.chatmessages} id="chatMessages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.msg} ${msg.role === "bot" ? styles.bot : styles.user}`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className={`${styles.msg} ${styles.bot}`}>
                <img src="/loader.gif" alt="loading" className={styles.loader} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputRow}>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              className={styles.sendBtn}
              onClick={handleSend}
              disabled={loading}
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <div className={styles.footerDiv}><Footer/></div>
    </div>
  )
}