import type { ReactNode } from 'react';

import { Drawer } from 'antd';

interface Props {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const DetailDrawer = ({ title, open, onClose, children }: Props) => (
  <Drawer
    title={title}
    placement="right"
    width={480}
    open={open}
    onClose={onClose}
    destroyOnClose
  >
    {children}
  </Drawer>
);
