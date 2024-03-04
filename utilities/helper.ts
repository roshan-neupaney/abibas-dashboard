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

export const updateArrayState = ( key: string, value: any, setForm: any) => {
  setForm((prev: any) => {
    return 
  })
}

export const UUidGenerator = () => {
  let uuid =
    new Date().getTime().toString(36) +
    "_" +
    (Date.now() + Math.random().toString()).split(".").join("_");
  return uuid;
};
