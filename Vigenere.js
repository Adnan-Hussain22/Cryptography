const getNum = (ascii) => {
	if (ascii >= 65 && ascii <= 90) return ascii - 65;
	else if (ascii >= 97 && ascii <= 122) return ascii - 97;
};

const checkCase = (ascii) => {
	if (ascii >= 65 && ascii <= 90) return 'upper-case';
	else if (ascii >= 97 && ascii <= 122) return 'lower-case';
	return '';
};

const isAlphabet = (ascii) => (ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122);

const getChar = (num) => {
	if (num >= 65 && ascii <= 90) return ascii + 65;
	else if (ascii >= 97 && ascii <= 122) return ascii + 97;
};

const encrypt = (text, key) => {
	if (!(typeof text === 'string' && typeof key === 'string')) throw 'INVALID INPUT';
	const cipher = text.split('').map((value, index) => {
		const asciiText = value.charCodeAt(0);
		const asciiKey = key[index % key.length].charCodeAt(0);
		let cipherChar = '';
		if (!isAlphabet(asciiText)) return value;
		const keyNum = getNum(asciiKey);
		const TexNum = getNum(asciiText);
		const cipherNum = (keyNum + TexNum) % 26;
		if (checkCase(asciiText) === 'upper-case') cipherChar = cipherNum + 65;
		else if (checkCase(asciiText) === 'lower-case') cipherChar = cipherNum + 97;
		return String.fromCharCode(cipherChar);
	});
	return cipher.join('');
};

const decrypt = (cipher, key) => {
	if (!(typeof cipher === 'string' && typeof key === 'string')) throw 'INVALID INPUT';
	const text = cipher.split('').map((value, index) => {
		const keyStr = key[index % key.length];
		const asciiCipher = value.charCodeAt(0);
		const asciiKey = keyStr.charCodeAt(0);
		let textChar = '';
		if (!isAlphabet(asciiCipher)) return value;
		const keyNum = getNum(asciiKey);
		const TextNum = getNum(asciiCipher);
		const cal = TextNum - keyNum;
		let cipherNum = cal < 0 ? cal + 26 : cal;
		cipherNum = cipherNum % 26;
		if (checkCase(asciiCipher) === 'upper-case') textChar = cipherNum + 65;
		else if (checkCase(asciiCipher) === 'lower-case') textChar = cipherNum + 97;
		return String.fromCharCode(textChar);
	});
	return text.join('');
};

// console.log('Encrypt==>', encrypt('HOW TO ENCRYPT', 'KEY'));
// console.log('Decrypt==>', decrypt('RSU XM ILMVWZX', 'KEY'));
