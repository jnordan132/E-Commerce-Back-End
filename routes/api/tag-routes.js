const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// gets all tags
router.get('/', (req, res) => {
    try {
        const tagsData = await Tag.findAll({
            include: [{ model: ProductTag, Product }],
        });
        res.status(200).json(tagsData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// gets specific tag based on id
router.get('/:id', (req, res) => {
    try {
        const tagData = await Tag.findByPk(req.params.id, {
            include: [{ model: ProductTag, Product }],
        });

        if (!tagData) {
            res.status(404).json({ message: 'No tag found with that id!' });
            return;
        }
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// creates new tag
router.post('/', (req, res) => {
    try {
        const tagData = await Tag.create({
            tag_name: req.body.tag_name,
        });
        res.status(200).json(tagData);
    } catch (err) {
        req.status(400).json(err);
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
        if (!updatedTag) {
            res.status(404).json({ message: "No tag found with that id!" });
            return;
        }
        res.status(200).json(updatedTag);
    } catch (err) {
        res.status(500).json(err);
    }
});

// deleted specific tag based on id
router.delete('/:id', (req, res) => {
    try {
        const deletetag = await Tag.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deletetag) {
            res.status(404).json({ message: "No tag found with that id!" });
            return;
        }

        res.status(200).json(deletetag);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;