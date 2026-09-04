export async function getPosts() {
  const res = await fetch("http://127.0.0.1:8000/posts/");
  const data = await res.json();

  return data;
}
const API_URL = 'http://localhost:8000';
 
export async function updatePostStatus(postId, novoStatus) {
  const response = await fetch(`${API_URL}/posts/${postId}/status/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: novoStatus }),
  });
 
  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.erro || 'Erro ao atualizar status do post');
  }
 
  return response.json();
}
 