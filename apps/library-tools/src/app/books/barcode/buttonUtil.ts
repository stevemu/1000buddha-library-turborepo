import { AVERY_5160_MAX_NUMBER_OF_LABELS_PER_PAGE } from '@repo/constants';

export function getShouldDisableGenerateBarcodeLabelsButton(numberOfSelectedBooks: number) {
  const enableGenerateSpineLabelsButton =
    numberOfSelectedBooks > 0 && numberOfSelectedBooks <= AVERY_5160_MAX_NUMBER_OF_LABELS_PER_PAGE;
  return !enableGenerateSpineLabelsButton;
}
