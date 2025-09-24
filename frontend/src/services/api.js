export async function solicitarRedefinicao(email) {
  const res = await fetch("http://127.0.0.1:8000/users/solicitar-redefinicao/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function redefinirSenha(token, nova_senha) {
  const res = await fetch("http://127.0.0.1:8000/users/redefinir-senha/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, nova_senha }),
  });
  return res.json();
}
