import { useNavigate } from 'react-router-dom';

const ReadMore = () => {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
                    <h1 className="text-4xl font-bold text-white text-center">About Aprajita Foundation</h1>
                </div>

                <div className="p-8">
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-6 text-orange-600 border-b-2 border-orange-200 pb-2">Our Mission</h2>
                        <p className="text-lg leading-relaxed text-gray-700">
                            The Aprajita Foundation is dedicated to empowering women and preserving cultural heritage through sustainable initiatives, education, and community support. We focus on uplifting women from marginalized communities by providing them with skills, resources, and opportunities to achieve financial independence while simultaneously working to preserve and promote at-risk cultural traditions and crafts.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-6 text-orange-600 border-b-2 border-orange-200 pb-2">Our Vision</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <svg className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-lg leading-relaxed text-gray-700"><strong className="text-orange-600">Empower Women:</strong> Equip women with education, vocational training, and entrepreneurial skills to enable them to contribute to their families and communities.</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-lg leading-relaxed text-gray-700"><strong className="text-orange-600">Preserve Culture:</strong> Support traditional artisans and cultural practitioners, ensuring that valuable cultural heritage is not only preserved but also celebrated and passed on to future generations.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-6 text-orange-600 border-b-2 border-orange-200 pb-2">Our Projects</h2>
                        <ol className="space-y-6">
                            <li className="bg-gray-50 rounded-lg p-6 shadow-md mb-5 cursor-pointer">
                                <h3 className="text-xl font-medium text-orange-600 mb-2">Vocational Training Programs</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    We offer a range of vocational training programs designed to provide women with the skills they need to start their own businesses or secure meaningful employment.
                                </p>
                            </li>
                            <li className="bg-gray-50 rounded-lg p-6 shadow-md mb-5 cursor-pointer">
                                <h3 className="text-xl font-medium text-orange-600 mb-2">Cultural Preservation Initiatives</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Our cultural preservation initiatives focus on documenting, promoting, and supporting traditional crafts and practices, ensuring that they remain a vital part of our community.
                                </p>
                            </li>
                            <li className="bg-gray-50 rounded-lg p-6 shadow-md mb-5 cursor-pointer">
                                <h3 className="text-xl font-medium text-orange-600 mb-2">Community Support Programs</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    We work closely with local communities to provide support services, including healthcare, education, and legal aid, to ensure that women and their families have the resources they need to thrive.
                                </p>
                            </li>
                        </ol>
                    </section>

                    <button
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-full mx-auto block shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                        onClick={handleHome}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReadMore;