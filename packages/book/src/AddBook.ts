import { Book } from '@repo/entities/Book';
import { Db } from '@repo/db/Db';
import { UUIDGenerator } from '@repo/uuid/UUIDGenerator';

export type AddBookRequest = {
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

export type AddBookResponse = {
  errorCode?: string;
};

export enum AddBookErrorCode {
  BARCODE_EXISTS = 'BARCODE_EXISTS',
}

export class AddBook {
  constructor(
    private db: Db,
    private uuidGenerator: UUIDGenerator,
  ) {}

  async execute(request: AddBookRequest): Promise<AddBookResponse> {
    const barcodeExists = await this.db.barcodeExists(request.barcode);
    if (barcodeExists) {
      return { errorCode: AddBookErrorCode.BARCODE_EXISTS };
    }
    const newBook = new Book(
      this.uuidGenerator.generate(),
      request.barcode,
      request.title ? request.title.trim() : '',
      request.category ? request.category.trim() : '',
      request.classificationNumber ? request.classificationNumber.trim() : '',
      request.authorNumber ? request.authorNumber.trim() : '',
      request.author ? request.author.trim() : '',
      request.yearPublished ? request.yearPublished.trim() : '',
      request.placeOfPublication ? request.placeOfPublication.trim() : '',
      request.publisher ? request.publisher.trim() : '',
      request.copyNumber ? request.copyNumber.trim() : '',
      new Date(),
    );
    await this.db.createBook(newBook);
    return {};
  }
}
