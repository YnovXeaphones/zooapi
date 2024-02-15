const users = [
    {id: 1, firstName: "Antoine", lastName: "Dupond", mail: "antoinedupond@gmail.com", password: "rugby", access: "acrud", zooId: "feghk56"},
    {id: 2, firstName: "Lionel", lastName: "Messi", mail: "lionelmessi@gmail.com", password: "foot", access: "ru", zooId: "feghk56"}
];

let nextUserId = users.length + 1;

exports.getAllUsers = () => {
    return users;
};

exports.getUserById = (id) => {
    return users.find(user => user.id === id);
};

exports.createUser = (firstName, lastName, mail, password, access, zooId) => {
    const newUser = { id: nextUserId++, firstName, lastName, mail, password, access, zooId };
    users.push(newUser);
    return newUser;
};

exports.updateUserById = (id, firstName, lastName, mail, password, access, zooId) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex > -1) {
        const updatedUser = { ...users[userIndex], firstName, lastName, mail, password, access, zooId };
        users[userIndex] = updatedUser;
        return updatedUser;
    }
    return null;
};

exports.deleteUserById = (id) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex > -1) {
        users.splice(userIndex, 1);
        return true;
    }
    return false;
};
