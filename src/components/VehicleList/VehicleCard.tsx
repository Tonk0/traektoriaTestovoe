import { ActionIcon, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CiCalendar, CiEdit, CiTrash } from 'react-icons/ci';

import type { Vehicle } from '../../shared.types';
import { useVehicleStore } from '../../store/vehicleStore';
import { VehicleEdit } from './VehicleEdit';
export const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const deleteVehicle = useVehicleStore(state => state.deleteVehicle);
  return (
    <Flex align="center" p="md" bdrs="md" bd="1px solid #d1d1d1" bg="#f9fafb">
      <Flex w="100%" direction="column">
        <Text fw="bold">{vehicle.name}</Text>
        <Flex gap="md">
          <Text miw="15%">{vehicle.model}</Text>
          <Flex miw="15%" align="center" gap="sm">
            <CiCalendar size="20px" />
            <Text>{vehicle.year}</Text>
          </Flex>
          <Text miw="15%">{`$ ${vehicle.price}`}</Text>
        </Flex>
      </Flex>
      <Flex gap="md">
        <ActionIcon onClick={open}>
          <CiEdit size="20px" />
        </ActionIcon>
        <ActionIcon onClick={() => deleteVehicle(vehicle.id)} bg="red">
          <CiTrash size="20px" />
        </ActionIcon>
      </Flex>
      <Modal opened={opened} onClose={close} title="Изменить машину">
        <VehicleEdit close={close} vehicle={vehicle} />
      </Modal>
    </Flex>
  );
};
