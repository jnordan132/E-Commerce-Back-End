const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// gets all tags
router.get('/', (req, res) => {
    try {
        const tagsData = await Tag.findAll({
            include: [{ model: Product, through: ProductTag }],
        });
        res.status(201).json(tagsData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// gets specific tag based on id
router.get('/:id', (req, res) => {
    try {
        const tagDataById = await Tag.findByPk(req.params.id, {
            include: [{ model: Product, through: ProductTag }],
        });

        if (!tagDataById) {
            res.status(404).json({ message: 'No tag found with that id!' });
            return;
        }
        res.status(201).json(tagDataById);
    } catch (err) {
        res.status(500).json(err);
    }
});

// creates new tag
router.post('/', (req, res) => {
    try {
        const newTagData = await Tag.create();

        res.status(201).json(newTagData);
    } catch (err) {
        req.status(500).json(err);
    }
});

// updates a tag's name based on specific id
router.put('/:id', (req, res) => {
    try {
        const updatedTag = await Tag.update({
            tag_name: req.body.tag_name,
        }, {
            where: {
                id: req.params.id
            },
        });

        res.status(201).json(updatedTag);
    } catch (err) {
        res.status(500).json(err);
    }
});

// deleted specific tag based on id
router.delete('/:id', (req, res) => {
    try {
        const deletedTag = await Tag.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deletedTag) {
            res.status(404).json({ message: "No tag found with that id!" });
            return;
        }

        res.status(201).json(deletedTag);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;