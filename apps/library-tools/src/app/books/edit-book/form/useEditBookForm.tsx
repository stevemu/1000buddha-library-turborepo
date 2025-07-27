import { useState } from 'react';
import { editBookAction } from './editBookAction.ts';
import { useForm } from '@repo/form/rhf';
import { TBookForm } from '../../book-form/TBookForm.ts';
import { logError } from '@repo/client-logger/log';

export const useEditBookForm = ({
  defaultValues,
  onEditBookSuccess,
  bookId,
}: {
  defaultValues: TBookForm;
  onEditBookSuccess: () => void;
  bookId: string;
}) => {
  const methods = useForm<TBookForm>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues,
  });
  const [submitting, setSubmitting] = useState(false);
  const { handleSubmit, formState } = methods;
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const { isValid, isLoading: isFormLoading } = formState;

  const handleSubmitClick = async () => {
    setSubmitting(true);

    try {
      await handleSubmit(handleValid)();
    } catch (e) {
      handleError();
    }
  };

  async function handleValid(data: TBookForm) {
    try {
      await editBookAction({
        id: bookId,
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
      handleSuccess();
    } catch (e) {
      logError({ message: 'handleValid failed', error: e as Error });
      handleError();
    }
  }

  function handleSuccess() {
    setSuccess('Successfully saved book.');
    setError('');
    setSubmitting(false);
    onEditBookSuccess();
  }

  function handleError() {
    setError('Save book failed.');
    setSuccess('');
    setSubmitting(false);
  }

  return {
    handleSubmitClick,
    loading: isFormLoading || submitting,
    error,
    success,
    methods,
    isValid,
  };
};
