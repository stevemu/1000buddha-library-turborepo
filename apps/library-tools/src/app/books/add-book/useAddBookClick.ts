import { useState } from 'react';

export const useAddBookClick = () => {
  const [openAddBookDialog, setOpenAddBookDialog] = useState(false);

  const handleOpenAddBookDialog = () => {
    setOpenAddBookDialog(true);
  };

  const handleCloseAddBookDialog = () => {
    setOpenAddBookDialog(false);
  };

  return {
    openAddBookDialog,
    handleOpenAddBookDialog,
    handleCloseAddBookDialog,
  };
};
