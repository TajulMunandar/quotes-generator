// src/App.tsx
import React from "react";
import Generate from "../components/Generate";
import { TypeAnimation } from "react-type-animation";

const Main: React.FC = () => {
  return (
    <div className="App">
      <h1 className="title fw-bold text-white mb-5 text-center">
        Inspire Your Day <br />
        <TypeAnimation
          sequence={[" Instantly", 1000, " Immediately", 1000, " Easily", 1000]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </h1>
      <div className="row ">
        <div className="col col-lg-10 text-center mx-auto">
          <p className="fs-4 ">
            Tingkatkan kreativitas Anda dengan kutipan inspiratif. Pilih
            kategori atau ketik ide Anda untuk memulai
          </p>
        </div>
      </div>
      <Generate />
    </div>
  );
};

export default Main;
