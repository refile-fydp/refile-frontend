export class Thread{
  
    constructor(name, senderEmail, creation_date) {
      this.name = name;
      this.senderEmail = senderEmail;
      this.creation_date = formatDate(creation_date);

    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  