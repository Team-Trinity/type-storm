

const getCurrentYear = (): number => {
    return new Date().getFullYear();
}

const Footer = () => {
    return (
        <footer>
            <div className='text-center text-xs'>
                <p>&copy; {getCurrentYear()} Key Storm | Developed by Team Trinity</p>
            </div>
        </footer>
    );
};

export default Footer;