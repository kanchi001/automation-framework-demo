import * as XLSX from 'xlsx';
import path from 'path';

export type UserRow = { username: string; password: string };

export function readUsersFromExcel(relativePath: string): UserRow[] {
  const filePath = path.resolve(__dirname, '..', relativePath);
  const wb = XLSX.readFile(filePath);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  return XLSX.utils.sheet_to_json<UserRow>(sheet);
}
