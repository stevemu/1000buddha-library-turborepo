// Constants defining the layout
const LABEL_COLUMNS = 3;
export const LABEL_WIDTH = 198; // Horizontal spacing between columns (214 - 16)
export const LABEL_HEIGHT = 75; // Vertical spacing between rows (620 - 548, etc.)
const START_X = 3;
const START_Y = 26; // Bottom-left corner's y-value

const TOTAL_LABELS = 30;

export const LABEL_POSITIONS = Array.from({ length: TOTAL_LABELS }, (_, index) => {
  const row = Math.floor(index / LABEL_COLUMNS);
  const col = index % LABEL_COLUMNS;

  return {
    x: START_X + col * LABEL_WIDTH,
    y: START_Y + row * LABEL_HEIGHT,
  };
});
//
// // bottom-left corner position of each label
// // from from top left corner of the page
// // to bottom right corner of the page
// export const LABEL_POSITIONS = [
//   { x: 16, y: 692 }, // row 0, column 0
//   { x: 214, y: 692 }, // row 0, column 1
//   { x: 412, y: 692 }, // row 0, column 2
//   { x: 16, y: 620 }, // row 1, column 0
//   { x: 214, y: 620 }, // row 1, column 1
//   { x: 412, y: 620 }, // row 1, column 2
//   { x: 16, y: 548 },
//   { x: 214, y: 548 },
//   { x: 412, y: 548 },
//   { x: 16, y: 476 },
//   { x: 214, y: 476 },
//   { x: 412, y: 476 },
//   { x: 16, y: 404 },
//   { x: 214, y: 404 },
//   { x: 412, y: 404 },
//   { x: 16, y: 332 },
//   { x: 214, y: 332 },
//   { x: 412, y: 332 },
//   { x: 16, y: 260 },
//   { x: 214, y: 260 },
//   { x: 412, y: 260 },
//   { x: 16, y: 188 },
//   { x: 214, y: 188 },
//   { x: 412, y: 188 },
//   { x: 16, y: 116 },
//   { x: 214, y: 116 },
//   { x: 412, y: 116 },
//   { x: 16, y: 44 },
//   { x: 214, y: 44 },
//   { x: 412, y: 44 },
// ];
//
// // width and height of each label
// export const LABEL_WIDTH = 186;
// export const LABEL_HEIGHT = 72;
