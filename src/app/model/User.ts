export class User {
  constructor(
    id: number,
    email: string,
    username: string,
    vorname: string,
    nachname: string,
    password: string
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.vorname = vorname;
    this.nachname = nachname;
    this.password = password;
  }
  id: number;

  email: string;

  username: string;

  vorname: string;

  nachname: string;

  password: string;

  token?: string;
}
