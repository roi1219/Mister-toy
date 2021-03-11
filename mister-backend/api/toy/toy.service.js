// const gToys = require('../../data/toy.json');

const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy) {
    // const criteria=_buildCriteria(filterBy);
    try {
        const collection = await dbService.getCollection('toy');
        const toys = await collection.find().toArray();
        return toys;
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err;
    }
}

// function query(filterBy) {
//     var toysForDisplay = JSON.parse(JSON.stringify(gToys));
//     if (!filterBy) {
//         return Promise.resolve(toysForDisplay);
//     }
//     if (filterBy.name) {
//         toysForDisplay = toysForDisplay.filter(t => t.name.includes(filterBy.name));
//     }
//     if (filterBy.price) {
//         toysForDisplay = toysForDisplay.filter(t => +t.price <= +filterBy.price);
//     }
//     if (filterBy.onStock) {
//         toysForDisplay = toysForDisplay.filter(t => t.inStock === true);
//     }
//     if (filterBy.type) {
//         toysForDisplay = toysForDisplay.filter(t => t.type === filterBy.type);
//     }
//     if (filterBy.sortBy) {
//         if (filterBy.sortBy === 'name') {
//             toysForDisplay = toysForDisplay.sort((t1, t2) => {
//                 return t1.name - t2.name;
//             });
//         } else if (filterBy.sortBy === 'price') {
//             toysForDisplay = toysForDisplay.sort((t1, t2) => {
//                 return t1.price - t2.price;
//             });
//         }
//     }
//     return Promise.resolve(toysForDisplay);
// }

async function getById(toyId) {
    try {
        // console.log('toyId:', toyId)
        const collection = await dbService.getCollection('toy');
        const toy = await collection.findOne({ '_id': ObjectId(toyId) });
        // console.log('toy:', toy)
        return toy;
    } catch (err) {
        logger.error(`while finding user ${toyId}`, err);
        throw err;
    }
}


async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy');
        await collection.deleteOne({ '_id': ObjectId(toyId) });
    } catch (err) {
        logger.error('cannot remove toy', err);
        throw err;
    }
}

async function update(toy) {
    try {
        const collection = await dbService.getCollection('toy');
        toy._id = ObjectId(toy._id)
        await collection.updateOne({ '_id': ObjectId(toy._id) }, { $set: toy });
        return toy;
    } catch (err) {
        logger.error(`cannot remove toy ${toy._id}`, err);
        throw err;
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy');
        await collection.insertOne(toy);
        return toy;
    } catch (err) {
        logger.error(`cannot remove toy ${toy._id}`, err);
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}

// function getById(toyId) {
//     const toy = gToys.find(toy => toy._id === toyId);
//     return Promise.resolve(toy);
// }

// function remove(toyId) {
    //     const idx = gToys.findIndex(t => t._id === toyId);
    //     gToys.splice(idx, 1);
    //     return Promise.resolve();
    // }

    ////will bot work need to split to update and add individual functions
    // function save(toy) {
        //     if (toy._id) {
            //         const idx = gToys.findIndex(t => t._id === toy._id);
            //         if (idx < 0) return Promise.reject('No such toy');
            //         gToys.splice(idx, 1, toy);
//     } else {
//         toy._id = _makeId();
//         gToys.push(toy);
//     }
//     _saveToysToFile();
//     return Promise.resolve(toy);
// }

// module.exports = {
//     query,
//     getById,
//     remove,
//     save
// }

// function _makeId(length = 5) {
//     var txt = ''
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//     for (var i = 0; i < length; i++) {
//         txt += possible.charAt(Math.floor(Math.random() * possible.length))
//     }
//     return txt
// }

// function _saveToysToFile() {
//     return new Promise((resolve, reject) => {
//         const fs = require('fs')
//         fs.writeFile('data/toy.json', JSON.stringify(gToys, null, 2), (err) => {
//             if (err) reject(err);
//             else resolve()
//         })
//     })
// }