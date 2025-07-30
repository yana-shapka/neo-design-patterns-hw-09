import {DataExporter} from './DataExporter';
import {writeFileSync, existsSync, mkdirSync} from 'fs';
import {dirname} from 'path';

export class CsvExporter extends DataExporter {
  protected render(): string {
    let result = 'id,name,email,phone\n';

    for (let i = 0; i < this.data.length; i++) {
      const user = this.data[i];
      result +=
        user.id + ',' + user.name + ',' + user.email + ',' + user.phone + '\n';
    }

    return result;
  }

  protected save(): void {
    const filePath = './dist/users.csv';
    const dir = dirname(filePath);

    if (!existsSync(dir)) {
      mkdirSync(dir, {recursive: true});
    }

    writeFileSync(filePath, this.result, 'utf8');
    console.log('CSV file saved: ' + filePath);
  }
}
