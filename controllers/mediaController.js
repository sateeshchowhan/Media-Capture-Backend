const { uploadFile, deleteFile } = require('../s3Config');
const Media = require('../models/Media');

exports.uploadMedia = async (req, res) => {
    try {
        const file = req.file;
        const result = await uploadFile(file);
        const media = new Media({
            user: req.user.userId,
            url: result.Location,
            key: result.Key
        });
        await media.save();
        res.status(201).json({ message: 'Media uploaded successfully', media });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMedia = async (req, res) => {
    try {
        const media = await Media.find({ user: req.user.userId });
        res.json(media);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const media = await Media.findById(id);
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }
        await deleteFile(media.key);
        await media.remove();
        res.json({ message: 'Media deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
