const {Addresses} = require('../../models');

exports.getAllAddresses = async (req, res) => {
    try {
        const addresses = await Addresses.findAll();
        res.json(addresses);
    } catch (error) {
        console.error('Error fetching getAllAddresses:', error.message, error.stack);
        res.status(500).json({ message: 'Error fetching getAllAddresses' });
    }
};
