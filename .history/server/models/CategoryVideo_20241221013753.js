export class Category {
    constructor(name) {
      this.name = name;
      this.slug = name?.split(" ")?.join("-").toLowerCase();
    }
  
    toPlainObject() {
      return {
        name: this.name,
        slug: this.slug,
      };
    }
  }
  