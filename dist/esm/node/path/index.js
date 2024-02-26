import path from 'path';
export var getProjectPath = function getProjectPath() {
  var sourcePath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.';
  return path.join(process.cwd(), sourcePath);
};