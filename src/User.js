class User {
  constructor(id) {
    this.id = id || 'manager';
    this.username = id ? `customer${this.id}` : 'manager';
  }
}

export default User;
