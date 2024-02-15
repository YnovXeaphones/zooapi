const zoos = [
    { id: "feghk56", name: "Le zoo de nono le zozo", date: "2003-02-07" },
];

let nextZooId = zoos.length + 1;

exports.getAllZoos = () => {
    return zoos;
};

exports.getZooById = (id) => {
    return zoos.find(zoo => zoo.id === id);
};

exports.createZoo = (name, date) => {
    const newZoo = { id: nextZooId++, name, date };
    zoos.push(newZoo);
    return newZoo;
};

exports.updateZooById = (id, name, date) => {
    const zooIndex = zoos.findIndex(zoo => zoo.id === id);
    if (zooIndex > -1) {
        const updatedZoo = { ...zoos[zooIndex], id, name, date };
        zoos[zooIndex] = updatedZoo;
        return updatedZoo;
    }
    return null;
};

exports.deleteZooById = (id) => {
    const zooIndex = zoos.findIndex(zoo => zoo.id === id);
    if (zooIndex > -1) {
        zoos.splice(zooIndex, 1);
        return true;
    }
    return false;
};