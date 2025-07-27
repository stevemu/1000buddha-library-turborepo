import { useController } from '@repo/form/rhf';
import { TextField } from '@repo/mui/TextField';
import { TBookForm } from '../TBookForm.ts';

export const AuthorNumber = () => {
  const { field, fieldState } = useController<TBookForm>({
    name: 'authorNumber',
    defaultValue: '',
  });

  return (
    <TextField
      label='Author Number 作者號'
      value={field.value}
      onChange={field.onChange}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
};
