// app/components/LogoutButton.jsx
'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    router.push('/'); // Redirige al login
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger mt-3">
      <i className='fas fa-sign-out-alt'>Cerrar sesión</i>
    </button>
  );
}
