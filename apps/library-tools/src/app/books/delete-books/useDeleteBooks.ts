import { deleteBooksAction } from './deleteBooksAction.ts';
import { useState } from 'react';
import { logError } from '@repo/client-logger/log';

export function useDeleteBooks({
  onError,
  onSuccess,
}: {
  onError: (error: string) => void;
  onSuccess: (message: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteBooks = async (bookIds: string[]) => {
    try {
      setIsLoading(true);
      const confirmed = window.confirm('Are you sure you want to delete the selected books?');
      if (!confirmed) {
        setIsLoading(false);
        return;
      }
      await deleteBooksAction(bookIds);
      handleSuccess();
    } catch (e) {
      logError({ message: 'delete books action failed', error: e as Error });
      handleError();
    }
  };

  function handleSuccess() {
    onSuccess('Successfully deleted selected books.');
    setIsLoading(false);
  }

  function handleError() {
    onError('Delete books failed.');
    setIsLoading(false);
  }

  return {
    handleDeleteBooks,
    isLoading,
  };
}
