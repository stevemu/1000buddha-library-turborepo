export function getShouldDisableDeleteBooksButton(numberOfSelectedBooks: number) {
  const enableDeleteBooksButton = numberOfSelectedBooks > 0;
  return !enableDeleteBooksButton;
}
