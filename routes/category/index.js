const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const categoryModel = require("../../models/category.model");

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    const data = await categoryModel.getAllCategoryRoom();
    console.log(data);
    res.render("pages/rooms/index", { layout: "layout", data });
  } catch (error) {
    console.log(error);
  }
});
router.post("/add", async (req, res) => {
  try {
    const {
      name,
      price,
      note,
      surcharge_rate,
      room_quantity,
      max_people,
    } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "name is required in body!",
      });
    }
    const entity = {
      id: uuidv4(),
      name,
      price,
      note,
      surcharge_rate,
      room_quantity,
      max_people,
    };
    categoryModel
      .addOneCategory(entity)
      .then((response) => {
        return res.json({
          success: true,
          response,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: err.toString(),
        });
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.toString(),
    });
  }
});

module.exports = router;

// const entity = {
//   id: uuidv4(),
//   name: "Thương gia",
//   price: 1000000,
//   note: "",
//   surcharge_rate: 2.0,
//   room_quantity: 10,
//   max_people: 2,
// };
// const result = await categoryModel.addOneCategory(entity);
