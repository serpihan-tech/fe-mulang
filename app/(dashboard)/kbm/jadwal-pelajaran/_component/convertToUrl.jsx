
const convertToQuery = (obj) => {
    return Object.entries(obj)
      .flatMap(([key, values]) =>
        Array.isArray(values)
          ? values.map((value) => `&${key}=${encodeURIComponent(value)}`)
          : [`&${key}=${encodeURIComponent(values)}`]
      )
      .join('');
  };
  
  export default convertToQuery;