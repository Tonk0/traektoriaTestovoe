import { Checkbox, Chip, Flex, Text } from '@mantine/core';

import { SORTVALUES } from '../../../constants';
import type { Sort } from '../../../shared.types';
import styles from './VehicleSort.module.css';

interface VehicleSortProps {
  sort: Sort
  setSort: (value: Sort) => void
  isDescending: boolean
  setIsDescendign: (value: boolean) => void
}
export const VehicleSort = ({ sort, setSort, isDescending, setIsDescendign }: VehicleSortProps) => {
  const handleChipClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === sort) {
      setSort(null);
    }
  };
  const handleChange = (value: string) => {
    setSort(value as Sort);
  };
  return (
    <Flex direction="column">
      <Text>Отсортировать по:</Text>
      <Flex align="center" gap="md">
        <Chip.Group multiple={false} value={sort} onChange={handleChange}>
          <Flex>
            {SORTVALUES.map(sortItem => (
              <Chip size="sm" className={styles.chip} onClick={handleChipClick} radius="0" key={sortItem.value} value={sortItem.value ?? undefined}>{sortItem.label}</Chip>
            ))}
          </Flex>
        </Chip.Group>
        <Checkbox checked={isDescending} onChange={e => setIsDescendign(e.currentTarget.checked)} label="По убыванию" />
      </Flex>

    </Flex>
  );
};
