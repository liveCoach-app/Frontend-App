export default function deletePoint(elementArray, id) {
  let tempArr = elementArray.slice(0);
  tempArr.splice(id, 1);
  return tempArr;
};
