export class Attachment{
    constructor(id, name, subject, sender, creation_date, extension, category, url) {
      this.id = id;
      this.name = name;
      this.subject = subject;
      this.sender = sender;
      this.creation_date = creation_date;
      this.extension = extension;
      this.category = category;
      this.url = url;
    }
  }