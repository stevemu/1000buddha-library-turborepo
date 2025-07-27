import { BookResponse } from '@repo/book/BookResponse';
import { MouseEvent } from 'react';

export const useCheckboxClick = ({
  books,
  selected,
  onSelectedChange,
}: {
  books: BookResponse[];
  selected: string[];
  onSelectedChange: (ids: string[]) => void;
}) => {
  const handleShiftClick = (index: number) => {
    if (selected.length === 0) {
      return;
    }
    let newSelected: string[] = createNewSelectedForShiftClick(selected, books, index);
    onSelectedChange(newSelected);
  };

  const handleCheckboxClick = (event: MouseEvent<unknown>, id: string, index: number) => {
    if (event.shiftKey) {
      handleShiftClick(index);
      return;
    }

    let newSelected: string[] = createNewSelectedForClick(selected, id);
    onSelectedChange(newSelected);
  };

  return {
    handleCheckboxClick,
  };
};

function findAnchorRowIndex(selected: string[], books: BookResponse[], targetRowIndex: number) {
  if (selected.length === 0) {
    return -1;
  }

  for (let anchorRowIndex = targetRowIndex; anchorRowIndex >= 0; anchorRowIndex--) {
    if (selected.includes(books[anchorRowIndex]!.id)) {
      return anchorRowIndex;
    }
  }

  return -1;
}

export function createNewSelectedForShiftClick(
  selected: string[],
  books: BookResponse[],
  targetRowIndex: number,
) {
  let newSelected: string[] = [...selected];
  let anchorRowIndex = findAnchorRowIndex(selected, books, targetRowIndex);
  if (anchorRowIndex >= 0) {
    newSelected = [
      ...newSelected,
      ...books.slice(anchorRowIndex + 1, targetRowIndex + 1).map((book) => book.id),
    ];
  }
  return newSelected;
}

function createNewSelectedForClick(selected: string[], id: string) {
  const selectedIndex = selected.indexOf(id);
  let newSelected: string[] = [];

  if (selectedIndex === -1) {
    // clicking on a unselected checkbox
    // add the selected checkbox
    newSelected = newSelected.concat(selected, id);
  } else if (selectedIndex === 0) {
    // click on the first selected checkbox
    // remove the selected checkbox
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    // clicking on the last selected checkbox
    // remove the selected checkbox
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    // clicking on a selected checkbox
    // remove the selected checkbox
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1),
    );
  }

  return newSelected;
}
