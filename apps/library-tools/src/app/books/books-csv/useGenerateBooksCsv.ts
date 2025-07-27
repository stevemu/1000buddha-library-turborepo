import { useState } from 'react';
import { generateBooksCsvAction } from './generateBooksCsvAction.ts';
import { createCsvBlob, downloadBlob } from './csvUtil.ts';
import { logError } from '@repo/client-logger/log';

export function useGenerateBooksCsv({
  onError,
  onSuccess,
}: {
  onError: (error: string) => void;
  onSuccess: (message: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateBookCsv = async (bookIds: string[]) => {
    try {
      setIsLoading(true);
      const csvString = await generateBooksCsvAction(bookIds);
      const blob = createCsvBlob(csvString);
      downloadBlob(blob, 'books.csv');
      handleSuccess();
    } catch (e) {
      logError({ message: 'generate books csv action failed', error: e as Error });
      handleError();
    }
  };

  function handleSuccess() {
    onSuccess('Successfully generated books csv. Please check the downloaded file.');
    setIsLoading(false);
  }

  function handleError() {
    onError('Generate books csv failed.');
    setIsLoading(false);
  }

  return {
    handleGenerateBookCsv,
    isLoading,
  };
}
