import React from "react";

function Home() {
  return (
    <>
      <div className="flex flex-x justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex bg-white font-bold text-5xl py-10">
            Get text from images.
          </div>
          <div className="flex text-black bg-white text-xl text-center p-5">
            Are you looking for a tool to extract text from images? You are at
            the right place.
          </div>
          <div className="flex flex-wrap p-5">
            <a
              onClick={() => (window.location.href = "/extract")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded cursor-pointer"
            >
              Extract
            </a>
          </div>
        </div>
        <div className="flex flex-x p-5 pt-32">
          <img
            alt="react"
            src="https://miro.medium.com/v2/resize:fit:1358/1*7HpOj6xOfAGlKQfYwvAbqA.gif"
            className="h-96 w-100 rounded-lg"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
