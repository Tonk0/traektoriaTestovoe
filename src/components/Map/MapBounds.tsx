import { LatLngBounds } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

import type { Vehicle } from '../../shared.types';

export const MapBounds = ({ vehicles }: { vehicles: Vehicle[] }) => {
  const map = useMap();

  useEffect(() => {
    const vehiclesWithCoords = vehicles.filter(vehicle => vehicle.latitude && vehicle.longitude);
    if (vehiclesWithCoords.length > 0) {
      const bounds = new LatLngBounds(
        vehiclesWithCoords.map(vehicle => [vehicle.latitude, vehicle.longitude] as [number, number]),
      );
      map.fitBounds(bounds, { padding: [10, 10] });
    }
  }, [map, vehicles]);
  return null;
};
