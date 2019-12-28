import randomString from "randomstring";
import { NumberFormatValues } from "react-number-format";
import { Nullable } from "utils/types";

export const addRequestAnimationFrame = () => {
  if (typeof window !== undefined && !window.requestAnimationFrame)
    window.requestAnimationFrame = () => -1;
};

export const getPercentageValue = (
  value: number,
  totalValue: number
): number => {
  const percentage = Math.round((value / totalValue) * 100);
  return isNaN(percentage) ? 0 : percentage;
};

const getType = (value: any): string =>
  Array.isArray(value) ? "array" : typeof value;

const getArrayType = (array: any[]): Nullable<string> => {
  const supposedType = getType(array[0]);
  const isUniform = array
    .map(getType)
    .map(item => Object.is(item, supposedType))
    .reduce((prev: boolean, cur: boolean) => cur && prev);
  return isUniform ? supposedType : null;
};

const merge = <T>(...args: any[][] | {}[]): any[] | object | T => {
  switch (getArrayType(args)) {
    case "object":
      return mergeObjects(args);
    case "array":
      return mergeArrays(args as any[][]);
    default:
      return args[0];
  }
};

const mergeObjects = (items: object[]): object => {
  let result: object = {};
  items.forEach((item: object) => {
    result = { ...result, ...item };
  });
  return result;
};

const mergeArrays = (items: any[][]): any[] => {
  let result: any[] = [];
  items.forEach((item: any[]) => {
    result = [...result, ...item];
  });
  return result;
};

const hasCorrectCountNulls = (
  value: string,
  countNulls: number = 1
): boolean => {
  const [whole, fraction] = value.split(".");
  if (fraction === undefined) return true;
  return fraction.length <= countNulls;
};

const allowValuesNumberFormat = (
  {
    from,
    to
  }: {
    from: number;
    to: number;
  } = { from: Number.MIN_SAFE_INTEGER, to: Number.MAX_SAFE_INTEGER }
) => ({ formattedValue, floatValue }: NumberFormatValues): boolean =>
  formattedValue === "" ||
  formattedValue === "0." ||
  (floatValue >= from &&
    floatValue <= to &&
    hasCorrectCountNulls(formattedValue));

export const allowPositiveValuesNumberFormat = (countNulls: number = 1) => ({
  value,
  formattedValue,
  floatValue
}: NumberFormatValues): boolean => {
  return (
    formattedValue === "" ||
    formattedValue === "0." ||
    (formattedValue[0] !== "-" &&
      floatValue >= 0 &&
      hasCorrectCountNulls(value, countNulls))
  );
};

const getNumberWithoutSuffix = (str: string): Nullable<number> => {
  let result = null;
  let coincidence = str.match(/^[^\d]*(\d+)/);

  if (coincidence) {
    result = Number(coincidence[0]);
  }

  return result;
};

const convertToArray = (value: any): any[] =>
  Array.isArray(value) ? value : [value];

const isServer = () => {
  return global.hasOwnProperty("window");
};

const getRandomInteger = (min: number, max: number): number =>
  Math.floor(min + Math.random() * (max + 1 - min));

const getRandomText = (params: Object) => randomString.generate(params);

export const getRandomWord = (params?: Object) =>
  randomString.generate({
    length: getRandomInteger(3, 8),
    readable: true,
    charset: "alphabetic",
    ...params
  });

export const getRandomWords = (length: number) =>
  tableLoaderCreator(getRandomWord, length).join(" ");

export const getRandomColorNumber = () => getRandomInteger(0, 255).toString(16);

const getRandomColor = () =>
  `#${getRandomColorNumber}${getRandomColorNumber}${getRandomColorNumber}`;

export const tableLoaderCreator = (
  itemCreator: (...args: any) => any,
  count: number | undefined = 10
) =>
  Array(count)
    .fill("")
    .map(itemCreator);

export const rawUrlEncode = (str: string): string =>
  encodeURIComponent(str)
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A");

export {
  getRandomText,
  getRandomInteger,
  getType,
  getArrayType,
  allowValuesNumberFormat,
  getNumberWithoutSuffix,
  convertToArray,
  merge,
  mergeObjects,
  mergeArrays,
  isServer,
  getRandomColor
};
