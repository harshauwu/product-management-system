const mongoose = require('mongoose');
const CONFIG = require('../config/config');
const { log } = require('../services/log.service');

let instance = null;

class Database {
    constructor() {
        if (!instance) {
            instance = this;
            this._connect();
        }
        return instance;
    }

    _connect() {
        console.log('DB HOST: ', CONFIG.db_host);
        if (CONFIG.db_host !== '') {
            mongoose.Promise = global.Promise;

            let mongoLocation = '';

            // Handle Atlas connection
            if (CONFIG.db_server === 'atlas') {
                mongoLocation = `mongodb+srv://${CONFIG.db_user}:${CONFIG.db_password}@${CONFIG.db_host}/${CONFIG.db_name}`;
            } 
            // Handle Local Environment
            else if (CONFIG.app === 'local') {
                mongoLocation = `mongodb://${CONFIG.db_host}:${CONFIG.db_port}/${CONFIG.db_name}`;
            } 
            // Handle Production with Replica Set
            else if (CONFIG.app === 'prod') {
                mongoLocation = `mongodb://${CONFIG.db_user}:${CONFIG.db_password}@${CONFIG.db_host_1}:${CONFIG.db_port_1},${CONFIG.db_host_2}:${CONFIG.db_port_2},${CONFIG.db_host_3}:${CONFIG.db_port_3}/${CONFIG.db_name}?authSource=admin&replicaSet=${CONFIG.replicaSet}`;
            } 
            // Handle Other Environments (Default to Admin Auth)
            else {
                mongoLocation = `mongodb://${CONFIG.db_user}:${CONFIG.db_password}@${CONFIG.db_host}:${CONFIG.db_port}/${CONFIG.db_name}?authSource=admin`;
            }

            mongoose.connect(mongoLocation, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                maxPoolSize: 10,  // Set connection pool size
            })
                .then(() => {
                    console.log('Connected to MongoDB');
                    log.info('Connected to MongoDB');
                })
                .catch(err => {
                    log.error('*** Can Not Connect to MongoDB:', err);
                });

            const db = mongoose.connection;
            db.on('error', error => {
                log.error('MongoDB connection error:', error);
            });
        } else {
            log.error('No Mongo Credentials Given');
        }
    }

    getDb() {
        return mongoose.connection;
    }
}

const database = new Database();
module.exports = database;
