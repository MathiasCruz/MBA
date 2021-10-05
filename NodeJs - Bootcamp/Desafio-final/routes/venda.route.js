const express = require("express");
const vendaController = require("../controller/venda.controller.js");

const router = express.Router();
router.get("/:id", vendaController.BuscarVenda);
router.post("/", vendaController.CriaVenda);
router.put("/", vendaController.AtualizarVenda);
router.delete("/:id", vendaController.DeletarVenda);
module.exports = router;
