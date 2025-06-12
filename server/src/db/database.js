//extrajimos método Pool del paquete pg// 
const {Pool} = require("pg");

//importamos las variables de entorno//
require("dotenv").config({path:"./.env"});

//conectamos la BDD con el método POOL del paquete pg//
class database {
    constructor(){
        this.pool = new Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            allowExitOnIdle: true,
        });
        this.pool.on("error", (err) => {
        
            this.handleError(err);
        });
    }
    handleError(err){
        console.error("error en la conexión", err);
    }

    query(sql, params){
        return this.pool.query(sql, params);
    }
};

module.exports = new database();