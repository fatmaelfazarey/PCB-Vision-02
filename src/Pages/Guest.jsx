import { assets } from '../assets/assets';
import HeaderWithSignBtns from '../Components/HeaderWithSignBtns';
import Footer from '../Components/Landing Page/Footer';
import { AppContext } from '../Context/AppContext';
import UploadPCB from '../Components/Main Component/UploadPCB';
const Guest = () => {

    return (
        <div className='min-h-screen flex flex-col pl-2.5 pr-2.5 '>
            <HeaderWithSignBtns />
            <div className=" ">
                <UploadPCB isGuest={true} />
            </div>
            <Footer />
        </div>
    )

}

export default Guest
