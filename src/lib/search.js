export const searchContacts = (array, searchValue) =>
  array.filter(el => {
    return el.title.toLowerCase().includes(searchValue) ||
      el.address.toLowerCase().includes(searchValue) ||
      el.postal_address.toLowerCase().includes(searchValue)
      ? true
      : false;
  });

export const searchMedia = (array, searchValue) =>
  array.filter(el => {
    return el.title.toLowerCase().includes(searchValue) ||
      el.description.toLowerCase().includes(searchValue)
      ? true
      : false;
  });

export const searchProduct = (array, searchValue) =>
  array.filter(el => {
    return el.title.toLowerCase().includes(searchValue) ? true : false;
  });

export const recursiveSearchByField = (value, field, array) => {};
