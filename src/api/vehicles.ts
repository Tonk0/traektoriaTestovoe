import type { Vehicle } from '../shared.types';

export async function fetchVehicles(): Promise<Vehicle[]> {
  const response = await fetch('https://ofc-test-01.tspb.su/test-task/vehicles', { // Это бы достали из .env
    method: 'GET',
  });
  if (!response.ok) {
    const errData = await response.json().catch(() => ({ error: 'Неизвестная ошибка' }));
    throw new Error(errData.error);
  }
  return response.json();
}
