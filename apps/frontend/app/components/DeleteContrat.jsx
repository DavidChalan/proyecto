"use client";
export default function deleteContract({ setContracts }) {
  return (
    <button
      className="btn btn-danger"
      onClick={() => deleteContract(prompt("Ingrese el ID del contrato a eliminar:"))}
    >
      Eliminar Contrato
    </button>
  );
}
const deleteContract = async (id) => {
  const confirmed = window.confirm(`¿Estás seguro que deseas eliminar el contrato con ID ${id}?`);
  if (!confirmed) return;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_MAKE_API_REQUESTS}/contracts/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    if (data.deleted) {
      alert(`Contrato con id ${id} eliminado correctamente`);
      setContracts((prev) => prev.filter((c) => c.id !== id));
    } else {
      alert(`No se encontró el contrato con id ${id}`);
    }
  } catch (err) {
    console.error("Error eliminando contrato:", err);
    alert("Ocurrió un error al intentar eliminar el contrato.");
  }
};
