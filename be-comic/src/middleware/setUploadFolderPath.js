const setUploadFolderPath = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        const { order } = req.query

        const folderPath = `comic/${id}/${order}`;

        req.folderPath = folderPath;

        next();
    } catch (error) {
        console.error(error);
        next(error); // hoặc gửi lỗi cho middleware xử lý lỗi chung
    }
}

module.exports = setUploadFolderPath 