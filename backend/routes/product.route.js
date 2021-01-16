const express = require("express");
const productRoutes = express.Router();

// Require Product model in our routes module
let Product = require("../model/product.model");

const path = require("path");
const multer = require("multer");
const fs = require("fs");

// File Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir("./uploads/", (err) => {
      cb(null, "./uploads/");
    });
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(new Error('Try to upload .jpeg or .png file.'), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Defined store route
productRoutes
  .route("/add")
  .post(upload.single("product_img"), function (req, res) {
    (async function () {
      try {
        console.log("body:", req.body);
        console.log("files:", req.file);

        var product_obj = {
          product_name: req.body.product_name,
          product_type: req.body.product_type,
          product_has_discount: req.body.has_discount,
          product_available_colors: req.body.available_colors,
          product_description: req.body.description,
        };

        if (req.file && req.file !== "undefined") {
          product_obj.product_image = req.file.filename;
        }

        let product = new Product(product_obj);
        product
          .save()
          .then((product) => {
            res.status(200).json({ product:product, msg: "product added successfully" });
          })
          .catch((err) => {
            console.log(err.message);
            res.status(400).send("unable to save to database");
          });
      } catch (error) {
        res.status(400).send(error.message);
      }
    })();
  });

// Defined get data(index or listing) route
productRoutes.route("/").get(function (req, res) {
  (async function () {
    try {
      Product.find(function (err, products) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({ products:products, msg: "products get successfully" });
        }
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  })();
});

// Defined edit route
productRoutes.route("/edit/:id").get(function (req, res) {
  (async function () {
    try {
      let id = req.params.id;
      Product.findById(id, function (err, product) {
        res.status(200).json({ product:product, msg: "product detail get successfully" });
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  })();
});

//  Defined update route
productRoutes
  .route("/update/:id")
  .post(upload.single("product_img"), function (req, res) {
    (async function () {
      try {
        Product.findById(req.params.id, function (err, product) {
          if (!product) res.status(404).send("data is not found");
          else {
            product.product_name = req.body.product_name;
            product.product_type = req.body.product_type;
            product.product_has_discount = req.body.has_discount;
            product.product_available_colors = req.body.available_colors;
            product.product_description = req.body.description;

            if (req.file && req.file !== "undefined") {
              product.product_image = req.file.filename;
            }

            product
              .save()
              .then((product) => {
                res.status(200).json({ product:product, msg: "Product updated successfully" });
              })
              .catch((err) => {
                res.status(400).send("unable to update the database");
              });
          }
        });
      } catch (error) {
        res.status(400).send(error.message);
      }
    })();
  });

// Defined delete | remove | destroy route
productRoutes.route("/delete/:id").delete(function (req, res) {
  (async function () {
    try {
      Product.findByIdAndRemove(
        { _id: req.params.id },
        function (err, product) {
          if (err) res.json(err);
          else res.json("Successfully removed");
        }
      );
    } catch (error) {
      res.status(400).send(error.message);
    }
  })();
});

module.exports = productRoutes;
