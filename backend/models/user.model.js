import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email"]
    },

    phone: {
        type: String,
        required: true,
        unique: true,
        index: true,
        match: [/^[0-9]+$/, "Phone must be numeric"]
    },

    walletBalance: {
        type: Number,
        default: 0,
        min: 0
    },

    isBlocked: {
        type: Boolean,
        default: false
    },

    kycStatus: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },

    deviceInfo: {
        ipAddress: String,

        deviceType: {
            type: String,
            enum: ["Mobile", "Desktop"]
        },

        os: {
            type: String,
            enum: ["Android", "ioS", "Windows", "macOS"]
        }
    }

}, { timestamps: true });

userSchema.index( { email : 1}, { unique : true });
userSchema.index( {phone : 1}, { unique : true});
userSchema.index({ createdAt : -1 });

export const User = mongoose.model("users", userSchema);