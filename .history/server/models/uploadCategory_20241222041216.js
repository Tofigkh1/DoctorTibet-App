export class Upload {
    constructor(categoryVideoID) {
      this.categoryVideoID = categoryVideoID;
    }
  
    toPlainObject() {
      return {
        categoryVideoID: this.categoryVideoID,
      };
    }
  }
  