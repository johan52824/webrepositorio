const multiplyDigit = (value, index) => {
    if (index % 2 === 0) return value * 2;

    return value;
};

const mapArray = (value, index) => {
    const digit = parseInt(value, 10);

    let digitMultiplied = multiplyDigit(digit, index);
    if (digitMultiplied >= 10) digitMultiplied -= 9;

    return digitMultiplied;
};

const checkIdentification = identification => {
    const re = /[0-9]{10}/;

    if (!re.test(identification)) {
        return false;
    }

    const digits = identification.split('');
    const lastDigit = parseInt(digits.pop(), 10);

    const digitsMultiplied = digits.map(mapArray);
    const digitsSum = digitsMultiplied.reduce((accumulator, currentValue) => accumulator + currentValue);

    let verificator = 0;

    if (digitsSum % 10 > 0) {
        verificator = 10 - (digitsSum % 10);
    }

    if (lastDigit === verificator) {
        return true;
    } else {
        return false;
    }
};

module.exports = checkIdentification;
