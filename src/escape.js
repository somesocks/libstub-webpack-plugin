
function escapeChar(character) {
	switch (character) {
		case '\\':
			return '\\';
		case '"':
			return '\\\"';
		case "'":
			return '\\\'';

		case '\n':
			return '\\n'
		case '\r':
			return '\\r'

		case '\u2028':
			return '\\u2028'
		case '\u2029':
			return '\\u2029'

		default:
			return undefined;
	}
}

function escape (string) {
	string = string || '';
	return string.replace(/["'\\\n\r\u2028\u2029]/g, escapeChar);
}

module.exports = escape;
