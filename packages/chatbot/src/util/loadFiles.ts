import { readdir, stat } from 'fs/promises';
import { join } from 'path';

/**
 * Load all files from a directory.
 * @param dirPath The path of the directory to load the files from.
 * @returns The loaded files.
 * @internal
 */
export async function loadFiles<T>(dirPath: string): Promise<{ default: T }[]>{
    
  const files: { default: T }[] = [];

  const dir = await readdir(dirPath);

  for(const content of dir){

    const path = join(dirPath, content);

    const data = await stat(path);

    if(data.isDirectory()){
        
      const loadedFiles = await loadFiles<T>(path);

      files.push(...loadedFiles);

    } else {

      const fileData = await magicImport(path);

      files.push(fileData);
    }

  }

  return files;

}

export async function magicImport(path: string) {
  try {
    return require(path);
  } catch {
    return eval('((path) => import(`file:///${path}?update=${Date.now()}`))')(path.split('\\').join('\\\\'));
  }
}