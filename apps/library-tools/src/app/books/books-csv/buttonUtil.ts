export function getShouldDisableGenerateBookCsvButton(numberOfSelectedBooks: number) {
  const enableGenerateBookCsvButton = numberOfSelectedBooks > 0;
  return !enableGenerateBookCsvButton;
}
