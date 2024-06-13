import Link from "next/link";
import { FiCodesandbox } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="p-3 container mx-auto flex items-center justify-between">
      <div className="left text-orange-600">
        <Link
          href={"/"}
          className="flex items-center gap-1 text-xl font-semibold tracking-tighter "
        >
          <FiCodesandbox />
          CODERS BOOK
        </Link>
      </div>
      <div className="right flex items-center gap-2 text-sm">
        <Link
          href={"/"}
          className="py-1 px-3 text-orange-600 border-[1.5px] border-orange-600 rounded-md  hover:bg-orange-600 hover:text-white transition-all duration-300"
        >
          Sign In
        </Link>

        <Link
          href={"/"}
          className="py-1.5 px-3 bg-orange-600 text-white rounded-md  hover:bg-orange-500 hover:text-white transition-all duration-300"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
