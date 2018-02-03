const express = require("express");
const router = express.Router();

const invoices = require("../public/data/invoices.json");

router.get("/:id?", (req, res) => {
  if (req.params.id) {
    const filter = invoices.filter(
      invoice => invoice.id === parseInt(req.params.id)
    );
    res.status(200).json({
      invoices: filter
    });
  } else {
    res.status(200).json({
      invoices: invoices
    });
  }
});

router.post("/", (req, res) => {
  // TODO read req.body.invoice
  res.status(200).json(req.body.invoice);
});

router.put("/", (req, res) => {
  // TODO read req.query.reservationId and req.body.invoice and insert into DB
  res.status(200).json(req.body.invoice);
});

router.delete("/", (req, res) => {
  // TODO delete req.body.invoice
  res.status(200).json(req.body.invoice);
});

module.exports = router;
