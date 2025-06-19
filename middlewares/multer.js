const multer  = require('multer');


// * ESEMPIO MODIFICATO COME MI SERVE
const storage = multer.diskStorage({
    destination: 'public/images/movies',
    filename: function (req, file, cb) {
        // const uniqueName = `${Date.now()}-${file.originalname}`;
        // todo: rimuovere assolutamente quando avrai caricamento immagine da form su react
        // * DEBUG
        const uniqueName = file.originalname ? `${Date.now()}-${file.originalname}` : 'filename';
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });


module.exports = upload;




// * ESEMPIO PARO PARO
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/tmp/my-uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

// const upload = multer({ storage: storage })