import { Link } from "@remix-run/react";
import { FC } from "react";
import Logo from "~/assets/Logo2.png";

const Footer:FC<{variant?:boolean}> = ({variant=false}) => {
  return (
    <footer className={`bg-primary text-white relative ${variant?"py-12":"pt-36 pb-12"}  overflow-hidden`}>
      <div className={`w-full ${variant?"hidden":""}  min-h-24 bg-secondary absolute border-b-2 md:border-b-4 border-black top-0 rounded-b-[100%] scale-105`}></div>
      <main className="container space-y-4">
        <Link to={"/"}>
          <img src={Logo} className="md:w-44 w-32" alt="Logo" />
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 py-10">
          <div className="w-full space-y-4">
            <h3 className="font-semibold text-2xl">Malang</h3>
            <p className="max-w-sm">
              Fakultas Ilmu Sosial dan Ilmu Politik Universitas Brawijaya,
              Malang, Jawa Timur, Indonesia
            </p>
          </div>
          <div className="w-full">
            <h3 className="font-semibold text-2xl">Gen-free</h3>
            <Link to={"/about"}>Tentang Kami</Link>
          </div>
        </div>
        <hr className="border-white border" />
        <div className="flex justify-between md:flex-row gap-4 flex-col items-center">
          <p className="max-w-sm text-sm md:text-base">
            Beraksi, suarakan pendapat, dan terlibat dalam isu-isu penting
            bersama GEN-FREE
          </p>
          <p className="text-sm md:text-base">© 2024 Gen-Free · Made with ❤️ by Tim IT</p>
        </div>
      </main>
    </footer>
  );
};

export default Footer;
