const path = require('path');
const EthipianDate = require('ethiopian-date');
exports.mainRoot = path.dirname(process.mainModule.filename);
exports.EthioDate = function (dateRecieved) {
	const amharicMothnes = [
		'መስከረም',
		'ጥቅምት',
		'ኅዳር',
		'ታህሳስ',
		'ጥር',
		'የካቲት',
		'መጋቢት',
		'ሚያዝያ',
		'ግንቦት',
		'ሰኔ',
		'ሐምሌ',
		'ነሀሴ',
		'ጳግሜ',
	];
	const date = new Date(dateRecieved);
	const newDate = EthipianDate.toEthiopian(
		date.getFullYear(),
		date.getMonth(),
		date.getDate()
	);
	const ethiopianDate = `${amharicMothnes[newDate[2]]} ${newDate[2]} , ${
		newDate[0]
	}`;
	return ethiopianDate;
};
