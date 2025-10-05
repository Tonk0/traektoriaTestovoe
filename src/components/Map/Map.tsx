import 'leaflet/dist/leaflet.css';

import { Flex, Text } from '@mantine/core';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { useVehicleStore } from '../../store/vehicleStore';
import { MapBounds } from './MapBounds';
const DEFAULT_CENTER: [number, number] = [55.7558, 37.6173];
const DEFAULT_ZOOM = 10;
export const Map = () => {
  const vehicles = useVehicleStore(state => state.vehicles);

  return (
    <Flex w="100%" h="100%" style={{ overflow: 'hidden' }}>
      <MapContainer attributionControl={false} zoom={DEFAULT_ZOOM} center={DEFAULT_CENTER} scrollWheelZoom={true} style={{ width: '100%', height: '100%', zIndex: 1 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBounds vehicles={vehicles} />
        {vehicles.map((vehicle) => {
          if (vehicle.latitude && vehicle.longitude) {
            return (
              <Marker key={vehicle.id} position={[vehicle.latitude, vehicle.longitude]}>
                <Popup>
                  <Flex direction="column">
                    <Text>{vehicle.name} {vehicle.model}</Text>
                    <Text>{vehicle.year} ${vehicle.price}</Text>
                  </Flex>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
    </Flex>
  );
};
