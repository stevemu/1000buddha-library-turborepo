import { useController } from '@repo/form/rhf';
import { TextField } from '@repo/mui/TextField';
import { TBookForm } from '../TBookForm.ts';

export const YearPublished = () => {
  const { field, fieldState } = useController<TBookForm>({
    name: 'yearPublished',
    defaultValue: '',
  });

  return (
    <TextField
      label='Year Published 出版年'
      value={field.value}
      onChange={field.onChange}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
};
