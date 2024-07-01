import React from "react";

function About() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex bg-white font-bold text-5xl justify-center items-center py-10">
          I'm Devesh Kumar Pandey
        </div>
        <div className="flex text-black bg-white text-xl text-center pt-5">
          Made in India in 2024, a tool to extract text from images. Make every
          image accessible.
        </div>
      </div>
      <div
        className="flex flex-wrap justify-center items-center"
        style={{
          backgroundImage:
            "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA8PbM230uN_5mzeiJ1TpsYNv8NwP4fmnd_ifJGkI6qt5wEQxB8Embn-u0_UlWJWs-jyA&usqp=CAU)",

          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "40vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="flex flex-wrap py-16 justify-between items-center"
        >
          <div className="flex flex-wrap text-2xl text-black">
            Interested in collaborating?
          </div>
          <a
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mx-20 rounded"
            href="mailto:deveshkumarpandeyiit@gmail.com"
          >
            Email me
          </a>
        </div>
      </div>
    </>
  );
}

export default About;
