import { Button, Flex, NumberInput, TextInput } from '@mantine/core';
import type { FormEvent } from 'react';

import { vehicleService } from '../../services/vehicleService';
import { useVehicleStore } from '../../store/vehicleStore';
const fields = [
  { component: TextInput, label: 'Название', name: 'name' },
  { component: TextInput, label: 'Модель', name: 'model' },
  { component: NumberInput, label: 'Год', name: 'year' },
  { component: TextInput, label: 'Цвет', name: 'color' },
  { component: NumberInput, label: 'Цена', name: 'price' },
];
export const VehicleCreate = ({ close }: { close: () => void }) => {
  const addVehicle = useVehicleStore(state => state.addVehicle);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // тут бы еще кинули POST на сервер
    addVehicle(vehicleService.createVehicle(e));
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
            />
          );
        })}
        <Flex gap="md" w="100%">
          <Button flex="1" onClick={close}>Отмена</Button>
          <Button flex="1" color="green" type="submit">Добавить</Button>
        </Flex>
      </Flex>
    </form>
  );
};
