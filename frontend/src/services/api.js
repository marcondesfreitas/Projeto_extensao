const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function solicitarRedefinicao(email) {
  const res = await fetch(`${API_URL}/users/solicitar-redefinicao/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return res.json();
}

export async function redefinirSenha(token, nova_senha) {
  const res = await fetch(`${API_URL}/users/redefinir-senha/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, nova_senha }),
  });

  return res.json();
}

export async function getPosts() {
  const res = await fetch(`${API_URL}/posts/postagens/`);

  if (!res.ok) {
    throw new Error("Erro ao carregar as postagens.");
  }

  return res.json();
}

export async function getPostsByUser(userId) {
  const res = await fetch(
    `${API_URL}/posts/postagens/?autor_id=${userId}`
  );

  if (!res.ok) {
    throw new Error(`Erro HTTP: ${res.status}`);
  }

  const data = await res.json();

  return Array.isArray(data) ? data : [];
}

export async function updatePostStatus(postId, novoStatus) {
  const response = await fetch(
    `${API_URL}/posts/postagens/${postId}/status/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: novoStatus,
      }),
    }
  );

  if (!response.ok) {
    const erro = await response.json().catch(() => ({}));

    throw new Error(
      erro.erro || "Erro ao atualizar status do post"
    );
  }

  return response.json();
}

export async function deletePost(postId) {
  const response = await fetch(
    `${API_URL}/posts/postagens/${postId}/`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const erro = await response.json().catch(() => ({}));

    throw new Error(
      erro.erro || "Erro ao excluir postagem"
    );
  }

  return response.json();
}