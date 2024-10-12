import { useEffect, useState } from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const TeamMember = ({ member, onMemberClick }) => {
    return (
        <div className="bg-white shadow-xl rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
            <div onClick={() => onMemberClick(member)} className="">
                <img className="w-full h-64 object-contain" src={member.image} alt={member.name} />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h2>
                    <p className="text-gray-600 mb-4">{member.position}</p>
                </div>
            </div>
            <div className="flex justify-between items-center mx-4 mb-3 ">
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
    )
}

const TeamSection = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [teamData, setTeamData] = useState(null);
    const [teamMemberModal, setTeamMemberModal] = useState(false);

    const [allTeamMember, setAllTeamMember] = useState(false);

    const fetchTeam = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-team-members`);
            setTeamMembers(response.data);
            setAllTeamMember(false);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch team members');
        }
    }

    const fetchAllTeamMembers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-all-team-members`);
            setTeamMembers(response.data);
            setAllTeamMember(true);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch team members');
        }
    }

    const fetchSpecificTeamMember = (member) => {
        setTeamData(member);
        setTeamMemberModal(true);
    }

    useEffect(() => {
        fetchTeam();
    }, []);

    return (
        <section className="py-12 bg-blue-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member) => (
                        <TeamMember
                            key={member._id}
                            member={member}
                            onMemberClick={fetchSpecificTeamMember}
                        />
                    ))}
                </div>
                {
                    !allTeamMember ? (<button
                        className='text-blue-600 hover:text-blue-700 font-semibold mt-8 block mx-auto'
                        onClick={fetchAllTeamMembers}
                    >View All Team Members
                    </button>) : (
                        <button
                            className='text-blue-600 hover:text-blue-700 font-semibold mt-8 block mx-auto'
                            onClick={fetchTeam}
                        >View Less Team Members</button>
                    )
                }

                {teamMemberModal && teamData && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-4xl w-full overflow-hidden shadow-2xl">
                            <div className="relative overflow-y-auto gallery-scroll-area scrollbar-thin-main h-[90%]">
                                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-blue-500 to-teal-500"></div>
                                <div className="relative pt-20 px-8 pb-8 max-h-[80vh]">
                                    <img
                                        src={teamData.image}
                                        alt={teamData.name}
                                        className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg mx-auto"
                                    />
                                    <h2 className="text-3xl font-bold text-center mt-4 text-gray-800">{teamData.name}</h2>
                                    <p className="text-center text-lg text-blue-600 font-semibold mb-4">{teamData.position}</p>

                                    {teamData.quote && (
                                        <blockquote className="italic text-center text-gray-600 my-4">
                                            "{teamData.quote}"
                                        </blockquote>
                                    )}

                                    <div className="bg-gray-100 p-6 rounded-lg mt-6">
                                        <h3 className="text-xl font-semibold mb-2 text-gray-700">About {teamData.name}</h3>
                                        <p className="text-gray-600">{teamData.description}</p>
                                    </div>

                                    <div className="flex justify-center space-x-4 mt-6">
                                        {teamData.socials?.twitter && (
                                            <a href={teamData.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition-colors">
                                                <Twitter size={24} />
                                            </a>
                                        )}
                                        {teamData.socials?.linkedin && (
                                            <a href={teamData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition-colors">
                                                <Linkedin size={24} />
                                            </a>
                                        )}
                                        {teamData.socials?.facebook && (
                                            <a href={teamData.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                                                <Facebook size={24} />
                                            </a>
                                        )}
                                        {teamData.socials?.instagram && (
                                            <a href={teamData.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition-colors">
                                                <Instagram size={24} />
                                            </a>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => setTeamMemberModal(false)}
                                        className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 mx-auto block"
                                    >
                                        Close
                                    </button>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

const NewsletterSection = () => {
    const [subscribedEmail, setSubscribedEmail] = useState('');

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/subscribe`, {
                email: subscribedEmail
            });
            toast.success('Subscribed successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to subscribe');
        }
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