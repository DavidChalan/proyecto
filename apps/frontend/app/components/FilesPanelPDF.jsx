import { useEffect, useState } from "react";

export default function FilesPanel() {
  const [contracts, setContracts] = useState([]);
  // const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_MAKE_API_REQUESTS}/contracts`)
      .then((res) => res.json())
      .then((data) => setContracts(data))
      .catch((err) => console.error('Error al obtener contratos:', err));
  }, []);

  return (
    <div className="contratos-panel">
      <h4>📄 Contratos generados</h4>

      {loading ? (
        <p>Cargando contratos...</p>
      ) : contracts.length === 0 ? (
        <p>No hay contratos aún.</p>
      ) : (
        <ul>
          {contracts.map((contract) => (
            <li key={contract.id}>
              <a href={contract.webViewLink} target="_blank" rel="noopener noreferrer">
                {contract.name}
              </a> – <em>{contract.type}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
