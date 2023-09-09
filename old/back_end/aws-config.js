const AWS = require("aws-sdk");

AWS.config.update({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId,
  region: "eu-west-3",
});

const s3 = new AWS.S3();

module.exports = s3;
