export class Category {
    constructor(name, img_url) {
      this.name = name
      this.slug = name?.split(" ")?.join("-").toLowerCase();
    }
  
    toPlainObject() {
      return {
        name: this.name,
        img_url: this.img_url,
        slug: this.slug,
      };
    }
  }
  