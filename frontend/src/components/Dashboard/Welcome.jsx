import useAdmin from "../../../store/useAdmin";

const Welcome = () => {
    const admin = useAdmin((state) => state.user);
    return (
        <div className="mx-auto min-h-screen py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                    Welcome to Your Dashboard
                                </h1>
                                <p className="text-xl text-gray-500">
                                    Hello, {admin?.user?.name}! We're glad to see you.
                                </p>
                            </div>
                            <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                                <p>What would you like to do today?</p>
                                {/* <p>
                                    <a href="#" className="text-cyan-600 hover:text-cyan-700"> View Analytics &rarr; </a>
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome
