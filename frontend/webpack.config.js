const path = require('path'); // Ensure this is included if you are using path in the configuration.

module.exports = {
    // Other existing configurations
    resolve: {
        fallback: {
            crypto: require.resolve('crypto-browserify'),
        },
    },
    // Add additional configurations here if needed
};
