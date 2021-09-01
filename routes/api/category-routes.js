const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// gets all categories
router.get('/', (req, res) => {
    try {
        const categoryData = await Category.findAll({
            include: [{ model: Product }],
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// gets specific category based on id
router.get('/:id', (req, res) => {
    try {
        const categoryData = await Category.findByPk(req.params.id, {
            include: [{ model: Product }],
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// creates new category
router.post('/', (req, res) => {
    try {
        const categoryData = await Category.create({
            category_name: req.body.category_name,
        });
        res.status(200).json(categoryData);
    } catch (err) {
        req.status(400).json(err);
    }
});

// updated specific category based on id
router.put('/:id', (req, res) => {
    try {
        const updatedCategory = await Category.update({
            category_name: req.body.category_name,
        }, {
            where: {
                id: req.params.id
            },
        });
        if (!updatedCategory) {
            res.status(404).json({ message: "No category found with that id!" });
            return;
        }
        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

// deleted specific category based on id
router.delete('/:id', (req, res) => {
    try {
        const deletecategory = await Category.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deletecategory) {
            res.status(404).json({ message: "No category found with that id!" });
            return;
        }

        res.status(200).json(deletecategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;