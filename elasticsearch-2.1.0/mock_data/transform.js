"use strict";
var fs  = require("fs"), lineNumber = 1, doc = "",
	faker = require('/Users/markgable/Sites/exercises/faker.js');
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
        doc += parse(line) + "\n";
    }
});

console.info(doc);

fs.writeFileSync("test_accounts.json", doc);

function parse(line){
	if (lineNumber++ % 2 === 0){
		var item = JSON.parse(line);

		item.suggest = {"input":[item.city]};
		item.description = faker.company.catchPhrase() + " " + faker.company.bs();
		item.social_security = faker.finance.ssn();

		return JSON.stringify(item);
	}

	return line;
}
