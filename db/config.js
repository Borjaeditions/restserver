const mongoose = require('mongoose');

const dbconexion = async() =>{
    
    
    
    try {
        
        //si en la base de datos no existe la dirección especificada, al insertar un dato se creará en automatico
        
        await mongoose.connect('mongodb://localhost:27017/cafe', {
        useNewUrlParser: true,
        useUnifiedTopology: true
        }, (err, resp) => {
            if (err) throw err;
            console.log('Base de datos ONLINE');
        });

        
        /*await mongoose.connect(process.env.MONGOCNN, {

            useNewUrlParse: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
            
            // Esto no funcionó

        });
        */ 
        console.log('Base de datos conectada');
        
    } catch (error) {
        
        console.log(error);
        throw new Error('Error en la base de datos');

    }

}

module.exports = {
    dbconexion
};