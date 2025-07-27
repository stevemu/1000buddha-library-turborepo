import { Db } from '@repo/db/Db';

export type UpdateBookRequest = {
  id: string;
  barcode: string;
  title: string;
  category: string;
  classificationNumber: string;
  authorNumber: string;
  yearPublished: string;
  copyNumber: string;
  author: string;
  placeOfPublication: string;
  publisher: string;
};

export class UpdateBook {
  constructor(private db: Db) {}

  async execute(request: UpdateBookRequest): Promise<void> {
    const book = await this.db.getBook(request.id);
    book.barcode = request.barcode ? request.barcode.trim() : '';
    book.title = request.title ? request.title.trim() : '';
    book.category = request.category ? request.category.trim() : '';
    book.classificationNumber = request.classificationNumber
      ? request.classificationNumber.trim()
      : '';
    book.authorNumber = request.authorNumber ? request.authorNumber.trim() : '';
    book.yearPublished = request.yearPublished ? request.yearPublished.trim() : '';
    book.copyNumber = request.copyNumber ? request.copyNumber.trim() : '';
    book.author = request.author ? request.author.trim() : '';
    book.placeOfPublication = request.placeOfPublication ? request.placeOfPublication.trim() : '';
    book.publisher = request.publisher ? request.publisher.trim() : '';
    await this.db.updateBook(book);
  }
}
