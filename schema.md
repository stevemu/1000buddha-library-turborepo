# Database schema

```
CREATE TABLE "Book" (
    title text NOT NULL,
    author_number text,
    year_published text,
    id text PRIMARY KEY,
    barcode text NOT NULL UNIQUE,
    category text,
    classification_number text,
    copy_number text,
    author text,
    place_of_publication text,
    publisher text,
    date_added text NOT NULL
);

```