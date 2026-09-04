'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getPosts } from '../../service/posts';

import './mapa_ocorrencias.css';

const iconePadrao = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Mapa_ocorrencias() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await getPosts();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    }
    carregar();
  }, []);

  const postsComLocalizacao = posts.filter((post) => {
    const lat = Number(post.latitude);
    const lng = Number(post.longitude);
    return (
      post.latitude &&
      post.longitude &&
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
  });

  const centroPadrao = [-7.2136, -39.3122]; // Juazeiro do Norte, CE

  const centro =
    postsComLocalizacao.length > 0
      ? [
          postsComLocalizacao.reduce((soma, p) => soma + Number(p.latitude), 0) /
            postsComLocalizacao.length,
          postsComLocalizacao.reduce((soma, p) => soma + Number(p.longitude), 0) /
            postsComLocalizacao.length,
        ]
      : centroPadrao;

  return (
    <div className="menu-mapa">
      <h1>Mapa de Ocorrências</h1>
      <div className="mapa-leaflet-wrapper">
        <MapContainer
          center={centro}
          zoom={postsComLocalizacao.length > 0 ? 13 : 12}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {postsComLocalizacao.map((post) => (
            <Marker
              key={post.id}
              position={[Number(post.latitude), Number(post.longitude)]}
              icon={iconePadrao}
            >
              <Popup>
                <strong>{post.titulo}</strong>
                <br />
                {post.categoria}
                <br />
                Status: {post.status}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}