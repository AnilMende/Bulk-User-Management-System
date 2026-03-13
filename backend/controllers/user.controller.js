import { User } from "../models/user.model.js";

//For Creating users
export const bulkCreateUsers = async (req, res) => {
    try {

        // handle both formats
        const users = Array.isArray(req.body) ? req.body : req.body.users;

        if (!Array.isArray(users) || users.length < 5000) {
            return res.status(400).json({
                message: "Minimum 5000 users required",
                received: users ? users.length : 0
            });
        }

        const result = await User.insertMany(users, { ordered: false });

        res.status(201).json({
            message: "Users created successfully",
            inserted: result.length
        });

    } catch (error) {

        console.error("Bulk insert error:", error);

        res.status(500).json({
            message: "Insert error",
            error: error.message
        });

    }
};

//For updating users
export const bulkUpdateUsers = async (req, res) => {
    try {

        const updates = req.body.updates;   // expecting { updates: [...] }

        if (!Array.isArray(updates)) {
            return res.status(400).json({
                message: "Invalid request format. 'updates' must be an array"
            });
        }

        const operations = updates.map(user => ({
            updateOne: {
                filter: { _id: user.userId },
                update: {
                    $set: {
                        ...user,
                        updatedAt: new Date()
                    }
                }
            }
        }));

        const result = await User.bulkWrite(operations);

        res.status(200).json({
            message: "Bulk update completed",
            matched: result.matchedCount,
            modified: result.modifiedCount
        });

    } catch (err) {

        res.status(500).json({
            message: "Bulk update failed",
            error: err.message
        });

    }
};


//getUsers
export const getUsers = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;

    const skip = (page - 1) * limit;

    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments();

    res.json({
      page,
      limit,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      users
    });

  } catch (error) {

    res.status(500).json({
      message: "Error fetching users",
      error: error.message
    });

  }
};

//Search Users:
export const searchUsers = async (req, res) => {
  try {

    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        message: "Search query required"
      });
    }

    const users = await User.find({
      $or: [
        { fullName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }
      ]
    }).limit(50);

    res.json({
      count: users.length,
      users
    });

  } catch (error) {

    res.status(500).json({
      message: "Search error",
      error: error.message
    });

  }
};

//Update Wallet
export const updateWallet = async (req, res) => {
  try {

    const userId = req.params.id;
    const { walletBalance } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { walletBalance },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "Wallet updated",
      user
    });

  } catch (error) {

    res.status(500).json({
      message: "Wallet update error",
      error: error.message
    });

  }
};

//device stats
export const deviceStats = async (req, res) => {
  try {

    const stats = await User.aggregate([
      {
        $group: {
          _id: "$deviceInfo.deviceType",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          deviceType: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);

    res.json({
      stats
    });

  } catch (error) {

    res.status(500).json({
      message: "Device stats error",
      error: error.message
    });

  }
};