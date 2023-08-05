const drugs = require('../../dataset.json')
const getDrugByFilter = (searchWord) => {
    if (searchWord) {
        return drugs.drugs.filter(
            drug =>
                drug.name
                    .toLowerCase()
                    .includes(searchWord.toLowerCase()) ||
                drug.diseases
                    .join(' ')
                    .toLowerCase()
                    .includes(searchWord.toLowerCase()),
        );

    } else {
        return drugs.drugs;
    }
}

module.exports = {
    getDrugByFilter
}