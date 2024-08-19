const {Adress} = require('../../models');

exports.getAllAddresses = async (req, res) => {
    try {
        const Addresses = await Adress.findAll();
        res.json(Addresses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Addresses' });
    }
};