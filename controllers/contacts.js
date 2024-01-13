const mongodb = require('../data/database');
const ObjectId = require(`mongodb`).ObjectId;

const getAll = async (req, res) => {  
    try {
        const result = await mongodb.getDatabase().collection('contacts').find().toArray(); 
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);        
        const result = await mongodb.getDatabase().db().collection('contacts').findOne({ _id: userId });
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        // Error
        res.status(500).json({ error: error.message });      
       
    }
};

module.exports = {
    getAll,
    getSingle
};

