import { BookResponse } from '@repo/book/BookResponse';

export const getInitialValues = (book: BookResponse) => {
  return {
    barcode: book!.barcode,
    title: book!.title,
    category: book!.category,
    classificationNumber: book!.classificationNumber,
    authorNumber: book!.authorNumber,
    yearPublished: book!.yearPublished,
    copyNumber: book!.copyNumber,
    author: book!.author,
    placeOfPublication: book!.placeOfPublication,
    publisher: book!.publisher,
  };
};
