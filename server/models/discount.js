export class Discount {
    constructor(userId, uniqueToken, date = new Date()) {
      this.userId = userId; // Kullanıcı kimliği (JWT'den alınır)
      this.uniqueToken = uniqueToken; // 12 basamaklı, benzersiz token
      this.date = date; // İndirim oluşturulma tarihi
    }
  
    toPlainObject() {
      return {
        userId: this.userId,
        uniqueToken: this.uniqueToken,
        date: this.date,
      };
    }
  }
  