const express = require("express");
const livroController = require("../controller/livro.controller.js");

const router = express.Router();
router.get("/:id", livroController.BuscarLivro);
router.post("/", livroController.CriaLivro);
router.put("/", livroController.AtualizarLivro);
router.delete("/:id", livroController.DeletarLivro);
module.exports = router;
