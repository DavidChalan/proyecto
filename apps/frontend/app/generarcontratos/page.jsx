'use client';
import Head from "next/head";
import ChatTemplate from "../components/ChatTemplate";
import LogoutButton from "../components/LogoutButton";
import FilesPanelPDF from "../components/FilesPanelPDF";
import { useState } from "react";
import "./page.css";

export default function GenerarContratos() {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(0); // control del paso de preguntas
  const [form, setForm] = useState({}); // datos recogidos
  const [tipoContrato, setTipoContrato] = useState(""); // coche o casa

  // Maneja el envío de mensajes desde el chat
  const handleSend = async (message) => {
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);

    // Si aún no ha empezado el flujo
    if (step === 0) {
      if (message.toLowerCase().includes("casa")) {
        setTipoContrato("casa");
        setMessages((prev) => [...prev, { text: "clase de contrato", sender: "bot" }]);
        setStep(1);
      } else if (message.toLowerCase().includes("coche")) {
        setTipoContrato("coche");
        setMessages((prev) => [...prev, { text: "Clase de contrato", sender: "bot" }]);
        setStep(10);
      } else {
        setMessages((prev) => [...prev, { text: "❓ Escribe 'contrato casa' o 'contrato coche'", sender: "bot" }]);
      }
      return;
    }



    // 🏡 FLUJO CASA
    if (tipoContrato === "casa") {
      const newForm = { ...form };

      switch (step) {
        case 1:
          newForm.ClaseContrato = message;
          setMessages((prev) => [...prev, { text: "Nombre del comprador", sender: "bot" }]);
          setStep(2);
          break;
        case 2:
          newForm.nombreComprador = message;
          setMessages((prev) => [...prev, { text: "¿Nombre del vendedor?", sender: "bot" }]);
          setStep(3);
          break;
        case 3:
          newForm.nombreVendedor = message;
          setMessages((prev) => [...prev, { text: "¿Dirección del inmueble?", sender: "bot" }]);
          setStep(4);
          break;
        case 4:
          newForm.direccion = message;
          setMessages((prev) => [...prev, { text: "¿Precio del inmueble?", sender: "bot" }]);
          setStep(5);
          break;
        case 5:
          newForm.precio = message;
          setMessages((prev) => [...prev, { text: "¿DNI del comprador?", sender: "bot" }]);
          setStep(6);
          break;
        case 6:
          newForm.dniComprador = message;
          setMessages((prev) => [...prev, { text: "¿DNI del vendedor?", sender: "bot" }]);
          setStep(7);
          break;
        case 7:
          newForm.dniVendedor = message;
          await enviarDatos(newForm);
          resetChat();
          break;
      }

      setForm(newForm);
    }

    // 🚘 FLUJO COCHE
    if (tipoContrato === "coche") {
      const newForm = { ...form };

      switch (step) {
        case 10:
          newForm.ClaseContrato = "coche"; // 👈 Esto indica a Make el tipo de contrato
          setMessages((prev) => [...prev, { text: "¿Nombre del cliente?", sender: "bot" }]);
          setStep(11);
          break;
        case 11:
          newForm.NombreCliente = message;
          setMessages((prev) => [...prev, { text: "¿Tipo de vehiculo?", sender: "bot" }]);
          setStep(12);
          break;
        case 12:
          newForm.tipovehiculo = message;
          setMessages((prev) => [...prev, { text: "¿Marca del coche?", sender: "bot" }]);
          setStep(13);
          break;
        case 13:
          newForm.marca = message;
          setMessages((prev) => [...prev, { text: "¿Matrícula del coche?", sender: "bot" }]);
          setStep(14);
          break;
        case 14:
          newForm.matricula = message;
          await enviarDatos(newForm);
          resetChat();
          break;
      }

      setForm(newForm);
    }

  };


  // 👉 Función que llama al webhook de Make.com
  const enviarDatos = async (datos) => {
    const query = new URLSearchParams(datos).toString();
    try {
      const res = await fetch(`https://hook.eu2.make.com/yznvzeit1u9vhcb732oycsakxj4qesk9?${query}`);
      if (res.ok) {
        setMessages((prev) => [...prev, { text: "✅ Contrato generado correctamente.", sender: "bot" }]);
      } else {
        setMessages((prev) => [...prev, { text: "❌ Error al generar el contrato.", sender: "bot" }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { text: "⚠️ Error de red.", sender: "bot" }]);
    }
  };

  // 🔁 Reinicia el flujo tras completar
  const resetChat = () => {
    setStep(0);
    setForm({});
    setTipoContrato("");
  };

  return (
    <>
      <Head>
        <title>Chat Contratos</title>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" />
      </Head>
      <main className="generar-bg">
        <div className="logout-container">
          <LogoutButton />
        </div>
        <div>
          <h1 className="text-center">Generador de Contratos</h1>
        </div>
        <div className="chat-wrapper">
          <div className="chat-inner">
            <ChatTemplate messages={messages} onSend={handleSend} />
            {/* <div className="chat-left">
              <FilesPanelPDF />
            </div> */}
          </div>
        </div>
      </main>
    </>
  );
}
