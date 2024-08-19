const {Addresse} = require('../../models');

exports.getAllAddresses = async (req, res) => {
    try {
        const Addresses = await Addresse.findAll();
        res.json(Addresses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Addresses' });
    }
};