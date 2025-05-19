'use client';
import { useEffect, useState } from "react";
import "../styles/chat.css";
export default function ChatTemplate({ messages, onSend }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const actionBtn = document.getElementById("action_menu_btn");
    const actionMenu = document.querySelector(".action_menu");

    if (actionBtn && actionMenu) {
      actionBtn.addEventListener("click", () => {
        actionMenu.style.display =
          actionMenu.style.display === "block" ? "none" : "block";
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };
  //autoscroll
  // Esta función se encarga de hacer scroll automático al final del chat
  const autoscroll = () => {
    const chatBody = document.querySelector(".msg_card_body");
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }
  useEffect(() => {
    autoscroll();
  }, [messages]);

  // Aquí se obtiene la lista de contratos
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    fetch("https://hook.eu2.make.com/nbcfaoy6weow0a6q8wevo7xi59xixx4x")
      .then(res => res.json())
      .then(data => {
        setContracts(data);
      })
      .catch((err) => console.error("Error al obtener contratos:", err));
  }, []);
  // Filtramos los contratos por tipo
  const contratosCoche = contracts.filter(file => file.name.toLowerCase().includes("coche"));
  const contratosCasa = contracts.filter(file => file.name.toLowerCase().includes("casa"));

  return (
    <div className="chat-container">
      <div className="chat-layout chat-wrapper d-flex flex-wrap flex-lg-nowrap justify-content-center w-100">
        {/* Panel izquierdo */}
        <div className="chat-sidebar">
          <div className="card contacts_card">
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
              <div className="contract-list">
                <div className="chat-inner">
                  <div className="files-panel-coche">
                    <h5>📄 ContratoCoche</h5>
                    <ul className="contracts-list-coche">
                      {contratosCoche.map((file, i) => (
                        <li key={i}>
                          <a href={file.webViewLink} target="_blank" rel="noopener noreferrer">
                            {file.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="files-panel-casa">
                  <h5>📄 ContratoCasa</h5>
                  <ul className="contracts-list-casa">
                    {contratosCasa.map((file, i) => (
                      <li key={i}>
                        <a href={file.webViewLink} target="_blank" rel="noopener noreferrer">
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>

        {/* Panel derecho */}
        <div className="chat-main">
          <div className="card">
            <div className="card-header msg_head">
              <div className="d-flex bd-highlight">
                <div className="img_cont">
                  <img
                    src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                    className="rounded-circle user_img"
                    alt="User"
                  />
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
                {/* Este es el input para escribir el mensaje */}
                <textarea
                  className="form-control type_msg"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  // este evento es para enviar el mensaje al presionar Enter
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
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
  );
}
