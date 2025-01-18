import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
return (
    <div>
        <div className=" bg-cover bg-center bg-[url(https://cdn.dribbble.com/users/6985884/screenshots/15849023/media/6dfb9f3caf75d8b6acc1f9bde6b885fa.gif)] h-screen pt-8 flex justify-between flex-col w-full bg-red-500">
        <img className="w-14 ml-8 px-1 mix-blend-multiply" src="https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif?cid=6c09b952e6rr0kmn93l50vo1wgf8vm20gt6llo8yboszesl5&ep=v1_gifs_search&rid=giphy.gif&ct=g"/>
        <div className="bg-white py-5 px-10">
            <h2 className="text-3xl font-bold">Get Started With Ak-gpt</h2>
            <Link to='/login' className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
        </div>
        </div>
    </div>
)
};


export default Start;