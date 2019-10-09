const env = process.env.NODE_ENV || 'dev';
console.log(`env:${env}`);

const config = {
    production: {
        STORE_HOST: 'http://store.example.com'
    },
    uat: {
        STORE_HOST: 'http://uat.store.example.com'
    },
    dev: {
        STORE_HOST: 'http://localhost:3001'
    }
}

module.exports = config[env];