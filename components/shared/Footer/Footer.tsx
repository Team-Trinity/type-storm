import Link from "next/link";


const getCurrentYear = (): number => {
    return new Date().getFullYear();
}

const Footer = () => {

    return (
        <footer>
            <div className='text-center text-xs my-5'>
                <p>&copy; {getCurrentYear()} Key Storm | Developed by <Link href="https://github.com/Team-Trinity" target="_blank">Team Trinity</Link></p>
            </div>
        </footer>
    );
};

export default Footer;