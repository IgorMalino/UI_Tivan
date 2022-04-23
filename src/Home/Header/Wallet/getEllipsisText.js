const getEllipsisText = (str, number) => {
  const newStr = str.split("");

  return [
    ...newStr.slice(0, number),
    "...",
    ...newStr.slice(newStr.length - number),
  ].join("");
};

export default getEllipsisText;
