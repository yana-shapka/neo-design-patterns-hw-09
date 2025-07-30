import {UserData} from '../data/UserData';

export abstract class DataExporter {
  protected data: UserData[] = [];
  protected result: string = '';

  public async export(): Promise<void> {
    await this.load();
    this.transform();
    this.beforeRender();
    this.result = this.render();
    this.afterRender();
    this.save();
  }

  protected async load(): Promise<void> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = (await response.json()) as any[];

    this.data = [];
    for (let i = 0; i < users.length; i++) {
      this.data.push({
        id: users[i].id,
        name: users[i].name,
        email: users[i].email,
        phone: users[i].phone,
      });
    }
  }

  protected transform(): void {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = i + 1; j < this.data.length; j++) {
        if (this.data[i].name > this.data[j].name) {
          const temp = this.data[i];
          this.data[i] = this.data[j];
          this.data[j] = temp;
        }
      }
    }
  }

  protected beforeRender(): void {}

  protected afterRender(): void {}

  protected abstract render(): string;
  protected abstract save(): void;
}
