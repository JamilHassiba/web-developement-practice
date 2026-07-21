export const TAX_RATE = 0.1;

export function formatPrice(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2);
}
