module.exports = {
  servers: {
    main: {
      "host": "52.205.201.135",
      "username": "ubuntu",
      // or pem file (ssh based authentication)
      "pem": "~/.ssh/wguss.pem"
    },
  },

  meteor: {
    name: 'test',
    path: '../',
    servers: {
      main: {},
    },
    ssl: {
      crt: './server.crt', // this is a bundle of certificates
      key: './server.key', // this is the private key of the certificate
      port: 443 // 443 is the default value and it's the standard HTTPS port
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'https://52.205.201.135/',
      MONGO_URL: 'mongodb://localhost/meteor',
    },

    // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 60,
    
    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: false
  },

  mongo: {
    oplog: true,
    port: 27017,
    version: '3.4.1',
    servers: {
      main: {},
    },
  },
};
