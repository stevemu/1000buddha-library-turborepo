'use client';

import { AppBar } from '../../components/AppBar/AppBar.tsx';
import { TextField } from '@repo/mui/TextField';
import { LoadingButton } from '@repo/mui/LoadingButton';
import { Stack } from '@repo/mui/Stack';
import { useState } from 'react';
import { Alert } from '@repo/mui/Alert';
import { createLibraryCardAction } from './createLibraryCardAction.ts';
import { base64ToPdfObjectUrl } from '../../utils/convertUtil.ts';
import { logError } from '@repo/client-logger/log';

export const LibraryCardsPage = () => {
  const [name, setName] = useState('阿彌陀佛');
  const [barcode, setBarcode] = useState('123456');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string>('');

  const handleClick = async () => {
    setLoading(true);
    try {
      const base64 = await createLibraryCardAction({ name, barcode });
      const url = base64ToPdfObjectUrl(base64);
      window.open(url);
      handleSuccess();
    } catch (e) {
      logError({ message: 'create library card action failed', error: e as Error });
      handleError();
    }
  };

  const handleSuccess = () => {
    setSuccess('Successfully created library card. Please check the downloaded file.');
    setError('');
    setLoading(false);
  };

  const handleError = () => {
    setError('Create library card failed.');
    setSuccess('');
    setLoading(false);
  };

  const enableCreateButton = name && barcode;

  return (
    <>
      <AppBar title={'Library Cards'} />
      <Stack sx={{ p: 2 }} direction={'column'} spacing={1}>
        <TextField label='Name' value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label='Barcode' value={barcode} onChange={(e) => setBarcode(e.target.value)} />
        <LoadingButton loading={loading} onClick={handleClick} disabled={!enableCreateButton}>
          Create library card
        </LoadingButton>
        {success && <Alert severity='success'>{success}</Alert>}
        {error && <Alert severity='error'>{error}</Alert>}
      </Stack>
    </>
  );
};
