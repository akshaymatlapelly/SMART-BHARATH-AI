import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { MapPin, Navigation, Search, Phone, ExternalLink } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const NEARBY_PLACES = [
  { id: 1, name: 'Passport Seva Kendra', type: 'Passport', icon: '🛂', lat: 17.4400, lng: 78.4800, phone: '1800-258-1800', distance: '1.2 km', color: '#2563EB' },
  { id: 2, name: 'MeeSeva Center', type: 'Civil Services', icon: '🏛️', lat: 17.4450, lng: 78.4750, phone: '1800-599-4788', distance: '0.8 km', color: '#22C55E' },
  { id: 3, name: 'Government Hospital', type: 'Hospital', icon: '🏥', lat: 17.4380, lng: 78.4820, phone: '040-23456789', distance: '2.1 km', color: '#EF4444' },
  { id: 4, name: 'Police Station', type: 'Police', icon: '👮', lat: 17.4420, lng: 78.4790, phone: '100', distance: '0.5 km', color: '#1d4ed8' },
  { id: 5, name: 'Regional RTO Office', type: 'RTO', icon: '🚗', lat: 17.4360, lng: 78.4860, phone: '040-23789012', distance: '3.4 km', color: '#8B5CF6' },
  { id: 6, name: 'Collector Office', type: 'Revenue', icon: '🏢', lat: 17.4410, lng: 78.4770, phone: '040-23456700', distance: '1.8 km', color: '#F59E0B' },
  { id: 7, name: 'Fire Station', type: 'Fire', icon: '🚒', lat: 17.4390, lng: 78.4840, phone: '101', distance: '1.5 km', color: '#EF4444' },
  { id: 8, name: 'Municipality Office', type: 'Municipal', icon: '🏘️', lat: 17.4430, lng: 78.4760, phone: '040-23345678', distance: '2.7 km', color: '#10B981' },
];

const TYPES = ['All', 'Passport', 'Civil Services', 'Hospital', 'Police', 'RTO', 'Revenue', 'Fire', 'Municipal'];

export default function MapPage() {
  const [activeType, setActiveType] = useState('All');
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  const center = [17.4400, 78.4800];

  const filtered = NEARBY_PLACES.filter(p => {
    const matchType = activeType === 'All' || p.type === activeType;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.type.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-4rem)] flex flex-col"
    >
      {/* Header */}
      <div className="px-6 py-4 flex-shrink-0">
        <h1 className="font-display font-bold text-2xl text-white mb-1">
          Nearby <span className="gradient-text">Government Services</span>
        </h1>
        <p className="text-slate-400 text-sm">Find passport offices, hospitals, police stations and more near you</p>
      </div>

      <div className="flex flex-1 overflow-hidden gap-4 px-6 pb-6">
        {/* Sidebar */}
        <div className="w-80 flex flex-col gap-3 flex-shrink-0">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search places..."
              className="input-glass pl-9 py-2.5 text-sm w-full"
            />
          </div>

          {/* Type filters */}
          <div className="flex flex-wrap gap-1.5">
            {TYPES.map(t => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeType === t
                    ? 'bg-primary-600 text-white'
                    : 'glass border border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Place list */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filtered.map((place, i) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 4 }}
                onClick={() => setSelected(selected?.id === place.id ? null : place)}
                className={`glass-card p-3.5 cursor-pointer transition-all ${
                  selected?.id === place.id ? 'border-primary-500/40 bg-primary-600/10' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: `${place.color}15` }}
                  >
                    {place.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">{place.name}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{place.type}</span>
                      <span className="text-xs text-slate-600">•</span>
                      <span className="text-xs text-accent">{place.distance}</span>
                    </div>
                  </div>
                </div>

                {selected?.id === place.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-white/08 space-y-2"
                  >
                    <a href={`tel:${place.phone}`} className="flex items-center gap-2 text-xs text-slate-300 hover:text-white">
                      <Phone size={12} className="text-success" /> {place.phone}
                    </a>
                    <button className="flex items-center gap-2 text-xs text-accent hover:underline">
                      <Navigation size={12} /> Get Directions
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 rounded-3xl overflow-hidden border border-white/10 relative">
          <MapContainer
            center={center}
            zoom={14}
            className="w-full h-full"
            zoomControl={false}
          >
            <TileLayer
              attribution='© OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* User location circle */}
            <Circle center={center} radius={100} color="#2563EB" fillColor="#2563EB" fillOpacity={0.15} />

            {filtered.map(place => (
              <Marker
                key={place.id}
                position={[place.lat, place.lng]}
                eventHandlers={{ click: () => setSelected(place) }}
              >
                <Popup>
                  <div className="text-sm">
                    <div className="font-semibold mb-1">{place.icon} {place.name}</div>
                    <div className="text-gray-500 text-xs">{place.type} · {place.distance}</div>
                    <div className="text-xs mt-1">📞 {place.phone}</div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map overlay badge */}
          <div className="absolute top-4 right-4 z-[1000] glass rounded-xl px-3 py-2 border border-white/10">
            <div className="flex items-center gap-2 text-xs text-white">
              <MapPin size={12} className="text-accent" />
              Hyderabad, India
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
