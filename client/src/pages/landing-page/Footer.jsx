import React from "react";
import {FaInstagram} from "react-icons/fa";
import {FaTwitter} from "react-icons/fa";
import {FaFacebook} from "react-icons/fa";
import {FaYoutube} from "react-icons/fa";

function Footer(){
return(
    <div className="bg-gray-900 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">

        <div className="p-5">
            <ul>
                <p className="text-gray-600 font-bold">
                    Share<span className="text-orange-400">Hub</span>
                </p>
                <div className="flex gap-6 pb-5">
                    <FaInstagram className="text-2x1 cursor-pointer hover:text-pink-500"/>
                    <FaTwitter className="text-2x1 cursor-pointer hover:text-blue-600"/>
                    <FaFacebook className="text-2x1 cursor-pointer hover:text-blue-500"/>
                    <FaYoutube className="text-2x1 cursor-pointer hover:text-red-600"/>
                </div>
            </ul>
        </div>

        <div className="p-5">
            <ul>
                <p className="text-gray-300 font-bold text-2x1 pb-4">Email:</p>
                <li className="text-gray-500 text-md pb-2 font-semibold hover:text-orange-400 cursor-pointer">
                bsitsharehubofficial@gmail.com</li>

            </ul>
        </div>

        <div>
    <center><h1 className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
        Contact Us</h1></center>
        </div>

        
</div>

)
}
export default Footer