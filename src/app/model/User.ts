export class User {
  constructor(
    id: number,
    email: string,
    username: string,
    vorname: string,
    nachname: string,
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.vorname = vorname;
    this.nachname = nachname;
  }
  id: number;

  email: string;

  username: string;

  vorname: string;

  nachname: string;

  token?: string;
}
