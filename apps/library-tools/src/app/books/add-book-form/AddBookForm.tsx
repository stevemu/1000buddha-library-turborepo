import { Stack } from '@repo/mui/Stack';
import { Alert } from '@repo/mui/Alert';
import { FormProvider } from '@repo/form/rhf';
import { useAddBookForm } from './useAddBookForm.tsx';
import { Barcode } from '../book-form/fields/Barcode/Barcode.tsx';
import { Title } from '../book-form/fields/Title.tsx';
import { Category } from '../book-form/fields/Category.tsx';
import { ClassificationNumber } from '../book-form/fields/ClassificationNumber.tsx';
import { AuthorNumber } from '../book-form/fields/AuthorNumber.tsx';
import { YearPublished } from '../book-form/fields/YearPublished.tsx';
import { CopyNumber } from '../book-form/fields/CopyNumber.tsx';
import { Author } from '../book-form/fields/Author.tsx';
import { PlaceOfPublication } from '../book-form/fields/PlaceOfPublication.tsx';
import { Publisher } from '../book-form/fields/Publisher.tsx';
import { TBookForm } from '../book-form/TBookForm.ts';
import { LoadingButton } from '@repo/mui/LoadingButton';

export const AddBookForm = ({
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
  const { handleSubmitClick, loading, error, success, methods, isValid } = useAddBookForm({
    onAddBookSuccess,
    defaultValues,
    successMessage,
    errorMessage,
  });

  return (
    <FormProvider {...methods}>
      <Stack spacing={1}>
        <Barcode />
        <Title />
        <Author />
        <Category />
        <ClassificationNumber />
        <AuthorNumber />
        <YearPublished />
        <PlaceOfPublication />
        <Publisher />
        <CopyNumber />
        <LoadingButton loading={loading} onClick={handleSubmitClick} disabled={!isValid}>
          Save
        </LoadingButton>
        {success && <Alert severity='success'>{success}</Alert>}
        {error && <Alert severity='error'>{error}</Alert>}
      </Stack>
    </FormProvider>
  );
};
