const CHAVE_LIDAS = "notificacoes_lidas";

const TEXTOS_POR_STATUS = {
  pendente: (titulo) => `Sua postagem "${titulo}" foi criada e está aguardando aprovação`,
  aprovado: (titulo) => `Sua postagem "${titulo}" foi aprovada`,
  rejeitado: (titulo) => `Sua postagem "${titulo}" foi rejeitada`,
  resolvido: (titulo) => `Sua postagem "${titulo}" foi marcada como resolvida`,
};

export function gerarNotificacoes(posts, userId) {
  const lidas = obterLidas();

  return posts
    .filter((post) => String(post.autor_id) === String(userId))
    .filter((post) => TEXTOS_POR_STATUS[post.status])
    .map((post) => {
      const id = `${post.id}-${post.status}`;
      return {
        id,
        texto: TEXTOS_POR_STATUS[post.status](post.titulo),
        data: post.criado_em,
        lida: lidas.includes(id),
      };
    })
    .sort((a, b) => new Date(b.data) - new Date(a.data));
}

function obterLidas() {
  try {
    const salvo = localStorage.getItem(CHAVE_LIDAS);
    return salvo ? JSON.parse(salvo) : [];
  } catch {
    return [];
  }
}

export function marcarTodasComoLidas(notificacoes) {
  const ids = notificacoes.map((n) => n.id);
  localStorage.setItem(CHAVE_LIDAS, JSON.stringify(ids));
}