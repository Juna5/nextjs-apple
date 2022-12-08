import Image from "next/image";
import Link from "next/link";
import {
    SearchIcon,
    ShoppingBagIcon,
    UserIcon,
} from "@heroicons/react/outline";

export default function Header() {
    const session = true;
    return (
        <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#e7ecee] p-4">
            <div className="flex items-center justify-center md:w-1/5">
                <Link href="/">
                    <div className="relative h-10 w-5 cursor-pointer opacity-75 transition hover:opacity-100">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                            layout="fill"
                            objectFit="contain"
                            alt=""
                        />
                    </div>
                </Link>
            </div>
            <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
                <a href="" className="header-link">
                    Product
                </a>
                <a href="" className="header-link">
                    Explore
                </a>
                <a href="" className="header-link">
                    Support
                </a>
                <a href="" className="header-link">
                    Business
                </a>
            </div>
            <div className="flex items-center justify-center space-x-4 md:w-1/5">
                <SearchIcon className="header-icon" />
                <Link href="/checkout">
                    <div className="relative cursor-pointer">
                        <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
                            5
                        </span>
                        <ShoppingBagIcon className="header-icon" />
                    </div>
                </Link>
                {session ? (
                    <Image
                        src={
                            "https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-1.jpg"
                        }
                        alt="img"
                        className="cursor-pointer rounded-full"
                        width={34}
                        height={34}
                    />
                ) : (
                    <UserIcon className="header-icon" />
                )}
            </div>
        </header>
    );
}
