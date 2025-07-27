import { useController } from '@repo/form/rhf';
import { TextField } from '@repo/mui/TextField';
import { TBookForm } from '../TBookForm.ts';

export const CopyNumber = () => {
  const { field, fieldState } = useController<TBookForm>({
    name: 'copyNumber',
    defaultValue: '',
  });

  return (
    <TextField
      label='Copy Number 冊次複本'
      value={field.value}
      onChange={field.onChange}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
};
