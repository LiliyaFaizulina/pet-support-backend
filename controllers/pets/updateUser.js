const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const updateUser = async (req, res) => {
  const { properties } = req.params;
  const { _id } = req.user;
  let result = null;
  switch (properties) {
    case "name":
      result = await User.findOneAndUpdate(
        { _id },
        { name: req.body.name },
        {
          new: true,
          runValidators: true,
        }
      );
      break;

    case "email":
      result = await User.findOneAndUpdate(_id, { email: req.body.email });
      break;

    case "birthday":
      result = await User.findOneAndUpdate(
        { _id },
        { birthday: req.body.birthday },
        {
          new: true,
          runValidators: true,
        }
      );
      break;

    case "city":
      result = await User.findOneAndUpdate(
        { _id },
        { city: req.body.city },
        {
          new: true,
          runValidators: true,
        }
      );
      break;

    case "phone":
      result = await User.findOneAndUpdate(
        { _id },
        { phone: req.body.phone },
        {
          new: true,
          runValidators: true,
        }
      );
      break;

    default:
      throw HttpError(400, "Properties of user not found");
  }

  if (!result) {
    throw HttpError(404, "User not found");
  }
  const {
    name,
    email,
    avatarURL,
    birthday,
    city,
    phone,
    notieceId,
    favoriteNoticeId,
  } = result;
  res.json({
    message: "success",
    data: {
      name,
      email,
      avatarURL,
      birthday,
      city,
      phone,
      notieceId,
      favoriteNoticeId,
    },
  });
};

module.exports = updateUser;
