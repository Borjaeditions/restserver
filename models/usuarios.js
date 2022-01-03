const {Schema, model} = require('mongoose');

const usuarioSchema = Schema({

    nombre: {

        type: String,
        required: [true, 'El nombre es obligatorio'], //Indica que el valor es requerido

    },
    correo: {

        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true, //propiedad de mongo que evita tener correos duplicados en la base de datos

    },
    password: {

        type: String,
        required: [true, "La contraseña es obligatoria"],

    },
    imagen:{

        type: String,

    },
    rol: {

        type: String,
        required: [true],
        enum: ["ADMIN_ROLE", "USER_ROLE"],
    },
    estado: {

        type: Boolean,
        default: true,
        
    },
    google: {

        type: Boolean,
        default: false,

    }

});

//aquí nombra la coleción, pero agrega un "es" o "s" al final, algo exrtaño, analizar más
module.exports = model('Usuarios', usuarioSchema);