const animals = [
    { id: 1, name: "Simba", specie: "Lion", diet: "Carnivore", cageId: 1 },
];

let nextAnimalId = animals.length + 1;

exports.getAllAnimals = () => {
    return animals;
};

exports.getanimAlById = (id) => {
    return animals.find(animal => animal.id === id);
};

exports.createAnimal = (id, name, specie, diet, cageId) => {
    const newAnimal = { id: nextAnimalId++, id, name, specie, diet, cageId };
    animals.push(newAnimal);
    return newAnimal;
};

exports.updateAnimalById = (id, name, specie, diet, cageId) => {
    const animalIndex = animals.findIndex(animal => animal.id === id);
    if (animalIndex > -1) {
        const updatedAnimal = { ...animals[animalIndex], id, name, specie, diet, cageId };
        animals[animalIndex] = updatedAnimal;
        return updatedAnimal;
    }
    return null;
};

exports.deleteAnimalById = (id) => {
    const animalIndex = animals.findIndex(animal => animal.id === id);
    if (animalIndex > -1) {
        animals.splice(animalIndex, 1);
        return true;
    }
    return false;
};