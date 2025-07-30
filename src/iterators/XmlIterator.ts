import {readFileSync} from 'fs';
import {UserData} from '../data/UserData';

export class XmlIterator implements Iterable<UserData> {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  *[Symbol.iterator](): Iterator<UserData> {
    const content = readFileSync(this.filePath, 'utf8');

    const userMatches = content.match(/<user>(.*?)<\/user>/gs);

    if (userMatches) {
      for (let i = 0; i < userMatches.length; i++) {
        const userBlock = userMatches[i];

        const id = this.extractTagValue(userBlock, 'id');
        const name = this.extractTagValue(userBlock, 'name');
        const email = this.extractTagValue(userBlock, 'email');
        const phone = this.extractTagValue(userBlock, 'phone');

        if (id && name && email && phone) {
          const userData: UserData = {
            id: parseInt(id),
            name: name,
            email: email,
            phone: phone,
          };
          yield userData;
        }
      }
    }
  }

  private extractTagValue(text: string, tagName: string): string | null {
    const regex = new RegExp(`<${tagName}>(.*?)<\/${tagName}>`, 'i');
    const match = text.match(regex);
    return match ? match[1].trim() : null;
  }
}
