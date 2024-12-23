export class Product {
    constructor(categoryVideoID) {
      this.categoryVideoID = categoryVideoID;
    }
  
    toPlainObject() {
      return {
        categoryVideoID: this.categoryVideoID,
      };
    }
  }
  