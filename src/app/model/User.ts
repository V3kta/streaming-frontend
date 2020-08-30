export class User {
  constructor(
    id: number,
    username: string,
    vorname: string,
    nachname: string,
    password: string
  ) {
    this.id = id;
    this.username = username;
    this.vorname = vorname;
    this.nachname = nachname;
    this.password = password;
  }
  id: number;

  username: string;

  vorname: string;

  nachname: string;

  password: string;

  token?: string;
}
