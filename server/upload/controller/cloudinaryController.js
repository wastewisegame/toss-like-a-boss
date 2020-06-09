const cloudinaryClient = require('cloudinary').v2
const crypto = require('crypto')
cloudinaryClient.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const generateCloudinarySignature = (req, res) => {
    console.log('signature: ', req.body)
    const params_to_sign = req.body.data
    const signature = cloudinaryClient.utils.api_sign_request(
        params_to_sign,
        process.env.CLOUDINARY_API_SECRET
    )
    res.send(signature)
}

module.exports = {
    generateCloudinarySignature,
}
