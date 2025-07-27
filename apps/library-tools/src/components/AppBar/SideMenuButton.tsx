import { IconButton } from '@repo/mui/IconButton';
import { MenuIcon } from '@repo/mui/icons';
import { useState } from 'react';
import { Drawer } from '@repo/mui/Drawer';
import { List, ListItem, ListItemButton } from '@repo/mui/List';
import { useRouter } from 'next/navigation';
import { Pages } from '../../pages.ts';

export const SideMenuButton = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (open: boolean) => () => setOpen(open);

  return (
    <>
      <IconButton color='inherit' onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <List>
          <MenuItem onClose={toggleDrawer(false)} href={Pages.BOOKS} title={'Books'} />
          <MenuItem
            onClose={toggleDrawer(false)}
            href={Pages.LIBRARY_CARDS}
            title={'Library Cards'}
          />
          <MenuItem onClose={toggleDrawer(false)} href={Pages.NOTES} title={'Notes'} />
        </List>
      </Drawer>
    </>
  );
};

const MenuItem = ({
  onClose,
  href,
  title,
}: {
  onClose: () => void;
  href: string;
  title: string;
}) => {
  const router = useRouter();

  return (
    <ListItem>
      <ListItemButton
        onClick={() => {
          onClose();
          router.push(href);
        }}>
        {title}
      </ListItemButton>
    </ListItem>
  );
};
