const express = require('express');
const router = express.Router();
const { usersTabel, userValidate } = require('../model/users');

router.get('/', async (req, res) => {
  const response = await usersTabel.find().sort('first_name');
  res.send(response);
});
router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  const findbyid = await usersTabel.findById(req.params.id);
  if (!findbyid) {
    res.status(404).send('no result found !');
  }
  res.send(findbyid);
});

router.post('/', async (req, res) => {
  try {
    const DTO = new usersTabel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birthdate: req.body.birthdate || Date.now(),
      createdate: req.body.createdate || Date.now(),
      password: req.body.password,
      email: req.body.email,
      username: req.body.username,
    });
    await DTO.save();
    res.send(DTO);
  } catch (error) {
    console.log(error);
    res.send(error);
    next();
  }
});

router.put('/:id', async (req, res) => {
  const { error } = userValidate(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  const findbyid = await usersTabel.findByIdAndUpdate(
    req.params.id,
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birthdate: req.body.birthdate || Date.now(),
      createdate: req.body.createdate || Date.now(),
      password: req.body.password,
      email: req.body.email,
      username: req.body.username,
    },
    { new: true }
  );
  if (!findbyid) {
    res.status(404).send('no result found !');
  }
  res.send(findbyid);
});
router.delete('/:id', async (req, res) => {
  // if (!findbyid) {
  //   res.status(404).send('no result found !');
  // }
  const Deletefindbyid = await usersTabel.findByIdAndRemove(req.params.id);
  res.send(Deletefindbyid);
});

module.exports = router;
