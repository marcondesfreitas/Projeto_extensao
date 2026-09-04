'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const iconePadrao = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function CliqueNoMapa({ onMover }) {
  useMapEvents({
    click(e) {
      onMover(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// key força o Leaflet a recentralizar quando a busca por endereço muda a
// posição de fora (o MapContainer só lê "center" na primeira renderização).
export default function SeletorLocalizacaoMapa({ latitude, longitude, onMudarPosicao }) {
  const posicao = [latitude, longitude];

  return (
    <div style={{ height: 220, width: '100%', borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
      <MapContainer
        key={`${latitude.toFixed(4)}-${longitude.toFixed(4)}`}
        center={posicao}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={posicao}
          icon={iconePadrao}
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              const novaPos = e.target.getLatLng();
              onMudarPosicao(novaPos.lat, novaPos.lng);
            },
          }}
        />
        <CliqueNoMapa onMover={onMudarPosicao} />
      </MapContainer>
    </div>
  );
}