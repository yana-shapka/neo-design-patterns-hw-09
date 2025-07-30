import { readFileSync } from 'fs';
import { UserData } from '../data/UserData';

export class JsonIterator implements Iterable<UserData> {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  *[Symbol.iterator](): Iterator<UserData> {
    const content = readFileSync(this.filePath, 'utf8');
    const users: UserData[] = JSON.parse(content);
    
    for (let i = 0; i < users.length; i++) {
      yield users[i];
    }
  }
}