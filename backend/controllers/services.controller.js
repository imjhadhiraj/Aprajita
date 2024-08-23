import { Banner, Gallery, Event, Member } from '../models/services.model.js';
import { deleteFromCloudinary } from '../utils/Cloudinary.utils.js';

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
        const gallery = await Gallery.find().sort({ createdAt: -1 }).limit(15);
        if (!gallery) {
            return res.status(400).json({ error: 'Images not found' });
        }
        return res.status(200).json(gallery);
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const getAllGalleryImages = async (req, res) => {
    try {
        const gallery = await Gallery.find().sort({ createdAt: -1 });
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
        const { title, description, image } = req.body;

        if (!title || !description || !image) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const banner = await Banner.create({
            title,
            description,
            image
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
        const { title, description, date, location, image } = req.body;
        if (!title || !description || !date || !location || !image) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const parsedDate = new Date(date);

        const event = await Event.create({
            title,
            description,
            date: parsedDate,
            location,
            image
        });
        if (!event) {
            return res.status(400).json({ error: 'Failed to create event' });
        }

        return res.status(200).json({ message: 'Event Added Successfully' });
    } catch (error) {
        console.log('Error in add-event route: ', error);
        return res.status(400).json(error?.message);
    }
}

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, location } = req.body;
        if (!title || !description || !date || !location) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const oldEvent = await Event.findById(id);
        if (!oldEvent) {
            return res.status(400).json({ error: 'Event not found' });
        }

        let oldImage = oldEvent.image;

        let image = oldImage;
        if (req.body.image) {
            image = req.body.image;
        }

        const parsedDate = new Date(date);

        const event = await Event.findByIdAndUpdate(id, {
            title,
            description,
            date: parsedDate,
            location,
            image
        }, { new: true });
        if (!event) {
            return res.status(400).json({ error: 'Failed to update event' });
        }
        if (oldImage !== image)
            await deleteFromCloudinary(oldImage);

        return res.status(200).json({ message: 'Event Updated Successfully' });
    } catch (error) {
        console.log('Error in update-event route: ', error);
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
        await deleteFromCloudinary(event.image);
        const deletedEvemt = await Event.findByIdAndDelete(id);
        if (!deletedEvemt) {
            return res.status(400).json({ error: 'Event delete failed' });
        }
        return res.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const getAllEvents = async (req, res) => {
    try {
        const event = await Event.find().sort({ createdAt: -1 });
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
        const { name, position, socials, image, quote, description } = req.body;
        if (!name || !position || !image || !quote || !description) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const socialJson = JSON.parse(socials);
        const teamMember = await Member.create({
            name,
            position,
            quote,
            description,
            socials: socialJson,
            image
        });
        if (!teamMember) {
            return res.status(400).json({ error: 'Failed to create team member' });
        }

        return res.status(200).json({ message: 'Team Member Added Successfully' });
    } catch (error) {
        console.log('Error in add-team-member route: ', error);
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

export const updateTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, socials, quote, description } = req.body;
        if (!name || !position || !quote || !description) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const socialJson = JSON.parse(socials);
        const teamMemberData = await Member.findById(id);
        if (!teamMemberData) {
            return res.status(400).json({ error: 'Team Member not found' });
        }
        const oldImage = teamMemberData.image;

        let image = oldImage;
        if (req.body.image) {
            image = req.body.image;
        }

        const teamMember = await Member.findByIdAndUpdate(id, {
            name,
            position,
            quote,
            description,
            socials: socialJson,
            image
        }, { new: true });
        if (!teamMember) {
            return res.status(400).json({ error: 'Failed to update team member' });
        }

        if (oldImage !== image)
            await deleteFromCloudinary(oldImage);

        return res.status(200).json({ message: 'Team Member Updated Successfully' });
    } catch (error) {
        console.log('Error in update-team-member route: ', error);
        return res.status(400).json(error?.message);
    }
}

export const getAllTeamMembers = async (req, res) => {
    try {
        const teamMembers = await Member.find().sort({ createdAt: 1 });
        if (!teamMembers) {
            return res.status(400).json({ error: 'Team Members not found' });
        }
        return res.status(200).json(teamMembers);
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const deleteUnusedImage = async (req, res) => {
    try {
        const url = req.headers?.url;
        if (!url) {
            return res.status(400).json({ error: 'Image URL is required' });
        }
        await deleteFromCloudinary(url);
        console.log("deleted unused image");
        return res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}
