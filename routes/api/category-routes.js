const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// gets all categories
router.get('/', (req, res) => {
    try {
        const categoryData = await Category.findAll({
            include: [{ model: Product }],
        });
        res.status(201).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// gets specific category based on id
router.get('/:id', (req, res) => {
    try {
        const categoryDataById = await Category.findByPk(req.params.id, {
            include: [{ model: Product }],
        });

        if (!CategoryDataById) {
            res.status(404).json({ message: 'No category found with that id.' })
            return;
        }

        res.status(201).json(categoryDataById);
    } catch (err) {
        res.status(500).json(err);
    }
});

// creates new category
router.post('/', (req, res) => {
    try {
        const newCategoryData = await Category.create(req.body);

        res.status(201).json(newCategoryData);
    } catch (err) {
        req.status(500).json(err);
    }
});

// update specific category based on id
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
        res.status(201).json(updatedCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete specific category based on id
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

        res.status(201).json(deletecategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;