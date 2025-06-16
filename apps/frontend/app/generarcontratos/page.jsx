'use client';
import Head from "next/head";
import ChatTemplate from "../components/ChatTemplate";
import LogoutButton from "../components/LogoutButton";
import { useState, useEffect } from "react";
import "./page.css";

export default function GenerarContratos() {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(0); // control del paso de preguntas
  const [form, setForm] = useState({}); // datos recogidos
  const [tipoContrato, setTipoContrato] = useState(""); // coche o casa
  const [refetchContracts, setRefetchContracts] = useState(null);


  useEffect(() => {
    // Mostrar como mensaje predeterminado
    if (step === 0 && messages.length === 0) {
      setMessages([{ text: "¿Qué tipo de contrato quieres generar? (casa o coche)", sender: "bot" }]);
    }
  }, []);
  // Maneja el envío de mensajes desde el chat
  const handleSend = async (message) => {
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    //primeras preguntas despues de la de pordefecto
    if (step === 0) {
      const newForm = { ...form };

      if (message.toLowerCase().includes("casa")) {
        setTipoContrato("casa");
        newForm.ClaseContrato = message;
        setForm(newForm);
        setMessages((prev) => [...prev, { text: "¿Nombre del comprador?", sender: "bot" }]);
        setStep(2); //pasamos directamente al 2
        return
      }

      if (message.toLowerCase().includes("coche")) {
        setTipoContrato("coche");
        newForm.ClaseContrato = "coche";
        setForm(newForm);
        setMessages((prev) => [...prev, { text: "¿Nombre del cliente?", sender: "bot" }]);
        setStep(11); // pasamos directamente al paso 11
        return;
      }

      setMessages((prev) => [
        ...prev,
        { text: "Escribe 'casa' o 'coche'", sender: "bot" },
      ]);
      return;
    }

    // 🏡 FLUJO CASA
    if (tipoContrato === "casa") {
      const newForm = { ...form };

      switch (step) {
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


 const enviarDatos = async (datos) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contracts/send-to-make`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    if (res.ok) {
      setMessages((prev) => [...prev, { text: "✅ Contrato generado correctamente.", sender: "bot" }]);
      if (refetchContracts) refetchContracts();
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
            <ChatTemplate
              messages={messages}
              onSend={handleSend}
              onContractsRefreshed={setRefetchContracts}
            />
          </div>
        </div>
      </main>
    </>
  );
}
