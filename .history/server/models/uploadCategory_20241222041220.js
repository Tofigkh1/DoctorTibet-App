export class UploadCategory {
    constructor(categoryVideoID) {
      this.categoryVideoID = categoryVideoID;
    }
  
    toPlainObject() {
      return {
        categoryVideoID: this.categoryVideoID,
      };
    }
  }
  