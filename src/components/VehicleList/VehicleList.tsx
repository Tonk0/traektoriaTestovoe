import { Button, Flex, Modal, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { vehicleService } from '../../services/vehicleService';
import type { Sort } from '../../shared.types';
import { useVehicleStore } from '../../store/vehicleStore';
import { VehicleCard } from './VehicleCard';
import { VehicleCreate } from './VehicleCreate';
import { VehicleSort } from './VehicleSort/VehicleSort';

export const VehicleList = () => {
  const vehicles = useVehicleStore(state => state.vehicles);
  const [opened, { open, close }] = useDisclosure(false);
  const [sort, setSort] = useState<Sort>(null);
  const [isDescending, setIsDescendign] = useState(false);
  return (
    <Flex gap="md" h="100%" w="100%" direction="column">
      <Flex justify="space-between">
        <Title order={3}>Список машин</Title>
        <Button onClick={open}>Добавить машину</Button>
      </Flex>
      <VehicleSort sort={sort} setSort={setSort} isDescending={isDescending} setIsDescendign={setIsDescendign} />
      <Flex direction="column" gap="md" style={{ overflow: 'auto' }}>
        {vehicleService.sortVehicles(vehicles, sort, isDescending).map(vehicle => (
          <VehicleCard vehicle={vehicle} key={vehicle.id} />
        ))}
      </Flex>
      <Modal opened={opened} onClose={close} title="Добавить машину">
        <VehicleCreate close={close} />
      </Modal>
    </Flex>
  );
};
