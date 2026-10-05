export function formatMoney(val: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(val);
}

export function formatNumber(val: number): string {
  return new Intl.NumberFormat('en-US').format(val);
}

export function formatPercent(val: number, decimals = 2): string {
  return `${val.toFixed(decimals)}%`;
}
