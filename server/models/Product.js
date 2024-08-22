export class Product {
  constructor(name, description, price, rest_id, img_url, cover_url, category_id, allDescription) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.img_url = img_url;
    this.rest_id = rest_id;
    this.cover_url = cover_url;
    this.category_id = category_id;
    this.allDescription = allDescription;
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
