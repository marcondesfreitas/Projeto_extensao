'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import './criar_post.css';

const API_URL = 'http://127.0.0.1:8000';

const SeletorLocalizacaoMapa = dynamic(
  () =>
    import(
      '@/components/seletor_localizacao_mapa/seletor_localizacao_mapa'
    ),
  { ssr: false }
);
const CENTRO_PADRAO = {
  lat: -7.2136,
  lng: -39.3122,
};

export default function CriarPost() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [imagem, setImagem] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);

  const [statusLocalizacao, setStatusLocalizacao] =
    useState('buscando');

  const [enderecoBusca, setEnderecoBusca] = useState('');
  const [buscandoEndereco, setBuscandoEndereco] =
    useState(false);

  const [erroBuscaEndereco, setErroBuscaEndereco] =
    useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatusLocalizacao('sem_suporte');
      setLatitude(CENTRO_PADRAO.lat);
      setLongitude(CENTRO_PADRAO.lng);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setStatusLocalizacao('ok');
      },

      (error) => {
        console.error(
          'Erro ao obter localização:',
          error
        );

        setStatusLocalizacao('erro');

        setLatitude(CENTRO_PADRAO.lat);
        setLongitude(CENTRO_PADRAO.lng);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }, []);

  const CARIRI_VIEWBOX =
    '-39.55,-7.05,-39.20,-7.35';

  async function buscarNominatim(texto) {
    const url =
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        texto
      )}` +
      `&limit=1&countrycodes=br&viewbox=${CARIRI_VIEWBOX}&bounded=1`;

    const response = await fetch(url, {
      headers: {
        'Accept-Language': 'pt-BR',
      },
    });

    return response.json();
  }

  async function buscarEndereco() {
    if (!enderecoBusca.trim()) {
      setErroBuscaEndereco(
        'Digite um endereço antes de realizar a busca.'
      );
      return;
    }

    setBuscandoEndereco(true);
    setErroBuscaEndereco(null);

    try {
      const tentativas = [
        enderecoBusca,
        `Avenida ${enderecoBusca}`,
        `Rua ${enderecoBusca}`,
      ];

      let resultados = [];

      for (const tentativa of tentativas) {
        resultados = await buscarNominatim(tentativa);

        if (resultados.length > 0) {
          break;
        }
      }

      if (resultados.length === 0) {
        setErroBuscaEndereco(
          'Endereço não encontrado no mapa. Tente um endereço mais completo ou arraste o pino manualmente no mapa.'
        );

        return;
      }

      const primeiro = resultados[0];

      setLatitude(parseFloat(primeiro.lat));
      setLongitude(parseFloat(primeiro.lon));

      setStatusLocalizacao('ok');

      setLocalizacao(enderecoBusca);
    } catch (error) {
      console.error(error);

      setErroBuscaEndereco(
        'Erro ao buscar o endereço. Tente novamente ou ajuste pelo mapa.'
      );
    } finally {
      setBuscandoEndereco(false);
    }
  }

  function handleMudarPosicao(lat, lng) {
    setLatitude(lat);
    setLongitude(lng);
    setStatusLocalizacao('ok');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setErrors(null);
    setSuccess(false);

    const autorId = localStorage.getItem('user_id');

    const formData = new FormData();

    formData.append('autor_id', autorId);
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    formData.append('categoria', categoria);
    formData.append('localizacao', localizacao);

    if (latitude !== null) {
      formData.append(
        'latitude',
        latitude.toFixed(6)
      );
    }

    if (longitude !== null) {
      formData.append(
        'longitude',
        longitude.toFixed(6)
      );
    }

    if (imagem) {
      formData.append('imagem', imagem);
    }

    try {
      const response = await fetch(
        `${API_URL}/posts/`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        setSuccess(true);

        setTitulo('');
        setDescricao('');
        setCategoria('');
        setLocalizacao('');
        setEnderecoBusca('');
        setImagem(null);
        const inputImagem =
          document.getElementById('imagem');

        if (inputImagem) {
          inputImagem.value = '';
        }
      } else {
        setErrors(data);
      }
    } catch (error) {
      console.error(error);

      setErrors({
        detail:
          'Falha de conexão com o servidor. A API está rodando?',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="criar-post-page">
      <div className="criar-post-container">

        

        <div className="criar-post-header">
          <div>
            <span className="criar-post-eyebrow">
              NOVA OCORRÊNCIA
            </span>

            <h2>
              Criar publicação
            </h2>

            <p>
              Registre um problema ou ocorrência
              na sua região.
            </p>
          </div>

          <div className="header-icon">
            +
          </div>
        </div>


        

        <form
          onSubmit={handleSubmit}
          className="criar-post-card"
        >

          

          {statusLocalizacao === 'buscando' && (
            <div className="alerta alerta-info">
              <span>⌖</span>

              <p>
                Obtendo sua localização...
              </p>
            </div>
          )}

          {statusLocalizacao === 'erro' && (
            <div className="alerta alerta-aviso">
              <span>!</span>

              <p>
                Não foi possível obter sua localização
                automaticamente. Busque o endereço ou
                ajuste pelo mapa.
              </p>
            </div>
          )}

          {statusLocalizacao === 'sem_suporte' && (
            <div className="alerta alerta-aviso">
              <span>!</span>

              <p>
                Seu navegador não suporta
                geolocalização. Busque o endereço ou
                ajuste pelo mapa.
              </p>
            </div>
          )}


          

          {success && (
            <div className="alerta alerta-sucesso">
              <span>✓</span>

              <p>
                Publicação criada com sucesso!
              </p>
            </div>
          )}


          

          {errors && (
            <div className="alerta alerta-erro">
              <span>!</span>

              <div>
                {Object.entries(errors).map(
                  ([campo, mensagens]) => (
                    <p key={campo}>
                      <strong>
                        {campo}:
                      </strong>{' '}

                      {Array.isArray(mensagens)
                        ? mensagens.join(', ')
                        : String(mensagens)}
                    </p>
                  )
                )}
              </div>
            </div>
          )}


          

          <div className="form-group">
            <label htmlFor="titulo">
              Título da ocorrência
            </label>

            <input
              id="titulo"
              type="text"
              placeholder="Ex: Buraco perigoso na avenida"
              value={titulo}
              onChange={(e) =>
                setTitulo(e.target.value)
              }
              required
            />
          </div>


          

          <div className="form-group">
            <label htmlFor="descricao">
              Descrição
            </label>

            <textarea
              id="descricao"
              placeholder="Descreva detalhadamente o problema encontrado..."
              value={descricao}
              onChange={(e) =>
                setDescricao(e.target.value)
              }
              rows={5}
            />
          </div>


          

          <div className="form-group">
            <label htmlFor="categoria">
              Categoria
            </label>

            <select
              id="categoria"
              value={categoria}
              onChange={(e) =>
                setCategoria(e.target.value)
              }
              required
            >
              <option value="">
                Selecione uma categoria
              </option>

              <option value="iluminacao">
                Iluminação Pública
              </option>

              <option value="lixo">
                Lixo / Entulho
              </option>

              <option value="seguranca">
                Segurança
              </option>

              <option value="buraco">
                Buraco na Via
              </option>

              <option value="outros">
                Outros
              </option>
            </select>
          </div>


          

          <div className="form-group">
            <label>
              Localização da ocorrência
            </label>

            <div className="busca-endereco">
              <input
                type="text"
                placeholder="Digite rua, bairro ou cidade"
                value={enderecoBusca}
                onChange={(e) =>
                  setEnderecoBusca(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    buscarEndereco();
                  }
                }}
              />

              <button
                type="button"
                onClick={buscarEndereco}
                disabled={buscandoEndereco}
                className="btn-buscar"
              >
                {buscandoEndereco
                  ? 'Buscando...'
                  : 'Buscar'}
              </button>
            </div>

            {erroBuscaEndereco && (
              <div className="erro-endereco">
                {erroBuscaEndereco}
              </div>
            )}
          </div>


          

          {latitude !== null && (
            <div className="form-group">
              <div className="mapa-container">

                <div className="mapa-header">
                  <div>
                    <h3>
                      Local exato
                    </h3>

                    <p>
                      Arraste o pino ou clique no mapa
                      para ajustar a localização.
                    </p>
                  </div>

                  <span className="mapa-status">
                    ✓ Mapa ativo
                  </span>
                </div>

                <div className="mapa">
                  <SeletorLocalizacaoMapa
                    latitude={latitude}
                    longitude={longitude}
                    onMudarPosicao={
                      handleMudarPosicao
                    }
                  />
                </div>

                <p className="coordenadas">
                  Coordenadas:{' '}
                  <strong>
                    {latitude.toFixed(6)}
                  </strong>
                  {' · '}
                  <strong>
                    {longitude.toFixed(6)}
                  </strong>
                </p>

              </div>
            </div>
          )}


          

          <div className="form-group">
            <label htmlFor="localizacao">
              Ponto de referência
            </label>

            <input
              id="localizacao"
              type="text"
              placeholder="Ex: Próximo ao mercado, em frente à praça..."
              value={localizacao}
              onChange={(e) =>
                setLocalizacao(e.target.value)
              }
            />
          </div>


          

          <div className="form-group">
            <label htmlFor="imagem">
              Adicionar imagem
            </label>

            <div className="upload-container">
              <input
                id="imagem"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImagem(e.target.files[0])
                }
                className="input-imagem"
              />

              <div className="upload-info">
                <div className="upload-icon">
                  ↑
                </div>

                <div>
                  <strong>
                    {imagem
                      ? imagem.name
                      : 'Clique para selecionar uma imagem'}
                  </strong>

                  <span>
                    JPG, PNG ou outra imagem
                  </span>
                </div>
              </div>
            </div>
          </div>


          

          <button
            type="submit"
            disabled={loading}
            className="btn-publicar"
          >
            {loading
              ? 'Publicando ocorrência...'
              : 'Publicar ocorrência'}
          </button>

        </form>
      </div>
    </div>
  );
}
