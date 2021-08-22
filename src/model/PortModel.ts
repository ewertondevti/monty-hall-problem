export default class PortModel {
  #port: number;
  #hasGift: boolean;
  #selected: boolean;
  #opened: boolean;

  constructor(port: number, hasGift = false, selected = false, opened = false) {
    this.#port = port;
    this.#hasGift = hasGift;
    this.#selected = selected;
    this.#opened = opened;
  }

  get port() {
    return this.#port;
  }
  get hasGift() {
    return this.#hasGift;
  }
  get selected() {
    return this.#selected;
  }
  get opened() {
    return this.#opened;
  }

  changeSelect() {
    const selected = !this.selected;
    return new PortModel(this.port, this.hasGift, selected, this.opened);
  }

  changeDoorStatus() {
    const open = !this.opened;
    return new PortModel(this.port, this.hasGift, this.selected, open);
  }

  deselect() {
    const selected = false;
    return new PortModel(this.port, this.hasGift, selected, this.opened);
  }

  openDoor() {
    const opened = true;
    return new PortModel(this.port, this.hasGift, this.selected, opened);
  }
}
