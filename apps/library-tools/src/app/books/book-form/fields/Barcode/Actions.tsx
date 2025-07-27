import { ActionsMenu } from '../../../../../components/ActionsMenu/ActionsMenu.tsx';
import { getNextBarcodeAction } from './getNextBarcodeAction.ts';
import { useState } from 'react';
import { Snackbar } from '@repo/mui/Snackbar';
import { Alert } from '@repo/mui/Alert';

export const Actions = ({ onSuccess }: { onSuccess: (barcode: string) => void }) => {
  const { isLoading, error, actions, handleErrorChange } = useActions({
    onSuccess,
  });

  return (
    <div>
      <ActionsMenu isLoading={isLoading} actions={actions} />
      <ErrorToast error={error} onErrorChange={handleErrorChange} />
    </div>
  );
};

const ErrorToast = ({
  error,
  onErrorChange,
}: {
  error: string;
  onErrorChange: (error: string) => void;
}) => {
  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={() => onErrorChange('')}>
      <ErrorAlert error={error} />
    </Snackbar>
  );
};

const ErrorAlert = ({ error }: { error: string }) => {
  return (
    <div>
      <Alert severity='error'>{error}</Alert>
    </div>
  );
};

const useActions = ({ onSuccess }: { onSuccess: (barcode: string) => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleBClick = async () => {
    try {
      setIsLoading(true);
      const { barcode } = await getNextBarcodeAction('B');
      handleSuccess(barcode);
    } catch (e) {
      handleError();
    }
  };

  const handlePClick = async () => {
    try {
      setIsLoading(true);
      const { barcode } = await getNextBarcodeAction('P');
      handleSuccess(barcode);
    } catch (e) {
      handleError();
    }
  };

  const handleAClick = async () => {
    try {
      setIsLoading(true);
      const { barcode } = await getNextBarcodeAction('A');
      handleSuccess(barcode);
    } catch (e) {
      handleError();
    }
  };

  const handleError = () => {
    setError('Get next barcode failed.');
    setIsLoading(false);
  };

  const handleSuccess = (barcode: string) => {
    onSuccess(barcode);
    setError('');
    setIsLoading(false);
  };

  const actions = [
    {
      title: 'Use next B barcode',
      onClick: handleBClick,
    },
    {
      title: 'Use next P barcode',
      onClick: handlePClick,
    },
    {
      title: 'Use next A barcode',
      onClick: handleAClick,
    },
  ];

  const handleErrorChange = (error: string) => {
    setError(error);
  };

  return {
    isLoading,
    error,
    actions,
    handleErrorChange,
  };
};
