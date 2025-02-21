import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBox() {
    return (
        <div className="relative w-full mt-4">
            <input 
                type="text" 
                placeholder="Search" 
                className="w-full h-[60px] pl-12 pr-4 rounded-2xl shadow-md shadow-blue-200 focus:outline-none"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
        </div>
    );
}
