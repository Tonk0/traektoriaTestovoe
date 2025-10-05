import { Flex } from '@mantine/core';
import { useEffect } from 'react';

import { fetchVehicles } from './api/vehicles';
import { PanelWrapper } from './components/Shared/PanelWrapper';
import { VehicleList } from './components/VehicleList/VehicleList';
import { useVehicleStore } from './store/vehicleStore';

function App() {
  const setVehicles = useVehicleStore(state => state.setVehicles);
  useEffect(() => {
    const getVehicles = async () => {
      const vehicles = await fetchVehicles();
      setVehicles(vehicles);
    };
    getVehicles();
  }, [setVehicles]);
  return (
    <Flex w="100vw" h="100vh" p="lg" gap="lg" wrap={{ base: 'wrap', md: 'nowrap' }} style={{ overflow: 'auto' }}>
      <PanelWrapper>
        <VehicleList />
      </PanelWrapper>
      <PanelWrapper>
        <VehicleList />
      </PanelWrapper>
    </Flex>
  );
}

export default App;
