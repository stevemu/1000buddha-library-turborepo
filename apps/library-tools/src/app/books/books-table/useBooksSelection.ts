import { useState } from 'react';

const mock = [
  'b26dd12a-0753-4cae-b6a0-5ab1cc2b5db0',
  'ed6779f6-5c5b-4542-83b4-473ea86b90e3',
  '58a008d7-b89e-4c88-b9ca-4156ce8c0df0',
  'a60b49f6-eaa5-4902-b9ba-eab01dc54a0d',
  '484935b1-52a2-4484-b826-eb8812fd7926',
  '122d70ae-b3bc-4d0f-bfbc-7ad0ae2c948e',
  '884e69f0-da81-4eee-bbe2-bf2005c86246',
  '35af5f9d-4b2c-421e-8169-b0a4be0f56b8',
  'aff4e2dc-be20-4614-9e01-e1527f7ecb55',
  'd6f9168a-de5f-45d8-833e-1cb88467045f',
  '8d3e9762-2531-4e96-951e-d1640cf58825',
  '91f71c67-aa86-4e88-a98f-d21b3e32c5cc',
  '3a70bcf5-346a-43bb-8e33-ee2efa9d043d',
  '9352da79-f85d-474b-87d8-db162715eaac',
  '4deec4f5-c4cc-4ce5-a799-c36d7f244b6c',
  '5613af06-9dc2-40b1-bde2-4336cbcd1b4d',
  '4edfa386-ea1e-4a43-ae92-717a8464df1d',
  'ee07a03b-c245-408d-b729-334ef1e1159b',
  '5d1a3e40-ec2a-44e4-b169-4f9e7ac09ac5',
  '94b4ef3d-0cd4-4ff2-a265-ffc5a286220d',
  '7e5ee208-7ee6-414d-add3-a4eba291eeee',
  '9bd20856-48d1-4485-8bc2-298d54eef24a',
  'b05cc26c-8d0e-4d06-ae2f-a7cbb1da2c42',
  '19c0a1de-61fa-4695-982d-2cb6a709a2b3',
  '08e8e920-05a2-48a6-bcb1-53e8ade3ea05',
  'ab3f90f6-472d-4d72-98f5-10fa9127414c',
  'b3b71c0f-f977-4573-ac69-70b0a0225607',
  '68b18679-b408-4785-bef6-96e001ea2894',
  'b47fc513-c17e-4119-b7af-fc419969a09c',
  '4027eebf-61ba-4a13-9957-83992b2dc1d9',
];

export const useBooksSelection = () => {
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

  const handleSelectedBooksChanged = (ids: string[]) => {
    setSelectedBookIds(ids);
  };

  const resetSelectedBooks = () => {
    setSelectedBookIds([]);
  };

  return {
    selectedBookIds,
    handleSelectedBooksChanged,
    resetSelectedBooks,
  };
};
