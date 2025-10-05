import { Button, Flex, Loader, Modal, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useVehiclePanel } from '../../hooks/useVehiclePanel';
import { vehicleService } from '../../services/vehicleService';
import type { Sort } from '../../shared.types';
import { useVehicleStore } from '../../store/vehicleStore';
import { VehicleCard } from './VehicleCard';
import { VehicleCreate } from './VehicleCreate';
import { VehicleSort } from './VehicleSort/VehicleSort';

export const VehiclePanel = () => {
  const vehicles = useVehicleStore(state => state.vehicles);
  const [opened, { open, close }] = useDisclosure(false);
  const [sort, setSort] = useState<Sort>(null);
  const [isDescending, setIsDescendign] = useState(false);
  const { error, isLoading, showVehicles } = useVehiclePanel();
  const renderVehicles = () => {
    if (isLoading) {
      return (
        <Flex justify="center" align="center">
          <Loader size="lg" />
        </Flex>
      );
    }

    if (error) {
      return (
        <Flex justify="center" align="center">
          <Text>{error}</Text>
        </Flex>
      );
    }
    if (!showVehicles || vehicles.length === 0) {
      return (
        <Flex justify="center" align="center">
          <Text>Тут пока ничего нет</Text>
        </Flex>
      );
    }

    return vehicleService.sortVehicles(vehicles, sort, isDescending).map(vehicle => (
      <VehicleCard vehicle={vehicle} key={vehicle.id} />
    ));
  };
  return (
    <Flex gap="md" h="100%" w="100%" direction="column">
      <Flex justify="space-between">
        <Title order={3}>Список машин</Title>
        <Button onClick={open}>Добавить машину</Button>
      </Flex>
      <VehicleSort sort={sort} setSort={setSort} isDescending={isDescending} setIsDescendign={setIsDescendign} />
      <Flex direction="column" gap="md" style={{ overflow: 'auto' }}>
        {renderVehicles()}
      </Flex>
      <Modal opened={opened} onClose={close} title="Добавить машину">
        <VehicleCreate close={close} />
      </Modal>
    </Flex>
  );
};
