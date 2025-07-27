import { Stack } from '@repo/mui/Stack';
import { Button } from '@repo/mui/Button';
import { TextField } from '@repo/mui/TextField';

export function Search({
  searchTerm,
  handleSearchTermChange,
  handleSearchBooksClick,
  handleClearClick,
}: {
  searchTerm: string;
  handleSearchTermChange: (searchTerm: string) => void;
  handleSearchBooksClick: (searchTerm: string) => void;
  handleClearClick: () => void;
}) {
  const enableSearchButton = !!searchTerm;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchBooksClick(searchTerm);
    }
  };

  return (
    <Stack direction={'row'} spacing={1}>
      <TextField
        label='Search by any field'
        value={searchTerm}
        onChange={(e) => handleSearchTermChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={() => handleSearchBooksClick(searchTerm)} disabled={!enableSearchButton}>
        Search
      </Button>
      <Button onClick={() => handleClearClick()}>Clear</Button>
    </Stack>
  );
}
