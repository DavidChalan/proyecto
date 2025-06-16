"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // console.log('PRUEBA_ENV:', process.env.NEXT_PUBLIC_API_URL);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica que los campos no estén vacíos
    if (!email || !password) {
      alert('Email y contraseña son requeridos');
      return;
    }

    try {
      // console.log('URL usada para fetch:', `${process.env.NEXT_PUBLIC_API_URL}/auth/login`);
      // console.log('Valor real de la variable:', process.env.NEXT_PUBLIC_API_URL);
    
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // 🔐 esto permite que se guarde la cookie
      });
    
      const contentType = res.headers.get('content-type');
    
      if (!res.ok) {
        const errorText = await res.text(); // capturamos el texto aunque no sea JSON
        // console.error('Error:', res.status, res.statusText);
        // console.error('Contenido recibido:', errorText);
        throw new Error(`Error del servidor: ${res.status}`);
      }
    
      if (!contentType || !contentType.includes('application/json')) {
        const raw = await res.text();
        throw new Error('La respuesta no es JSON:\n' + raw);
      }
    
      const data = await res.json();
      console.log("Login exitoso:", data);
    
      // Puedes guardar el token si está presente
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
    
      router.push("/generarcontratos");
    
    } catch (error) {
      console.error("Error completo:", error);
      alert(error.message || 'Error al conectar con el servidor');
    }
  }
  // // Verifica si el usuario ya está autenticado
  // const token = localStorage.getItem('token');
  // if (token) {
  //   // Redirige al usuario a la página de inicio o a otra página protegida
  //   router.push("/generarcontratos");
  // }
  // // Si no está autenticado, muestra el formulario de inicio de sesión
  // // y permite que el usuario inicie sesión



  return (
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header">
            <h3>Sign In</h3>
            <div className="d-flex justify-content-end social_icon">
              <span>
                <i className="fab fa-facebook-square"></i>
              </span>
              <span>
                <i className="fab fa-google-plus-square"></i>
              </span>
              <span>
                <i className="fab fa-twitter-square"></i>
              </span>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key"></i>
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="row align-items-center remember">
                <input type="checkbox" /> Remember Me
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-warning float-right text-dark margin-top-2"
                  style={{ marginTop: "10px" }}
                />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Don't have an account? <a href="#">Sign Up</a>
            </div>
            <div className="d-flex justify-content-center">
              <a href="#">Forgot your password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

