import type { FormEvent } from 'react';

import type { Sort, Vehicle } from '../shared.types';

export const vehicleService = {
  createVehicle: (e: FormEvent<HTMLFormElement>): Vehicle => {
    const formData = new FormData(e.currentTarget);
    formData.append('id', Date.now().toString());
    const vehicleObject = Object.fromEntries(formData) as unknown as Vehicle;
    return vehicleObject;
  },
  prepareVehicleUpdate: (e: FormEvent<HTMLFormElement>, vehicle: Vehicle): Vehicle => {
    const formData = new FormData(e.currentTarget);
    const updatedVehicle = {
      ...vehicle,
      ...Object.fromEntries(formData),
    };
    return updatedVehicle;
  },
  sortVehicles: (vehicles: Vehicle[], sortValue: Sort, isDescending: boolean): Vehicle[] => {
    const sortedVehicles = [...vehicles];
    sortedVehicles.sort((a, b) => {
      let compareValue = 0;
      if (sortValue === 'year') {
        compareValue = a.year - b.year;
      }
      else if (sortValue === 'price') {
        compareValue = a.price - b.price;
      }
      return isDescending ? -compareValue : compareValue;
    });
    return sortedVehicles;
  },
};
