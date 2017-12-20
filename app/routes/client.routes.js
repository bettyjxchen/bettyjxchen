const express = require('express')
const router = express.Router()
const path = require('path')
const contentPath = path.join(__dirname, '../../content')

// frontend routes =========================================================

// route to handle all angular client state URL requests (regex matches URL with no file extension, query OK)
router.get(/^\/([^\.\?]*|[^\?]*\/[^\.\?]*)(\?.*)?$/, (req, res, next) => {
    let file = "index.html"
    
    if (req.originalUrl.startsWith('/home')) {
        file = 'homepage.html'
    }

    // else if (req.originalUrl.startsWith('/error')) {
    //     file = 'error.html'
    // }

    else if (req.originalUrl.startsWith('/admin')) {
        file = 'admin.html'
    }
    
    res.sendFile(file, {
        root: contentPath
    })
})

router.get('*', express.static(contentPath, {
    fallthrough: false
}))

// Handle Static File 404
router.use(function(err, req, res, next) {
    if (err) console.error
    res.sendStatus(404)
})

module.exports = router
