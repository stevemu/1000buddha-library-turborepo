import { useState } from 'react';
import { addBookAction } from './addBookAction.ts';
import { useForm } from '@repo/form/rhf';
import { TBookForm } from '../book-form/TBookForm.ts';
import { AddBookErrorCode } from '@repo/book/AddBook';
import { logError } from '@repo/client-logger/log';

export const useAddBookForm = ({
  onAddBookSuccess,
  defaultValues,
  successMessage,
  errorMessage,
}: {
  onAddBookSuccess: () => void;
  defaultValues: TBookForm;
  successMessage: string;
  errorMessage: string;
}) => {
  const methods = useForm<TBookForm>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues,
  });
  const [loading, setLoading] = useState(false);
  const { handleSubmit, formState } = methods;
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const { isValid } = formState;

  const handleSubmitClick = async () => {
    setLoading(true);

    try {
      await handleSubmit(handleValid)();
    } catch (e) {
      handleError();
    }
  };

  async function handleValid(data: TBookForm) {
    try {
      const response = await addBookAction({
        barcode: data.barcode,
        title: data.title,
        category: data.category,
        classificationNumber: data.classificationNumber,
        authorNumber: data.authorNumber,
        yearPublished: data.yearPublished,
        copyNumber: data.copyNumber,
        author: data.author,
        placeOfPublication: data.placeOfPublication,
        publisher: data.publisher,
      });
      if (response.errorCode === AddBookErrorCode.BARCODE_EXISTS) {
        handleError('Barcode already exists.');
        return;
      }
      handleSuccess();
    } catch (e) {
      logError({ message: 'add book action failed', error: e as Error });
      handleError();
    }
  }

  function handleSuccess() {
    setSuccess(successMessage);
    setError('');
    setLoading(false);
    onAddBookSuccess();
  }

  function handleError(message = errorMessage) {
    setError(message);
    setSuccess('');
    setLoading(false);
  }

  return {
    handleSubmitClick,
    loading,
    error,
    success,
    methods,
    isValid,
  };
};
