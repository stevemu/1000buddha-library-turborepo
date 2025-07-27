# Seed

Seed books from csv files that converted from excel files.

## .env Setup:

```
POSTGRES_URL="..."
```

## csv-files folder Setup

create "csv-files" folder in the root, and add books.csv to it.

## process

1. use Postico to run `DELETE FROM "public"."Book"` to clear database if needed
2. run npm script to seed