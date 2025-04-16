import { useSearchParams } from "react-router-dom";

interface QueryParamUpdate {
  key: string;
  value?: string | null;
}

interface QueryParamSameNameUpdate {
  key: string;
  value: string;
}

function useManageQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const readQueryParam = (key: string): string | null => {
    return searchParams.get(key);
  };

  const readQueryParamSameName = (key: string): string[] => {
    return searchParams.getAll(key);
  };

  const readMultipleQueryParam = (
    keys: string[] = []
  ): Record<string, string | null> => {
    const params: Record<string, string | null> = {};
    keys.forEach((key) => {
      if (key) params[key] = searchParams.get(key);
    });
    return params;
  };

  const readMultipleQueryParamSameName = (
    keys: string[] = []
  ): Record<string, string[] | undefined> => {
    const params: Record<string, string[] | undefined> = {};
    keys.forEach((key) => {
      if (key) {
        const values = searchParams.getAll(key);
        params[key] = values.length > 0 ? values : undefined;
      }
    });
    return params;
  };

  const readAllQueryParam = (): Record<string, string> => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  const updateQueryParam = ({ key, value }: QueryParamUpdate): void => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (key) {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    }
    setSearchParams(newSearchParams);
  };

  const updateQueryParamSameName = ({
    key,
    value,
  }: QueryParamSameNameUpdate): void => {
    const newSearchParams = new URLSearchParams(searchParams);
    const stringValue = String(value);
    const currentValues = newSearchParams.getAll(key);

    if (currentValues.includes(stringValue)) {
      const filteredValues = currentValues.filter((v) => v !== stringValue);
      newSearchParams.delete(key);
      filteredValues.forEach((v) => newSearchParams.append(key, v));
    } else {
      newSearchParams.append(key, stringValue);
    }

    setSearchParams(newSearchParams);
  };

  const updateMultipleQueryParam = (
    params: Record<string, string | null | undefined> = {}
  ): void => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (key) {
        if (value) {
          newSearchParams.set(key, value);
        } else {
          newSearchParams.delete(key);
        }
      }
    });
    setSearchParams(newSearchParams);
  };

  const createQueryParam = ({
    key,
    value,
  }: {
    key: string;
    value: string;
  }): void => {
    if (key && !searchParams.has(key)) {
      updateQueryParam({ key, value });
    }
  };

  const createMultipleQueryParam = (
    params: Record<string, string> = {}
  ): void => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (key && !searchParams.has(key)) {
        newSearchParams.set(key, value);
      }
    });
    setSearchParams(newSearchParams);
  };

  const deleteQueryParam = (key: string): void => {
    if (key && searchParams.has(key)) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete(key);
      setSearchParams(newSearchParams);
    }
  };

  const deleteMultipleQueryParam = (keys: string[] = []): void => {
    const newSearchParams = new URLSearchParams(searchParams);
    keys.forEach((key) => {
      if (key) {
        newSearchParams.delete(key);
      }
    });
    setSearchParams(newSearchParams);
  };

  const deleteAllQueryParam = (): void => {
    setSearchParams(new URLSearchParams());
  };

  return {
    readQueryParam,
    readQueryParamSameName,
    readMultipleQueryParam,
    readMultipleQueryParamSameName,
    readAllQueryParam,
    updateQueryParam,
    updateMultipleQueryParam,
    updateQueryParamSameName,
    createQueryParam,
    createMultipleQueryParam,
    deleteQueryParam,
    deleteMultipleQueryParam,
    deleteAllQueryParam,
  };
}

export default useManageQueryParams;
