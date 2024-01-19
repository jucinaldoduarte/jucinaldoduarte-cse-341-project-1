const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {  
    //#swagger.tags=['Contacts']
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((users) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(users); 
    });    
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({_id: userId});
    result.toArray().then((users) => {
     res.setHeader('Content-type', 'application/json');
     res.status(200).json(users[0]);
 
    });
 };

 const createUser = async (req, res) => {
    //#swagger.tags=['Contacts']
    const user = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send;
    } else {
        res.status(500).json(response.error || "Some error occured while creating the user");
    }
 };

 
 const updateUser = async (req, res) => {
    //#swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    const user = {
        email: req.body.email,  
        username: req.body.username,      
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send;
    } else {
        res.status(500).json(response.error || "Some error occured while updating the user");
    }
 };
 

const deleteUser = async (req, res) => {
    //#swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: userId}, user);
    if (response.deletedCount > 0) {
        res.status(204).send;
    } else {
        res.status(500).json(response.error || "Some error occured while deleting the user");
    }
 };

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};