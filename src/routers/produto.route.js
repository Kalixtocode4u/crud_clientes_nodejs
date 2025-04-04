const express = require('express')
const router = express.Router()
const ProdutoControl = require('../controllers/produto.control')
const autenticar = require('../middleware/autenticacao.middleware')
const ProdutoMiddleware = require('../middleware/produto.middleware')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb){
        nome = req.body.nome.replace(' ', '')
        cb(null, nome + "-" + Date.now() + path.extname(file.originalname))
    }
})


const fileFilter = (req, file, cb) => {
    const ext = /jpeg|png|jpg/i
    if(ext.test(path.extname(file.originalname))){
        cb(null, true)
    }else{
        return cb("arquivo não suportado. Apenas jpeg ou jpg são suportados")
    }
}

var upload = multer({storage: storage, fileFilter: fileFilter})

router.post('/', autenticar, ProdutoMiddleware)
router.post('/', autenticar, upload.single('foto'))

// Chamadas da Api
router.get('/', ProdutoControl.getProdutoList)

router.get('/:id', ProdutoControl.getProdutoById)

router.post('/', upload.single("foto"), ProdutoControl.postProduto)
router.post('/:id/upload', upload.single("foto"), ProdutoControl.postProdutoImage)

router.post('/editar/:id', ProdutoControl.putProduto)
//router.put('/', ProdutoControl.putProduto)

router.get('/delete/:id', ProdutoControl.deleteProduto)
//router.delete('/', ProdutoControl.deleteProduto)

module.exports = router