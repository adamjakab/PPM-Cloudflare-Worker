import { Entity } from "./entity";

export class Note extends Entity {
  private _name: string;
  private _type: string;
  private _text: string;
  private _isSecret: boolean;

  constructor(data: any) {
    super(data);
    this.type = data.type;
    this.name = data.name;
    this.text = data.text;
    this.isSecret = data.isSecret;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get isSecret(): boolean {
    return this._isSecret;
  }

  set isSecret(value: boolean) {
    this._isSecret = value;
  }
}
