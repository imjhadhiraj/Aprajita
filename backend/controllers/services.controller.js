import { Banner, Gallery, Event, Member } from '../models/services.model.js';
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

export const addTeamMember = async (req, res) => {
    try {
        const { name, position, socialString } = req.body;
        console.log(socialString)
        const image = req.file;
        if (!name || !position) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        let socials = {};
        if (socialString) {
            try {
                socials = JSON.parse(socialString);
            } catch (error) {
                return res.status(400).json({ error: 'Invalid social media data' });
            }
        }
        console.log(socials)
        let imagePath = image?.path;
        if (!imagePath) {
            return res.status(400).json({ error: 'Image is required' });
        }
        imagePath = await uploadOnCloudinary(imagePath)
        if (!imagePath)
            return res.status(400).json({ error: 'Image upload failed' });

        imagePath = imagePath.url

        const teamMember = await Member.create({
            name,
            position,
            socials,
            image: imagePath
        });
        if (!teamMember) {
            return res.status(400).json({ error: 'Image upload failed' });
        }

        return res.status(200).json({ message: 'Team Member Added Sucessfully' });
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const deleteTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const teamMember = await Member.findById(id);
        if (!teamMember) {
            return res.status(400).json({ error: 'Team Member not found' });
        }
        const deletedTeamMember = await Member.findByIdAndDelete(id);
        if (!deletedTeamMember) {
            return res.status(400).json({ error: 'Team Member delete failed' });
        }
        await deleteFromCloudinary(teamMember.image);
        return res.status(200).json({ message: 'Team Member deleted successfully' });
    }
    catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const getAllTeamMembers = async (req, res) => {
    try {
        const teamMembers = await Member.find();
        if (!teamMembers) {
            return res.status(400).json({ error: 'Team Members not found' });
        }
        return res.status(200).json(teamMembers);
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}