export const HOST_URL = "http://3.89.96.57:8080"
export function convertDatesToObjects(obj) {
  for (const key in obj) {
    if (obj[key] instanceof Object) {
      // If the value is an object, recursively call the function
      obj[key] = convertDatesToObjects(obj[key]);
    } else if (typeof obj[key] === 'string' && obj[key].match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?[-+]\d{2}:\d{2}$/)) {
      // If the value is a string matching the date pattern, convert it to a Date object
      obj[key] = new Date(obj[key]);
    }
  }
  return obj;
}
