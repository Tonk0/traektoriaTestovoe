import { Button, Flex, NumberInput, TextInput } from '@mantine/core';
import type { FormEvent } from 'react';

import { vehicleService } from '../../services/vehicleService';
import type { Vehicle } from '../../shared.types';
import { useVehicleStore } from '../../store/vehicleStore';

const fields = [
  { component: TextInput, label: 'Название', name: 'name' },
  { component: NumberInput, label: 'Цена', name: 'price' },
];

export const VehicleEdit = ({ vehicle, close }: { vehicle: Vehicle, close: () => void }) => {
  const updateVehicle = useVehicleStore(state => state.updateVehicle);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // тут бы отправили PUT или PATCH запрос
    updateVehicle(vehicleService.prepareVehicleUpdate(e, vehicle));
    close();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Flex gap="md" direction="column">
        {fields.map((field) => {
          const Component = field.component;
          return (
            <Component
              key={field.name}
              size="md"
              required
              label={field.label}
              name={field.name}
              defaultValue={vehicle[field.name as keyof Vehicle]}
            />
          );
        })}
        <Flex gap="md" w="100%">
          <Button flex="1" onClick={close}>Отмена</Button>
          <Button flex="1" color="green" type="submit">Изменить</Button>
        </Flex>
      </Flex>
    </form>
  );
};
