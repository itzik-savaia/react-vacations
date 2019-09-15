
function File(req, res, next) {
    var file = req.files.file;

    console.log(file, ">>>>>>>>>>>>>>>>>>>file");

    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    file.mv(`${__dirname}../../../uploads/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error -> ' + err)
        } else {
            console.log('>>>NewFile_Uplod', file);
            res.json({
                fileName: file.name,
                filePath: `/uploads/${file.name}`
            })

            next()
        }
    })
}
module.exports = File;