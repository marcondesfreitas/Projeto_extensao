'use client'
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  console.log(users)

  const handleSubmit = (event) => {
    event.preventDefault();
    const userBusca = users.find(
      (user) => user.email === email
    )
    if (userBusca) {
      if (users.find((user) => user.username === senha)) {
        alert("login bem sucedido")
      } else {
        alert("senha errada")
      }
    } else {
      alert("email errado")
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
