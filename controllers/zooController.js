const zooService = require('../services/zooService');

exports.createZoo = (req, res) => {
    const { zoo_name, firstname, lastname, email, password } = req.body;
    try {
      const zoo = zooService.createZoo(/*token Id*/, zoo_name);
      res.status(201).json(zoo);
    } catch (error) {
      res.status(400).send(error.message);
    }
};

exports.updateZoo = (req, res) => {
    const id = req.params.id;
    const { name, date } = req.body;
    const updatedZoo = zooService.updateZoo(id, name, date);
    if (updatedZoo) {
        res.json(updatedZoo);
    } else {
        res.status(404).send('Zoo not found');
    }
};

exports.deleteZoo = (req, res) => {
    const id = req.params.id;
    const success = zooService.deleteZoo(id);
    if (success) {
        res.status(200).send('Zoo deleted');
    } else {
        res.status(404).send('Zoo not found');
    }
};
