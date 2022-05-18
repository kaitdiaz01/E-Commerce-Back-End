const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    });
    if (!categoryData) {
      res.status(404).json("No Data found.");
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
      // find one category by its `id` value
      // be sure to include its associated Products
    });
    if (!categoryData) {
      res.status(404).json("No Data found.");
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // create a new category
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(
    {
     id: req.body.id,
     category_name: req.body.category_name,
    },
    {where: {id:req.params.id}}
    );
    res.status(200).json('Success ID has been updated!');
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try { 
    await Category.destroy({
     where: {id: req.params.id}
    })
    res.status(200).json('Data has been deleted.')
  } catch (err) {
    res.status(500).json(err);
  }
  
});

module.exports = router;
