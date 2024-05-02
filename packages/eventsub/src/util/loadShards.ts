import { readdir, stat } from 'fs/promises';
import { extname, join, resolve } from 'path';

export async function loadShards(paths: string[]): Promise<string[]> {
  const jsFiles: string[] = [];

  async function exploreDirectory(directoryPath: string): Promise<void> {
    const contents = await readdir(directoryPath);

    for (const name of contents) {
      const fullPath = join(directoryPath, name);
      const stats = await stat(fullPath);

      if (stats.isFile() && extname(fullPath) === '.js') {
        jsFiles.push(fullPath);
      } else if (stats.isDirectory()) {
        await exploreDirectory(fullPath);
      }
    }
  }

  for (const path of paths) {
    const absolutePath = resolve(path);
    const stats = await stat(absolutePath);
    if (stats.isFile() && extname(absolutePath) === '.js') {
      jsFiles.push(absolutePath);
    } else if (stats.isDirectory()) {
      await exploreDirectory(absolutePath);
    }
  }

  return jsFiles;
}
