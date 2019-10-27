const getBinary = (numStr) => {
	const num = +numStr;
	if (num === NaN) throw 'INVALID NUMBER';
	return Number(num.toString(2));
};

const getDecimal = (binStr) => {
	if (+binStr === NaN) throw 'INVALID NUMBER';
	return parseInt(binStr, 2);
};

const encrypt = (text, key) => {
    if (!(typeof text === 'string' && typeof key === 'string')) throw 'INVALID INPUT';
	const cipher = text.split('').map((value, index) => {
		const txtCode = value.charCodeAt(0);
		const keyCode = key[index].charCodeAt(0);
		const cal = txtCode ^ keyCode;
		return String.fromCharCode(cal);
    });
    return cipher
};

// console.log(encrypt(')', '¬'));
