import { useEffect, useState } from "react";

export default function FilesPanel() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    fetch("https://hook.eu2.make.com/nbcfaoy6weow0a6q8wevo7xi59xixx4x") // Reemplaza con tu URL real
      .then(res => res.json())
      .then(data => setContracts(data))
      .catch(err => console.error("Error al obtener contratos:", err));
  }, []);

  return (
    <div className="contratos-panel">
      <h4>📄 Contratos generados</h4>
      <ul>
        {contracts.map((doc, idx) => (
          <li key={idx}>
            <a href={doc.link} target="_blank" rel="noopener noreferrer">
              {doc.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
