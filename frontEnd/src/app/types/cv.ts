export class CV {
  public Email: string;
  public Filename: string;
  public Uploaded: string;
  public File: string;
  public Type: string;
  public Size: number;

  constructor(
    email: string,
    filename: string,
    uploaded: string,
    file: string,
    type: string,
    size: number,
  ) {
    this.Email = email;
    this.Filename = filename;
    this.Uploaded = uploaded;
    this.File = file;
    this.Type = type;
    this.Size = size;
  }
}
