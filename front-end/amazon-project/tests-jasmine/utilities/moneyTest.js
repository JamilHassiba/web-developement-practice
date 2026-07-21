import {formatPrice} from '../../scripts/utilities/money.js';

describe('Test suite: formatPrice', () => {
    it('Converts cents to dollars', () => {
        expect(formatPrice(2026)).toEqual('20.26');
    });

    it('Works with 0', () => {
        expect(formatPrice(0)).toEqual('0.00');
    });

    it('Rounds up to nearest cent', () => {
        expect(formatPrice(2002.5)).toEqual('20.03');
    });

    it('Rounds down to nearest cent', () => {
        expect(formatPrice(2002.4)).toEqual('20.02');
    });
});
