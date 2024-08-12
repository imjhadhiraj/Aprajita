import { Banner, Gallery, Event } from '../models/services.model.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/Cloudinary.Utils.js';

export const uploadGalleryImage = async (req, res) => {
    try {
        const { title } = req.body;
        const image = req.file;
        if (!title || !image) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        let imagePath = image.path;
        imagePath = await uploadOnCloudinary(imagePath)
        if (!imagePath)
            return res.status(400).json({ error: 'Image upload failed' });

        imagePath = imagePath.url

        const gallery = await Gallery.create({
            title,
            image: imagePath
        });
        if (!gallery) {
            return res.status(400).json({ error: 'Image upload failed' });
        }

        return res.status(200).json({ message: 'Image uploaded successfully' });
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
        const deleted = await deleteFromCloudinary(gallery.image);
        if (!deleted) {
            return res.status(400).json({ error: 'Image delete failed' });
        }
        await Gallery.findByIdAndDelete(id);
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

        const event = await Event.create({
            title,
            description,
            image: imagePath
        });
        if (!event) {
            return res.status(400).json({ error: 'Image upload failed' });
        }

        return res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) {
            return res.status(400).json({ error: 'Image not found' });
        }
        const deleted = await deleteFromCloudinary(event.image);
        if (!deleted) {
            return res.status(400).json({ error: 'Image delete failed' });
        }
        await Event.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Image deleted successfully' });
    }
    catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const getAllEvents = async (req, res) => {
    try {
        const event = await Event.find();
        if (!event) {
            return res.status(400).json({ error: 'Images not found' });
        }
        return res.status(200).json(event);
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}

