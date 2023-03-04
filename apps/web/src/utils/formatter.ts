import Decimal from 'decimal.js';
import { BigNumber, ethers } from 'ethers';
import { ERCType } from 'shared-config';

Decimal.set({
  toExpNeg: -30,
  precision: 40,
});

type FormatOptions = {
  decimals?: number;
  maxBelowZeroDecimals?: number;
  maxDecimals?: number;
};

export const formatBigNumber = (
  value: BigNumber | string | number,
  config?: FormatOptions
): string => {
  const parsed = ethers.utils.formatUnits(value, config?.decimals || 18);
  const decimal = new Decimal(parsed);
  const decimals = config?.maxDecimals || 5;

  return decimal.toDecimalPlaces(decimals).toString();
};

export const formatNumber = (
  value: number | string,
  config?: FormatOptions
): string => {
  const decimal = new Decimal(value);
  const decimals = config?.maxDecimals || 5;

  return decimal.toDecimalPlaces(decimals).toString();
};

export const formatBigNumberToDate = (value: BigNumber): string =>
  new Date(+value * 1000).toLocaleString();

export const formatAddressToShort = (
  address: string,
  options?: { start?: number; end?: number }
): string =>
  [
    address.slice(0, options?.start || 4),
    '...',
    address.slice(-(options?.end || 4)),
  ].join('');

export const formatUnitPerType = (
  value: BigNumber,
  type: ERCType,
  extra: any
) => {
  if (type === 'erc20') {
    return formatBigNumber(value, extra);
  }

  return value.toNumber();
};
