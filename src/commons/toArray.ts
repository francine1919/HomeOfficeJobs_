const toArray = <Type>(body: Type[] | Type) => {
  if (body) {
    const isEmptyObject = !Object.keys(body).length ? true : false;
    if (isEmptyObject) return [];
    const isArray = Array.isArray(body);
    const bodyArray = isArray ? body : [body];

    return bodyArray;
  } else {
    return [];
  }
};
export default toArray;
