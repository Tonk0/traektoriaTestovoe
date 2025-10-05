import { Flex } from '@mantine/core';
import type { ReactNode } from 'react';

export const PanelWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Flex bdrs="md" h="100%" w="100%" p="md" style={{ boxShadow: '0px 6px 29px 1px rgba(34, 60, 80, 0.13)' }}>
      {children}
    </Flex>
  );
};
