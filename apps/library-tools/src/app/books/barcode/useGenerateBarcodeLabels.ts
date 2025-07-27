import { generateBarcodeLabelsAction } from './generateBarcodeLabelsAction.ts';
import { base64ToPdfObjectUrl } from '../../../utils/convertUtil.ts';
import { useState } from 'react';
import { logError } from '@repo/client-logger/log';

export function useGenerateBarcodeLabels({
  onError,
  onSuccess,
}: {
  onError: (error: string) => void;
  onSuccess: (message: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateBarcodeLabels = async (bookIds: string[]) => {
    try {
      setIsLoading(true);
      const base64 = await generateBarcodeLabelsAction(bookIds);
      const url = base64ToPdfObjectUrl(base64);
      window.open(url);
      handleSuccess();
    } catch (e) {
      logError({ message: 'generate barcode labels action failed', error: e as Error });
      handleError();
    }
  };

  function handleSuccess() {
    onSuccess('Successfully generated barcode labels pdf. Please check the downloaded file.');
    setIsLoading(false);
  }

  function handleError() {
    onError('Generate barcode labels pdf failed.');
    setIsLoading(false);
  }

  return {
    handleGenerateBarcodeLabels,
    isLoading,
  };
}
