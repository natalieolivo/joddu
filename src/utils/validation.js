export const isNumeric = value => {
  return !isNaN(value) && value !== "";
};

export const validZip = zip => {
  return isNumeric(parseInt(zip)) && zip.length >= 5;
};

export const hasErrors = error => {
  return !Object.values(error).every(e => e === "");
};

export const validateInput = (value, key) => {
  if (key === "email") {
    return value.includes("@") && value.includes(".com");
  } else if (value === "") {
    return false;
  } else {
    return true;
  }
};
