import { useController } from '@repo/form/rhf';
import { TextField } from '@repo/mui/TextField';
import { TBookForm } from '../TBookForm.ts';

export const Title = () => {
  const { field, fieldState } = useController<TBookForm>({
    name: 'title',
    defaultValue: '',
    rules: {
      required: 'Title is required',
    },
  });

  return (
    <TextField
      label='Title 書題'
      name='title'
      value={field.value}
      onChange={field.onChange}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
};
