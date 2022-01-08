const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controller/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);
//el check prepara la validación del correo para que el controlador reciba como un argumento en el request, tambiénn tratado como req
//manda los errores en forma de arreglo, por lo que será necesario seleccionar cada uno de los mismos
router.post('/', [
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('password', "La contraseña es obligatorio y más de 6 letras").isLength({min: 6}),
    //check('password', "la contraseña debe contener un caracter especial").matches( "1234567890abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ!$#%/()=?¡+" ),
    check('correo', "EL correo no es valido").isEmail(),
    check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //validación personalizada, ".custom" va a recibir como argumento el valor que estoy evaluando del body, si rol no trae nada se le asgina el string vacio
    check('rol').custom( async(rol = '') =>{

        //Esta función evalua que el rol exista dentro de la base de datos
        const existeRol = await Role.findOne({rol});
        if (!existeRol){

            throw new Error(`El rol ${rol} no existe en la base de datos`);

        }
    }), 
],
validarCampos,
usuariosPost);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;
