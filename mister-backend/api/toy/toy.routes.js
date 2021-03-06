const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getToy, getToys, addToy, updateToy, deleteToy } = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getToys)
router.get('/:id', getToy)
router.post('/',requireAuth, requireAdmin, addToy)
router.put('/:id',requireAuth, requireAdmin, updateToy)
router.delete('/:id',requireAuth, requireAdmin, deleteToy)

// router.put('/:id',  requireAuth, updateUser)
// router.delete('/:id', requireAuth, requireAdmin, deleteUser)

module.exports = router