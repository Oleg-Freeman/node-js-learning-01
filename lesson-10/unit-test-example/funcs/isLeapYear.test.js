// isLeapYear.test.js

/*
1. Функція отримує ціле число
2. Повертає true коли рік високосний, false - не високосний
3. Не правильний фориат - викидає помилку

2008 - true
2003 - false
1900 - false
2000 - true

44 - error 'year must be greater than 45'
2008.4 - error 'year must be integer'
'2008' - error 'year must be number'
() - error 'year must exist'
null - error 'year must number'
true - error 'year must number'
false - error 'year must number'
{} - error 'year must number'
[] - error 'year must number'
() => {} - error 'year must number'
*/

const isLeapYear = require('./isLeapYear');

describe('test isLeapYear function', () => {
    test('2008 - true', () => {
        const result = isLeapYear(2008);

        expect(result).toBe(true);
    });
    test('2003 - false', () => {
        expect(isLeapYear(2003)).toBe(false);
    });
    test('1900 - false', () => {
        expect(isLeapYear(1900)).toBe(false);
    });
    test('2000 - true', () => {
        expect(isLeapYear(2000)).toBe(true);
    });
    test(`year < 45 - error 'year must be greater than 45'`, () => {
        expect(() => isLeapYear(44)).toThrow('year must be greater than 45');
    });
    test(`() - error 'year must exist'`, () => {
        expect(() => isLeapYear(undefined)).toThrow('year must exist');
    });
    test(`'2008' - error 'year must be number'`, () => {
        expect(() => isLeapYear('2008')).toThrow('year must be number');
    });
    test(`null - error 'year must be number'`, () => {
        expect(() => isLeapYear(null)).toThrow('year must be number');
    });
    test(`true - error 'year must be number'`, () => {
        expect(() => isLeapYear(true)).toThrow('year must be number');
    });
    test(`false - error 'year must be number'`, () => {
        expect(() => isLeapYear(false)).toThrow('year must be number');
    });
    test(`{} - error 'year must be number'`, () => {
        expect(() => isLeapYear({})).toThrow('year must be number');
    });
    test(`[] - error 'year must be number'`, () => {
        expect(() => isLeapYear([])).toThrow('year must be number');
    });
    test(`() => {} - error 'year must be number'`, () => {
        expect(() => isLeapYear(() => {})).toThrow('year must be number');
    });
});
