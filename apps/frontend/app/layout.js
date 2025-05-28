import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './globals.css'; // o donde vayas a poner tu CSS personalizado

export const metadata = {
  title: 'fastcontract',
  keywords: 'contratos, gestión de contratos, contratos compartidos, fastcontracts',
  description: 'Aplicación para creacion de contratos de forma rápida y sencilla',
  // icons: {
  //  icon: '/favicon.ico',
  // }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>{children}</body>
    </html>
  );
}
