/**
 * Parses a route to ensure it starts with a forward slash.
 * @param path The path to parse.
 * @returns The parsed path.
 */
export function parseRoute(path: string){
  
  if(!path.startsWith('/')) return '/' + path;

  return path;
}