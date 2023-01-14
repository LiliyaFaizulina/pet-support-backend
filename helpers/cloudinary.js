// const cloudinary = require("cloudinary");

// const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET } = process.env;

// cloudinary.config({
//   cloud_name: CLOUD_NAME,
//   api_key: CLOUDINARY_API_KEY,
//   api_secret: CLOUDINARY_SECRET,
//   secure: true,
// });

// exports.uploads = (file, folder) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(
//       file,
//       (result) => {
//         resolve({
//           url: result.url,
//         });
//       },
//       {
//         resource_type: "auto",
//         folder: folder,
//       }
//     );
//   });
// };
