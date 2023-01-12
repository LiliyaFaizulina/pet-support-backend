const cloudinary = require("cloudinary");

const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
  secure: true,
});

exports.uploads = (file, folder) => {
  // cloudinary.image(file, { // not work as well
  //
  //   secure: true,
  //   transformation: [{ width: 350, height: 350, gravity: "face", crop: "thumb" }, { radius: 20 }],
  // });

  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          //   id: result.public_id,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};
