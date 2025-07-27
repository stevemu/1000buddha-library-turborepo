export class Book {
  constructor(
    public readonly id: string,
    public barcode: string,
    public title: string,
    public category: string,
    public classificationNumber: string,
    public authorNumber: string,
    public author: string,
    public yearPublished: string,
    public placeOfPublication: string,
    public publisher: string,
    public copyNumber: string,
    public dateAdded: Date,
  ) {}
}
