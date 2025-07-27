import { useController } from '@repo/form/rhf';
import { TextField } from '@repo/mui/TextField';
import { TBookForm } from '../TBookForm.ts';

export const Category = () => {
  const { field, fieldState } = useController<TBookForm>({
    name: 'category',
    defaultValue: '',
  });

  return (
    <TextField
      label='Category 類別'
      name='category'
      value={field.value}
      onChange={field.onChange}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
};
