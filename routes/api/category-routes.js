const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryDB = await Category.findAll({
      //left join [{syntax}]
      include: [{model: Product}]
    });
    // if the categoryDB is successfully created, the new response will be returned as json
  res.status(200).json(categoryDB)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  let idParams = req.params.id;
  try {
    const categoryDB = await Category.findByPk(idParams ,{
      
      include: [{model: Product}]
    });
    if (!categoryDB) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    
  res.status(200).json(categoryDB)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryDB = await Category.create(req.body);
    res.status(200).json(categoryDB);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async  (req, res) => {
  // update a category by its `id` value
  try {
    const categoryDB = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryDB[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryDB);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  let idParams = req.params.id;
  try {
    const categoryDB = await Category.destroy({
      where: {
        id: idParams,
      }
    });
    if(!categoryDB){
      res.status(404).json({ message: 'No category with this id!' });
      return;
    } 
    res.status(200).json(categoryDB);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
