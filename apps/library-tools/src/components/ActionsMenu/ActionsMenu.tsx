import { MouseEvent, useState } from 'react';
import { Menu, MenuItem } from '@repo/mui/Menu';
import { Tooltip } from '@repo/mui/Tooltip';
import { IconButton } from '@repo/mui/IconButton';
import { MenuIcon } from '@repo/mui/icons';
import { CircularProgress } from '@repo/mui/CircularProgress';

export type Action = {
  title: string;
  onClick: () => void;
};

export const ActionsMenu = ({ actions, isLoading }: { actions: Action[]; isLoading: boolean }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MenuButton onClick={handleMenuButtonClick} isLoading={isLoading} />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {actions.map((action) => (
          <MenuItem
            key={action.title}
            onClick={() => {
              action.onClick();
              handleClose();
            }}>
            {action.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const MenuButton = ({
  onClick,
  isLoading,
}: {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
}) => {
  return (
    <Tooltip title='actions'>
      <IconButton onClick={onClick}>
        {!isLoading && <MenuIcon />}
        {isLoading && <CircularProgress size={24} />}
      </IconButton>
    </Tooltip>
  );
};
