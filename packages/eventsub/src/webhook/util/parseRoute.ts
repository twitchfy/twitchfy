export function parseRoute(path: string){
  
  if(!path.startsWith('/')) return '/' + path;

  return path;
}