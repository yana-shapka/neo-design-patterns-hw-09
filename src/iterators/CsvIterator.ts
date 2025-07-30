import {readFileSync} from 'fs';
import {UserData} from '../data/UserData';

export class CsvIterator implements Iterable<UserData> {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  *[Symbol.iterator](): Iterator<UserData> {
    const content = readFileSync(this.filePath, 'utf8');
    const lines = content.split('\n');

    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() !== '') {
        const parts = line.split(',');
        if (parts.length >= 4) {
          const user: UserData = {
            id: parseInt(parts[0]),
            name: parts[1],
            email: parts[2],
            phone: parts[3],
          };
          yield user;
        }
      }
    }
  }
}
