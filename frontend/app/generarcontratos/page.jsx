import Head from "next/head";
import ChatTemplate from "../components/ChatTemplate";

export default function GenerarContratos() {
  return (
    <>
      <Head>
        <title>Chat</title>
        {/* Bootstrap + FontAwesome */}
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
        />
      </Head>
      <main style={{ height: "100vh" }}>
        <ChatTemplate />
      </main>
    </>
  );
}
