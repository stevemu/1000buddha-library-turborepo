import { useController } from '@repo/form/rhf';
import { TextField } from '@repo/mui/TextField';
import { TBookForm } from '../../TBookForm.ts';
import { Stack } from '@repo/mui/Stack';
import { Actions } from './Actions.tsx';

export const Barcode = () => {
  const { field, fieldState } = useController<TBookForm>({
    name: 'barcode',
    defaultValue: '',
    rules: {
      required: 'Barcode is required',
    },
  });

  return (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      <TextField
        sx={{ flexGrow: 1 }}
        label='Barcode 條形碼'
        name='barcode'
        value={field.value}
        onChange={field.onChange}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
      <Actions onSuccess={field.onChange} />
    </Stack>
  );
};
