export class Product {
    constructor(name, description, price, rest_id, img_url, cover_url, category_id, allDescription) {

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
        category_id: this.category_id,
        allDescription: this.allDescription,
      };
    }
  }
  