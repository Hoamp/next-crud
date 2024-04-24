import Navbar from "./Navbar";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className={` ${inter.className} px-32 py-16`}>{children}</main>
        </>
    );
}
