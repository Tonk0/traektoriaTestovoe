import { Flex } from '@mantine/core';

import { Map } from './components/Map/Map';
import { PanelWrapper } from './components/Shared/PanelWrapper';
import { VehiclePanel } from './components/VehicleList/VehiclePanel';

function App() {
  return (
    <Flex w="100vw" h="100vh" p="lg" gap="lg" wrap={{ base: 'wrap', md: 'nowrap' }} style={{ overflow: 'auto' }}>
      <PanelWrapper>
        <VehiclePanel />
      </PanelWrapper>
      <PanelWrapper>
        <Map />
      </PanelWrapper>
    </Flex>
  );
}

export default App;
