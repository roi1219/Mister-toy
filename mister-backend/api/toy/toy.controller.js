const toyService = require('./toy.service');
const loggerService = require('../../services/logger.service');

async function getToys(req, res) {
    // var filterBy = req.query;
    try {
        const toys = await toyService.query()
        res.send(toys)
    } catch (err) {
        loggerService.error('Couldn`t get toys from DB', err);
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

async function getToy(req, res) {
    try {
        const toy = await toyService.getById(req.params.id);
        res.send(toy);
    } catch (err) {
        loggerService.error('Couldn`t get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

async function addToy(req, res) {
    try {
        const toy = req.body;
        const savedToy = await toyService.add(toy);
        res.send(savedToy);
    } catch (err) {
        loggerService.error('Couldn`t add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }

}

async function updateToy(req, res) {
    try {
        const toy = req.body;
        const savedToy = await toyService.update(toy);
        res.send(savedToy);
    } catch (err) {
        loggerService.error('Couldn`t update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }

}

async function deleteToy(req, res) {
    try {
        await toyService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete toy', err)
        res.status(500).send({ err: 'Failed to delete toy' })
    }
}

module.exports = {
    getToys,
    getToy,
    addToy,
    updateToy,
    deleteToy
}