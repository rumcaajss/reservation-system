export const generateDocId = function() {
  let currentDate = new Date();
  let key = [currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()].join('_');
  return key;
}

