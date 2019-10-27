const getAlphabets = () => {
	const arr = [];
	for (let i = 0; i < 26; i++) {
		const code = i % 26 + 65;
		let char = '';
		if (code === 73) char = 'I/J';
		else if (code === 74) continue;
		else char = String.fromCharCode(code);
		arr.push(char);
	}
	return arr;
};

const getUnique = (key) => {
	const arr = [];
	key.split('').forEach((value, index) => {
		let tempVal = value.toUpperCase();
		if (value.toUpperCase() === 'I' || value.toUpperCase() === 'J') tempVal = 'I/J';
		if (arr.findIndex((e) => e === tempVal) < 0) arr.push(tempVal);
	});
	return arr;
};

const getKeyMatrix = (key) => {
	if (typeof key !== 'string') throw 'INVALID KEY TYPE';
	const keyArr = getUnique(key);
	let alphaArr = getAlphabets();
	const matrix = [];
	for (let i = 0; i < 5; i++) {
		const row = [];
		for (let j = 0; j < 5; j++) {
			let char = '';
			if (keyArr[0]) {
				char = keyArr.shift();
				alphaArr = alphaArr.filter((val) => val !== char);
			} else {
				char = alphaArr.shift();
			}
			row.push(char);
		}
		matrix.push(row);
	}
	return matrix;
};

const getDiagraph = (text) => {
	const textArr = text.split('');
	if (textArr.length % 2 !== 0) textArr.push('X');
	const diagraph = [];
	for (let i = 0; i < textArr.length; ) {
		const row = [];
		if (!textArr[i + 1]) {
			row.push(textArr[i]);
			row.push('X');
			i++;
		} else if (textArr[i] === textArr[i + 1]) {
			row.push(textArr[i]);
			row.push('X');
			i++;
		} else {
			row.push(textArr[i]);
			row.push(textArr[i + 1]);
			i += 2;
		}
		diagraph.push(row);
	}
	return diagraph;
};

const encrypt = (text, key) => {
	if (typeof text !== 'string' || typeof key !== 'string') throw 'INVALID INPUT';

	const keyMatrix = getKeyMatrix(key);
	const diagraph = getDiagraph(text);
	const cipherArr = [];
	diagraph.forEach(([ txt1, txt2 ], index) => {
		const txtArr1 = [],
			txtArr2 = [];
		let cipher = '';
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				let matrixChar = keyMatrix[i][j];
				if (matrixChar === 'I/J') {
					if (txt1 === 'I' || txt1 === 'J') {
						txtArr1.push(i);
						txtArr1.push(j);
					} else if (txt2 === 'I' || txt2 === 'J') {
						txtArr2.push(i);
						txtArr2.push(j);
					}
				} else if (txt1 === matrixChar) {
					txtArr1.push(i);
					txtArr1.push(j);
				} else if (txt2 === matrixChar) {
					txtArr2.push(i);
					txtArr2.push(j);
				}
			}
		}
		if (txtArr1[0] === txtArr2[0]) {
			/*IF THEY IN THE SAME ROW*/
			const j1 = (txtArr1[1] + 1) % 5;
			const j2 = (txtArr2[1] + 1) % 5;
			cipher += keyMatrix[txtArr1[0]][j1];
			cipher += keyMatrix[txtArr1[0]][j2];
		} else if (txtArr1[1] === txtArr2[1]) {
			/*IF THEY IN THE SAME COLUMN*/
			const i1 = (txtArr1[0] + 1) % 5;
			const i2 = (txtArr2[0] + 1) % 5;
			cipher += keyMatrix[i1][txtArr1[1]];
			cipher += keyMatrix[i2][txtArr1[1]];
		} else {
			/*IF BOTH ARE IN DIFFERENT COL AND ROW*/
			const j1 = txtArr2[1];
			const j2 = txtArr1[1];
			cipher += keyMatrix[txtArr1[0]][j1];
			cipher += keyMatrix[txtArr2[0]][j2];
		}

		/*Add the cipher pair in total cipher array*/
		cipherArr.push(cipher);
	});
	return cipherArr.join('');
};

console.log('encypt==>\n', encrypt('JAZZ', 'MONARCHY'));
