import {DataExporter} from './DataExporter';
import {writeFileSync, existsSync, mkdirSync} from 'fs';
import {dirname} from 'path';

export class XmlExporter extends DataExporter {
  protected render(): string {
    let result = '<?xml version="1.0" encoding="UTF-8"?>\n';
    result += '<users>\n';

    for (let i = 0; i < this.data.length; i++) {
      let user = this.data[i];
      result += '  <user>\n';
      result += '    <id>' + user.id + '</id>\n';
      result += '    <name>' + user.name + '</name>\n';
      result += '    <email>' + user.email + '</email>\n';
      result += '    <phone>' + user.phone + '</phone>\n';
      result += '  </user>\n';
    }

    result += '</users>';
    return result;
  }

  protected afterRender(): void {
    this.result +=
      '\n<!-- Експорт згенеровано: ' + new Date().toISOString() + ' -->';
  }

  protected save(): void {
    const filePath = './dist/users.xml';
    const dir = dirname(filePath);

    if (!existsSync(dir)) {
      mkdirSync(dir, {recursive: true});
    }

    writeFileSync(filePath, this.result, 'utf8');
    console.log('XML file saved: ' + filePath);
  }
}
