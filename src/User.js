class User {
  constructor(id) {
    this.id = id || 'manager';
    this.username = id ? `customer${this.id}` : 'manager';
    this.password = 'overlook2020';
  }
}

export default User;
