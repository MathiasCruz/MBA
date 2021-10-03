const express = require("express");
const autorController = require("../controller/autor.controller.js");

const router = express.Router();
router.get("/:id", autorController.BuscarAutor);
router.post("/", autorController.CriaAutor);
router.put("/", autorController.AtualizarAutor);
router.delete("/:id", autorController.DeletarAutor);
module.exports = router;
