export const generateQueryString = ({
  queryObject,
}: {
  queryObject: Record<string, unknown>;
}) => {
  // If queryObject is void (undefined), default to an empty object
  const validQueryObject = queryObject ?? {};

  const queryString = new URLSearchParams(
    Object.entries(validQueryObject).reduce((acc, [key, value]) => {
      acc[key] = String(value); // safely stringify values
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  return {
    queryString: queryString ? `?${queryString}` : "",
  };
};
