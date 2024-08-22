import { useEffect, useState } from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const TeamMember = ({ member }) => {
    return (
        <div key={member._id} className="bg-white shadow-xl rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <img className="w-full h-64 object-contain" src={member.image} alt={member.name} />
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h2>
                <p className="text-gray-600 mb-4">{member.position}</p>
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        {member.socials?.twitter && (
                            <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
                                <Twitter className="text-blue-400 hover:text-blue-600" />
                            </a>
                        )}
                        {member.socials?.linkedin && (
                            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="text-blue-700 hover:text-blue-900" />
                            </a>
                        )}
                        {member.socials?.facebook && (
                            <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer">
                                <Facebook className="text-blue-600 hover:text-blue-800" />
                            </a>
                        )}
                        {member.socials?.instagram && (
                            <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer">
                                <Instagram className="text-pink-600 hover:text-pink-800" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const TeamSection = () => {
    const [teamMembers, setTeamMembers] = useState([]);

    const fetchTeam = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-team-members`);
            setTeamMembers(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTeam();
    }, []);

    return (
        <section className="py-12 bg-blue-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <TeamMember key={index} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const NewsletterSection = () => {
    const [subscribedEmail, setSubscribedEmail] = useState('');

    const handleForm = (e) => {
        e.preventDefault();
        toast.success('Subscribed successfully');
        setSubscribedEmail('');
    };
    return (
        <section className="py-12 bg-orange-500 text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">Sign Up for Updates</h2>
                <p className="text-center mb-8">To be updated with all the latest news, offers and special announcements.</p>
                <form className="flex justify-center" onSubmit={handleForm}>
                    <input
                        type="email"
                        required
                        value={subscribedEmail}
                        onChange={(e) => setSubscribedEmail(e.target.value)}
                        placeholder="Your email address"
                        className="px-4 py-2 rounded-l-lg w-64 text-black" />
                    <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded-r-lg">Subscribe</button>
                </form>
            </div>
        </section>
    )
};

const TeamAndTestimonialPage = () => {
    return (
        <div>
            <TeamSection />
            <NewsletterSection />
        </div>
    );
};

export default TeamAndTestimonialPage;
