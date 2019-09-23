export class Exam {
  constructor(
    public title: string,
    public description: string,
    // tslint:disable-next-line:variable-name
    public long_description: string,
    public _id?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string,
  ) {
  }
}
