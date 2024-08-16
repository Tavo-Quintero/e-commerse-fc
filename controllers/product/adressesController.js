const {Addresses} = require('../../models');

exports.getAllAddresses = async (req, res) => {
    try {
        const addresses = await Addresses.findAll();
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Addresses' });
    }
};