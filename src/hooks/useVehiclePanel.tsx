import { useEffect, useState } from 'react';

import { fetchVehicles } from '../api/vehicles';
import { useVehicleStore } from '../store/vehicleStore';

export const useVehiclePanel = () => {
  const setVehicles = useVehicleStore(state => state.setVehicles);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showVehicles, setShowVehicles] = useState(false);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const vehicles = await fetchVehicles();

        if (vehicles.length > 0) {
          setShowVehicles(true);
          setVehicles(vehicles);
        }
      }
      catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch vehicles';
        setError(errorMessage);
      }
      finally {
        setIsLoading(false);
      }
    };
    getVehicles();
  }, [setVehicles]);
  return { error, isLoading, showVehicles };
};
