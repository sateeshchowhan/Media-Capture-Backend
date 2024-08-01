const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const config = require('./config');

const s3Client = new S3Client({
    region: 'your-region',
    credentials: {
        accessKeyId: config.awsAccessKey,
        secretAccessKey: config.awsSecretKey,
    },
});

const uploadFile = async (file) => {
    const uploadParams = {
        Bucket: config.awsBucketName,
        Key: file.filename,
        Body: file.buffer,
        ACL: 'public-read'
    };
    try {
        const command = new PutObjectCommand(uploadParams);
        const data = await s3Client.send(command);
        return {
            Location: `https://${config.awsBucketName}.s3.amazonaws.com/${file.filename}`,
            Key: file.filename,
        };
    } catch (err) {
        console.error(err);
        throw new Error('Error uploading file');
    }
};

const deleteFile = async (key) => {
    const deleteParams = {
        Bucket: config.awsBucketName,
        Key: key,
    };
    try {
        const command = new DeleteObjectCommand(deleteParams);
        await s3Client.send(command);
    } catch (err) {
        console.error(err);
        throw new Error('Error deleting file');
    }
};

module.exports = { uploadFile, deleteFile };
