export class Order {
  constructor(
    userId,
    fullname,
    email,
    delivery_address,
    amount,
    contact,
    payment_method,
    products,
    createdDate = new Date(),

  ) {
    this.userId = userId;
    this.fullname = fullname;
    this.email = email;
    this.delivery_address = delivery_address;
    this.amount = amount;
    this.contact = contact;
    this.payment_method = payment_method;
    this.products = products;
    this.created = createdDate;
  
  }



  // Method to return the order object in plain form (for saving in Firestore)
  toPlainObject() {
    return {
      userId: this.userId,
      fullname: this.fullname,
      email: this.email,
      delivery_address: this.delivery_address,
      amount: this.amount,
      contact: this.contact,
      payment_method: this.payment_method,
      products: this.products,
      created: this.created,

    };
  }
}


export class product extends Order {

}