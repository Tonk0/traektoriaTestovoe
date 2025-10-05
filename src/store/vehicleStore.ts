import { create } from 'zustand';

import type { Vehicle } from '../shared.types';

interface VehicleStore {
  vehicles: Vehicle[]
  setVehicles: (vehicles: Vehicle[]) => void
  addVehicle: (vehicle: Vehicle) => void
  updateVehicle: (updatedVehicle: Vehicle) => void
  deleteVehicle: (vehicleId: number) => void
}
export const useVehicleStore = create<VehicleStore>(set => ({
  vehicles: [],
  setVehicles: (vehicles: Vehicle[]) => set({ vehicles }),
  addVehicle: (vehicle: Vehicle) => set(state => ({ vehicles: [...state.vehicles, vehicle] })),
  updateVehicle: (updatedVehicle: Vehicle) => set(state => ({
    vehicles: state.vehicles.map(vehicle =>
      vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle,
    ),
  })),
  deleteVehicle: (vehicleId: number) => set(state => ({
    vehicles: state.vehicles.filter(vehicle =>
      vehicle.id !== vehicleId,
    ),
  })),
}));
