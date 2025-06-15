import not_found from './404 Error-cuate.png';
import about from './about.png';
import add_user from './add user.png';
import pcb_response from './Asset 1.png';
import atOffice from './At the office-amico.png';
import back_arrow from './back-arrow.png';
import camera from './camera.png';
import component from './component.png';
import logo from './logo.png';
import mode from './mode.png';
import not_access from './not-access.png';
import home from './Printed circuit board-bro.png';
import home2 from './Printed circuit board-rafiki.png';
import Sent_Message from './Sent Message-bro.png';
import user_icon from './user icon.png';
import meeting from './Meeting-5.png';
import sign from './logn-big-2 1.png';
import eye from './eye.png';
import view from './view.png';
import empty from './empty.png';
import cancel from './cancle.png';
import pcb2 from './pcb2.jpg';
import pcb from './pcb3.jpg';
import notfound from './Oops! 404 Error .png';

export const assets = {
    not_found,
    about,
    add_user,
    pcb_response,
    atOffice,
    back_arrow,
    camera,
    component,
    sign,
    logo,
    mode,
    not_access,
    home,
    home2,
    Sent_Message,
    user_icon,
    meeting,
    eye,
    view,
    empty,
    cancel,
    pcb,
    pcb2,
    notfound

};

export const NavBar = [
    {
        text: 'Home',
        path: '#'
    }, {
        text: 'About',
        path: '#about'
    }, {
        text: 'Services',
        path: '#services'
    }, {
        text: 'Contact',
        path: '#contact'
    },
]


export const aboutDefects = {
    "Short": "Short circuits in PCBs occur when unintended connections form between conductive paths due to design errors, manufacturing defects, or contamination. These short circuits can cause device malfunctions. To handle them, ensure proper design practices, maintain cleanliness during manufacturing, and regularly inspect and test the boards for defects.",
    "Open Circuit": "An open circuit in a PCB occurs when there's a break in the electrical pathway, preventing current from flowing. This can be caused by design errors, manufacturing defects, or physical damage. To handle open circuits, ensure proper design practices, maintain cleanliness during manufacturing, and regularly inspect and test the boards for defects.",
    "Spur": "A spur in a PCB is a small, unintended conductive path that protrudes from a main trace. Spurs can cause signal integrity issues and potential short circuits. These are typically caused by design errors or imperfections during manufacturing. To handle spurs, ensure thorough design reviews, use reliable manufacturing processes, and perform regular inspections and testing to identify and correct any defects.",
    "Missing Hole": "A missing hole in a PCB occurs when the intended hole is not drilled during the manufacturing process. This can happen due to broken drill bits, interruptions during drilling, software errors, or incomplete data. To handle missing holes, ensure regular maintenance of drilling equipment, verify data accuracy, and conduct thorough inspections and testing of the boards for defects.",
    "Mouse Bite": "Mouse bite defects in PCBs, also known as breakaway tabs, are small perforations or slots along the edge of the board intended to facilitate easy separation of individual PCBs from a larger panel. These perforations can lead to rough edges or burrs. Proper design and manufacturing practices can help minimize these issues.",
    "Spurious Copper": "Spurious defects in PCBs refer to unintended and unexpected signals or noise that interfere with the normal operation of the circuit. These defects can be caused by design flaws, manufacturing imperfections, or external electromagnetic interference. To handle spurious defects, ensure robust design practices, use high-quality materials, and implement shielding or filtering techniques to reduce noise and interference.",
    "Spurious": "Spurious defects in PCBs refer to unintended and unexpected signals or noise that interfere with the normal operation of the circuit. These defects can be caused by design flaws, manufacturing imperfections, or external electromagnetic interference. To handle spurious defects, ensure robust design practices, use high-quality materials, and implement shielding or filtering techniques to reduce noise and interference."

}
export const componentsNameFormat = {
    "trans": "Transistor",
    "cap": "Capacitor",
    "res": "Resistor",
    "diode": "Diode",
    "ic": "Integrated Circuit",

    // Optional additional components:
    "ind": "Inductor",
    "led": "LED",
    "osc": "Oscillator",
    "xtal": "Crystal",
    "fuse": "Fuse"
};
export const GetCurrentDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return dateTime;
}
export const supervisor = [
    {
        imageURL: 'https://media.licdn.com/dms/image/v2/D4D03AQGatvOl6fItOQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1715116484913?e=1755129600&v=beta&t=yctna4hsbE37n5s4jM3OAPLC13koAIcfyjKBTQN6FM8',
        name: 'DR: Sayed Taha ',
        role: 'Team supervisor',
        links: {
            // #0077B7
            linkedin: 'https://www.linkedin.com/in/sayed-muhammed-42422035/',
            github: '',
            whatsapp: '',
            gmail: ''
        },
    },
]
export const Team_Members = [
    {
        imageURL: user_icon,
        name: 'Abd El-Rahman Ahmed',
        role: 'Machine Learning Engineer',
        links: {
            // #0077B7
            linkedin: 'https://www.linkedin.com/in/abd-el-rahman-ahmed-abdrabo/',
            github: '',
            whatsapp: '',
            gmail: ''
        },
    },
    {
        imageURL: user_icon,
        name: 'Abd El-Rahman Muhammed',
        role: 'Machine Learning Engineer',
        links: {
            // #0077B7
            linkedin: 'https://www.linkedin.com/in/sayed-muhammed-42422035/',
            github: '',
            whatsapp: '',
            gmail: ''
        },
    }, {
        imageURL: user_icon,
        name: 'Doha Ragab',
        role: 'Machine Learning Engineer',
        links: {
            // #0077B7
            linkedin: 'https://www.linkedin.com/in/doha-ragab-913a52276/',
            github: '',
            whatsapp: '',
            gmail: ''
        },
    }, {
        imageURL: user_icon,
        name: 'Ester Emad ',
        role: 'Back-end developer',
        links: {
            // #0077B7
            linkedin: 'https://www.linkedin.com/in/ester-emad-33a648220/',
            github: '',
            whatsapp: '',
            gmail: ''
        },
    }, {
        imageURL: user_icon,
        name: 'Fatma Muhammed',
        role: 'Front-end developer',
        links: {
            // #0077B7
            linkedin: 'https://www.linkedin.com/in/fatma-mohamed58/',
            github: '',
            whatsapp: '',
            gmail: ''
        },
    },
]