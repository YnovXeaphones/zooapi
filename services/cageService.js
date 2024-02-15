const cages = [
    { id: 1, name: "Cage des lapins (oui oui on a des lapins)", zooId: "feghk56" },
];

let nextCageId = cages.length + 1;

exports.getAllCages = () => {
    return cages;
};

exports.getCageById = (id) => {
    return cages.find(cage => cage.id === id);
};

exports.createCage = (id, name, zooId) => {
    const newCage = { id: nextCageId++, id, name, zooId };
    cages.push(newCage);
    return newCage;
};

exports.updateCageById = (id, name, zooId) => {
    const cageIndex = cages.findIndex(cage => cage.id === id);
    if (cageIndex > -1) {
        const updatedCage = { ...cages[cageIndex], id, name, zooId };
        cages[cageIndex] = updatedCage;
        return updatedCage;
    }
    return null;
};

exports.deleteCageById = (id) => {
    const cageIndex = cages.findIndex(cage => cage.id === id);
    if (cageIndex > -1) {
        cages.splice(cageIndex, 1);
        return true;
    }
    return false;
};