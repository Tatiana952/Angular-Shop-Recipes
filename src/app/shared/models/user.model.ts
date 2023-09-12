export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  /**
   * Доступ к свойству token экземпляра класса User
   * @returns Токен, если срок его жизни не истек, в ином случае null
   */
  public get token(): string | null {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
