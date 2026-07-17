import { memoizeFunction } from "@/lib/utils/memo-func";

export const formatNumber = memoizeFunction(
  (
    x: number | string,
    fixedNumber: number | null = null,
    decimalCharacter = ".",
  ) => {
    if (x && fixedNumber) {
      if (typeof x === "string") {
        x = parseFloat(x);
      }
      x = Number(x.toFixed(fixedNumber));
    }
    x = x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, decimalCharacter);

    return x;
  },
);

export const formatMoney = memoizeFunction(
  (value?: number | string, fixedNumber?: any) => {
    if (value === undefined || value === null) return "";
    return formatNumber(value, fixedNumber ?? null, ",");
  },
);

export function generateReadMoneyVND(number: number) {
  const arrOne = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];

  let num = parseInt(number.toString());
  const arrPos = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ", "tỷ tỷ"];
  let result = "";

  if (num === 0) {
    return "không đồng";
  }

  const readBlock = (block: number) => {
    let blockStr = "";
    const hundred = Math.floor(block / 100);
    const ten = Math.floor((block % 100) / 10);
    const unit = block % 10;

    if (hundred > 0) {
      blockStr += arrOne[hundred] + " trăm ";
    }

    if (ten > 1) {
      blockStr += arrOne[ten] + " mươi ";
      if (unit === 1) {
        blockStr += "mốt ";
      }
    } else if (ten === 1) {
      blockStr += "mười ";
      if (unit === 1) {
        blockStr += "một ";
      }
    }

    if (ten !== 1 && unit !== 0) {
      if (ten === 0 && hundred !== 0) {
        blockStr += "linh ";
      } else blockStr += arrOne[unit] + " ";
    }

    return blockStr;
  };

  let idx = 0;
  while (num > 0) {
    const block = num % 1000;
    if (block > 0) {
      result = readBlock(block) + arrPos[idx] + " " + result;
    }
    num = Math.floor(num / 1000);
    idx++;
  }
  return result.slice(0, 1).toLocaleUpperCase() + result.slice(1) + "đồng";
}

export const encodeVietnamText = (text: string) => {
  return encodeURIComponent(
    text
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      ?.toUpperCase(),
  );
};
