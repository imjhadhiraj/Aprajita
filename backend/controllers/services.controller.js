import { Banner, Gallery, Event } from '../models/services.model.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/Cloudinary.utils.js';

export const uploadGalleryImage = async (req, res) => {
    try {
        const user = req.user;
        const { images } = req.body;
        if (!images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({ error: 'At least one image URL is required' });
        }

        const galleryEntries = await Promise.all(images.map(async (imageUrl) => {
            return await Gallery.create({
                user: user._id,
                image: imageUrl
            });
        }));

        if (galleryEntries.length === 0) {
            return res.status(400).json({ error: 'Image upload failed' });
        }

        return res.status(200).json({ message: 'Images uploaded successfully' });
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const deleteGalleryImage = async (req, res) => {
    try {
        const { id } = req.params;
        const gallery = await Gallery.findById(id);
        if (!gallery) {
            return res.status(400).json({ error: 'Image not found' });
        }
        const deletedGalleryData = await Gallery.findByIdAndDelete(id);
        if (!deletedGalleryData) {
            return res.status(400).json({ error: 'Image delete failed' });
        }
        await deleteFromCloudinary(gallery.image);
        return res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const getGalleryImages = async (req, res) => {
    try {
        const gallery = await Gallery.find();
        if (!gallery) {
            return res.status(400).json({ error: 'Images not found' });
        }
        return res.status(200).json(gallery);
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const addBannerImage = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file;
        if (!title || !description || !image) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        let imagePath = image.path;
        imagePath = await uploadOnCloudinary(imagePath)
        if (!imagePath)
            return res.status(400).json({ error: 'Image upload failed' });

        imagePath = imagePath.url

        const banner = await Banner.create({
            title,
            description,
            image: imagePath
        });
        if (!banner) {
            return res.status(400).json({ error: 'Image upload failed' });
        }

        return res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const deleteBannerImage = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findById(id);
        if (!banner) {
            return res.status(400).json({ error: 'Image not found' });
        }
        await Banner.findByIdAndDelete(id);
        const deleted = await deleteFromCloudinary(banner.image);
        if (!deleted) {
            return res.status(400).json({ error: 'Image delete failed' });
        }
        return res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const getBannerImages = async (req, res) => {
    try {
        const banner = await Banner.find();
        if (!banner) {
            return res.status(400).json({ error: 'Images not found' });
        }
        return res.status(200).json(banner);
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const addEvent = async (req, res) => {
    try {
        const { title, description, date, location } = req.body;
        const image = req.file;
        if (!title || !description || !date || !location) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        let imagePath = image.path;
        imagePath = await uploadOnCloudinary(imagePath)
        if (!imagePath)
            return res.status(400).json({ error: 'Image upload failed' });

        imagePath = imagePath.url

        const parsedDate = new Date(date);

        const event = await Event.create({
            title,
            description,
            date: parsedDate,
            location,
            image: imagePath
        });
        if (!event) {
            return res.status(400).json({ error: 'Image upload failed' });
        }

        return res.status(200).json({ message: 'Event Added Sucessfully' });
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) {
            return res.status(400).json({ error: 'Event not found' });
        }
        const deletedEvemt = await Event.findByIdAndDelete(id);
        if (!deletedEvemt) {
            return res.status(400).json({ error: 'Event delete failed' });
        }
        await deleteFromCloudinary(event.image);
        return res.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const getAllEvents = async (req, res) => {
    try {
        const event = await Event.find();
        if (!event) {
            return res.status(400).json({ error: 'Events not found' });
        }
        return res.status(200).json(event);
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}

