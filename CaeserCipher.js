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
	if(!(typeof text === "string" && typeof key === "number")) throw "INVALID INPUT"
	const cipher = text.split('').map((value, index) => {
		const ascii = value.charCodeAt(0);
		let cipherChar = '';
		if (!isAlphabet(ascii)) return value;
		if (checkCase(ascii) === 'upper-case') {
			const num = getNum(ascii);
			const cipherNum = (num + key) % 26;
			cipherChar = cipherNum + 65;
		} else if (checkCase(ascii) === 'lower-case') {
			const num = getNum(ascii);
			const cipherNum = (num + key) % 26;
			cipherChar = cipherNum + 97;
		}
		return String.fromCharCode(cipherChar);
	});
	return cipher.join('');
};

const decrypt = (cipher, key) => {
	if(!(typeof text === "string" && typeof key === "number")) throw "INVALID INPUT"
	const text = cipher.split('').map((value, index) => {
		const ascii = value.charCodeAt(0);
		let textChar = '';
		if (!isAlphabet(ascii)) return value;
		if (checkCase(ascii) === 'upper-case') {
			const num = getNum(ascii);
			const cal = num - key;
			let textNum = cal < 0 ? cal + 26 : cal;
			textNum = textNum % 26;
			textChar = textNum + 65;
		} else if (checkCase(ascii) === 'lower-case') {
			const num = getNum(ascii);
			const cal = num - key;
			let textNum = cal < 0 ? cal + 26 : cal;
			textNum = textNum % 26;
			textChar = textNum + 97;
		}
		return String.fromCharCode(textChar);
	});
	return text.join('');
};

console.log("Encrypt==>",encrypt('aTtACK AT ONCE', 3));
