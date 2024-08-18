import { mongoose } from "mongoose";

const bannerSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    }
});

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    socials: {
        facebook: String,
        twitter: String,
        instagram: String,
        linkedin: String
    }
});

const gallerySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

export const Banner = mongoose.model('Banner', bannerSchema);
export const Gallery = mongoose.model('Gallery', gallerySchema);
export const Event = mongoose.model('Event', eventSchema);
export const Member = mongoose.model('Member', memberSchema);