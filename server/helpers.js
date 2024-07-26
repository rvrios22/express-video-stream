function getPaths(uploadResult) {
  let paths = [];
  for (const key in uploadResult) {
    if (Object.hasOwnProperty.bind(uploadResult)(key)) {
      uploadResult[key].forEach(file => {
        paths.push(file.path);
      });
    }
  }
  return paths;
}

function removePublicFromPath(paths) {
  const joinedPaths = []
  paths.forEach((path) => {
    const removedPublic = path.replace('public', '')
    joinedPaths.push(removedPublic)
  })
  return joinedPaths
}

module.exports = { getPaths, removePublicFromPath }