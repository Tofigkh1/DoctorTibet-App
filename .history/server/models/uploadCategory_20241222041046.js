export class Product {
    constructor(categoryVideoID) {
      this.categoryVideoID = categoryVideoID;
    }
  
    toPlainObject() {
      return {
        name: this.name,
        description: this.description,
        price: this.price,
        img_url: this.img_url,
        rest_id: this.rest_id,
        cover_url: this.cover_url,
        categoryVideoID: this.categoryVideoID,
        allDescription: this.allDescription,
      };
    }
  }
  