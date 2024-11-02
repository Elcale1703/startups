import { auth, signIn, signOut } from "@/auth"
import Image from "next/image"
import Link from "next/link"
import { BsGoogle } from "react-icons/bs"
import { BsGithub } from "react-icons/bs"

const Navbar = async () => {

    const session = await auth()

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logojmb.png" alt="logo" width={144} height={30} />
                </Link>
                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>
                            <form action={async () => {
                                "use server";

                                await signOut({ redirectTo: "/" });
                            }}>
                                <button type="submit">Logout</button>
                            </form>
                            <Link href={`/user/${session?.user?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <form action={async () => {
                                "use server";
                                await signIn('github');
                            }}>
                                <button className="flex items-center gap-2" type="submit"><BsGithub />Login</button>
                            </form>
                            <form action={async () => {
                                "use server";
                                await signIn('google');
                            }}>
                                <button className="flex items-center gap-2" type="submit"><BsGoogle />Login</button>
                            </form>
                        </>
                    )}
                </div>
            </nav>
        </header >
    )
}

export default Navbar