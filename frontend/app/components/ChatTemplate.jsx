"use client";
import { useEffect, useState } from "react";
import styles from "../styles/chat.css";

export default function ChatTemplate({ messages, onSend }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const actionBtn = document.getElementById("action_menu_btn");
    const actionMenu = document.querySelector(".action_menu");

    if (actionBtn && actionMenu) {
      actionBtn.addEventListener("click", () => {
        actionMenu.style.display = actionMenu.style.display === "block" ? "none" : "block";
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className={`container-fluid h-100 ${styles.chat}`}>
      <div className="container-fluid h-100">
        <div className="row justify-content-center h-100">
          {/* Panel izquierdo */}
          <div className="col-md-4 col-xl-3 chat">
            <div className="card mb-sm-3 mb-md-0 contacts_card">
              <div className="card-header">
                <div className="input-group">
                  <input type="text" placeholder="Search..." className="form-control search" />
                  <div className="input-group-prepend">
                    <span className="input-group-text search_btn"><i className="fas fa-search" /></span>
                  </div>
                </div>
              </div>
              <div className="card-body contacts_body">
                <ul className="contacts">{/* Contactos opcionales */}</ul>
              </div>
              <div className="card-footer"></div>
            </div>
          </div>

          {/* Panel derecho */}
          <div className="col-md-8 col-xl-6 chat">
            <div className="card">
              <div className="card-header msg_head">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" alt="User" />
                    <span className="online_icon" />
                  </div>
                  <div className="user_info">
                    <span>Proyecto</span>
                    <p>{messages.length} mensajes</p>
                  </div>
                  <div className="video_cam">
                    <span><i className="fas fa-video" /></span>
                    <span><i className="fas fa-phone" /></span>
                  </div>
                </div>
                <span id="action_menu_btn"><i className="fas fa-ellipsis-v" /></span>
                <div className="action_menu">
                  <ul>
                    <li><i className="fas fa-user-circle" /> View profile</li>
                    <li><i className="fas fa-users" /> Add to close friends</li>
                    <li><i className="fas fa-plus" /> Add to group</li>
                    <li><i className="fas fa-ban" /> Block</li>
                  </ul>
                </div>
              </div>

              {/* CUERPO DEL CHAT */}
              <div className="card-body msg_card_body">
                {messages.map((msg, i) => (
                  <div key={i} className={`d-flex justify-content-${msg.sender === "user" ? "end" : "start"} mb-4`}>
                    <div className={`msg_cotainer${msg.sender === "user" ? "_send" : ""}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* INPUT */}
              <div className="card-footer">
                <form className="input-group" onSubmit={handleSubmit}>
                  <div className="input-group-append">
                    <span className="input-group-text attach_btn"><i className="fas fa-paperclip" /></span>
                  </div>
                  <textarea
                    className="form-control type_msg"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button type="submit" className="input-group-text send_btn">
                      <i className="fas fa-location-arrow" />
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
