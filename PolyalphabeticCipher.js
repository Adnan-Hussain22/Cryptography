const isAlphabet = (ascii) => (ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122);

const getMatrix = () => {
	let arr = [];
	for (let i = 0; i < 26; i++) {
		let start = i;
		let row = [];
		for (let j = 0; j < 26; j++) {
			let num = (start + j) % 26;
			let char = String.fromCharCode(num + 65);
			row.push(char);
		}
		arr.push(row);
	}
	return arr;
};

const encryption = (text, key) => {
	if (typeof text !== 'string' || typeof key !== 'string') throw 'INVALID INPUT';
	const matrix = getMatrix();
	const textArr = text.split('');
	const row = matrix[0];
	const cipher = [];
	textArr.forEach((textChar, textIndex) => {
		let i = 0,
			j = 0;
		row.forEach((value, index) => {
			const keyChar = key[textIndex % key.length];
			if (keyChar === value) i = index;
			else if (textChar === value) j = index;
		});
		cipher.push(matrix[i][j]);
	});
	return cipher.join('');
};

const decryption = (cipher, key) => {
	if (typeof cipher !== 'string' || typeof key !== 'string') throw 'INVALID INPUT';
	const matrix = getMatrix();
	const cipherArr = cipher.split('');
	const textArr = [];
	const row = matrix[0];
	cipherArr.forEach((cipherChar, cipherIndex) => {
		const keyChar = key[cipherIndex % key.length];
		let i = 0,
			j = 0;
		row.forEach((value, index) => {
			if (value === keyChar) {
				i = index;
				return;
			}
		});
		const keyRow = matrix[i];
		keyRow.forEach((value, index) => {
			if (value === cipherChar) {
				j = index;
				return;
			}
		});
		textArr.push(matrix[0][j]);
	});
	return textArr.join('');
};

