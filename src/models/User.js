export class User{
  
    constructor(userId, email, name, categories) {
      this.userId = userId;
      this.email = email;
      this.name = name;
      this.categories = categories;
      //categories is an array of strings
    }
  }
