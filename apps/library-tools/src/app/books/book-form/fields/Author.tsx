import { useController } from '@repo/form/rhf';
import { TextField } from '@repo/mui/TextField';
import { TBookForm } from '../TBookForm.ts';

export const Author = () => {
  const { field, fieldState } = useController<TBookForm>({
    name: 'author',
    defaultValue: '',
  });

  return (
    <TextField
      label='Author 作者'
      value={field.value}
      onChange={field.onChange}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
};
