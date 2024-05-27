export function DecodeJWT(token: string) {
  try {
    const jwt = Buffer.from(token.split(".")[1], "base64").toString();
    return JSON.parse(jwt);
  } catch (e) {}
  return {};
}

export const updateState = (
  key: string,
  value: any,
  setForm: any,
  updateError?: React.Dispatch<React.SetStateAction<any>> | null
) => {
  setForm((prev: any) => {
    return { ...prev, [key]: value };
  });
  if (updateError) {
    updateError((prev: any) => {
      return { ...prev, [key]: "" };
    });
  }
};

export const UUidGenerator = () => {
  let uuid =
    new Date().getTime().toString(36) +
    "_" +
    (Date.now() + Math.random().toString()).split(".").join("_");
  return uuid;
};

export function groupBy<T>(array: T[], key: (item: T) => string): Record<string, T[]> {
  return array?.reduce((result, item) => {
    const keyValue = key(item);
    if (!result[keyValue]) {
      result[keyValue] = [];
    }
    result[keyValue].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

export function groupByObject<T>(array: T[], key: (item: T) => string): Record<string, T[]> {
  return array?.reduce((result: any, item: any) => {
    const keyValue = key(item);
    if (!result[keyValue]) {
      result[keyValue] = {};
    }
    result[keyValue]= item;
    return result;
  }, {} as Record<string, T[]>);
}
