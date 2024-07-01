import React, { useState } from "react";
import Contact from "./Contact";

function Footer() {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <hr className="my-4" />
      <div className="flex flex-wrap justify-between text-black px-7">
        <div className="flex flex-wrap text-xl font-bold">SnapText</div>
        <div className="flex flex-wrap font-bold text-black">
          <div
            className="flex flex-wrap font-bold px-2 cursor-pointer hover:text-gray-800"
            onClick={() => setShowContact(true)}
          >
            Contact
          </div>
          <div className="flex flex-wrap font-bold px-2 cursor-pointer hover:text-gray-800"
            onClick={() => (window.location.href = "/about")}
          >About</div>
        </div>
      </div>
      <hr className="my-4 w-full" />
      <div className="flex flex-wrap justify-between text-black px-7">
      <div className="flex flex-wrap justify-left px-5 mb-5 bottom-0">
        <a className="text-black bg-white cursor-pointer hover:text-gray-800 mx-2" 
          onClick={() => (window.location.href = "https://linkedin.com/in/deveshkpandey")}
        >
          <img alt="linkedin" src="https://img.icons8.com/color/48/000000/linkedin.png" />
        </a>
        <a className="text-black bg-white cursor-pointer hover:text-gray-800 mx-2"
          onClick={() => (window.location.href = "https://www.youtube.com/@devesh_pandey")}
        >
          <img alt="youtube" src="https://img.icons8.com/color/48/000000/youtube-play.png" />
        </a>
        <a className="text-black bg-white cursor-pointer hover:text-gray-800 mx-2"
          onClick={() => (window.location.href = "https://x.com/pandey_devesh_")}
        >
          <img alt="twitter" src="https://img.icons8.com/color/48/000000/twitterx--v2.png" />
        </a>
        </div>
        {/* <div className="flex flex-wrap justify-center text-black px-5"> */}
          <div className="flex flex-wrap font-bold text-black">
            Made with ❤️ for the community
          </div>
          {/* </div> */}
      </div>
      {showContact && <Contact onClose={() => setShowContact(false)} />}
    </>
  );
}

export default Footer;
