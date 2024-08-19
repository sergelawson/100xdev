function binToUint(bin: number | string): number {
  const binArray = String(bin)
    .split("")
    .map((num) => Number(num))
    .reverse();

  let value = 0;

  for (let i = 0; i < binArray.length; i++) {
    value += binArray[i] * 2 ** i;
  }
  return value;
}

function UintToBin(uint: number): number {
  let binArray: number[] = [];

  while (uint > 0) {
    const value = Number(uint % 2 != 0);

    binArray.push(value);

    uint = Math.floor(uint / 2);
  }
  return Number(binArray.reverse().join(""));
}

function BinToBytes(bin: string): Uint8Array {
  const uInt8Array = new Uint8Array(Math.ceil(bin.length / 8));

  const binStr = bin.split("");

  let count = 1;

  let byteIndex = 0;

  let byteValue = "";

  for (let i = 0; i < binStr.length; i++) {
    byteValue = byteValue + binStr[i];

    if (count == 8) {
      uInt8Array[byteIndex] = binToUint(byteValue);
      count = 1;
      byteValue = "";
      byteIndex++;
      continue;
    }
    count++;
  }
  if (count > 1) {
    uInt8Array[byteIndex] = binToUint(byteValue);
  }

  return uInt8Array;
}

console.log(UintToBin(255));

console.log(BinToBytes("1111111111111111000000010111"));
