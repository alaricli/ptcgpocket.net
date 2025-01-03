import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex justify-center md:justify-start p-2 md:p-0">
          <Link href="/">
            <Image
              src={"/script_logo.png"}
              alt={"ptcgpocket.net Logo"}
              width={400}
              height={50}
              className="cursor-pointer ml-1"
            />
          </Link>
        </div>
        {/* section2 */}
        <div className="flex justify-center p-2 md:p-0 md:left-1/2 md:absolute md:transform md:-translate-x-1/2">
          <ul className="flex space-x-6 text-white font-medium text-2xl mx-auto">
            <li>
              <Link
                href={{
                  pathname: `/sets/all`,
                }}
              >
                <p className="hover:text-orange-400">Cards</p>
              </Link>
            </li>
            <li>
              <Link href="/sets">
                <p className="hover:text-orange-400">Sets</p>
              </Link>
            </li>
            <li>
              <Link href="/meta">
                <p className="hover:text-orange-400">Decks</p>
              </Link>
            </li>

            <li>
              <Link href="/articles">
                <p className="hover:text-orange-400">Articles</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
