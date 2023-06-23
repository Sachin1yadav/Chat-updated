const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.73ac4ly.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
    options: { useUnifiedTopology: true, useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if (match.indexOf(file.mimeType) === -1) {
            return `${Date.now()}-file-${file.originalname}`;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-file-${file.originalname}`,
        }
    }
})

module.exports = multer({ storage });