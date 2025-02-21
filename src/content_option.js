import profileImg from './assets/images/Farhan.jpeg';
import porto from './assets/images/porto.png';
import web_bdg from './assets/images/web_bdg.png';


const logotext = "haaanlyf.";
const meta = {

    title: "haaanlyf.",
    description: "I’m Farhan Fadholy junior front-end devloper",
};

const introdata = {
    title: "I’m Farhan Fadholy",
    animated: {
        first: "I love coding",
        second: "I code cool websites",
        third: "Everyday Coding",
    },
    description: "Junior Front-End Developer",
    your_img_url:profileImg,
};

const dataabout = {
    title: "a bit about my self",
    aboutme: "Hello! I'm Farhan Fadholy, a Junior Front-End Developer passionate about minimalistic design. I'm studying Computer Science at Universitas Teknologi Digital Indonesia, focusing on React, Bootstrap, and exploring Flutter. ",
};

// const worktimeline = [{
//         jobtitle: "Designer of week",
//         where: "YAdfi",
//         date: "2020",
//     },
//     {
//         jobtitle: "Designer of week",
//         where: "Jamalya",
//         date: "2019",
//     },
//     {
//         jobtitle: "Designer of week",
//         where: "ALquds",
//         date: "2019",
//     },
// ];

const skills = [
    {
        name: "Html",
        value: 90,
    },
    {
        name: "Css",
        value: 85,
    },
    {
        name: "Bootstrap",
        value: 45,
    },
    {
        name: "Javascript",
        value: 50,
    },
    {
        name: "React",
        value: 50,
    },
    {
        name: "Java",
        value: 85,
    },
    {
        name: "Flutter",
        value: 15,
    },
];

// const services = [{
//         title: "UI & UX Design",
//         // description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisl euismod urna bibendum sollicitudin.",
//     },
//     {
//         title: "Mobile Apps",
//         // description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisl euismod urna bibendum sollicitudin.",
//     },
//     {
//         title: "Personal Portofolio",
//         // description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisl euismod urna bibendum sollicitudin.",
//     },
// ];

const dataportfolio = [{
        img : porto,
        description: "My Portfolio",
        link: "https://haanlyf-portofolio.vercel.app/", 
    },
    {
        img : web_bdg,
        description: "Blog Sederhan Bandung",
        link: "https://blog-sederhana-bdg.vercel.app/", 
    }
];

const contactConfig = {
    YOUR_EMAIL: "farhanfadholy870@gmail.com",
    YOUR_FONE: "+62 821 9522 0763",
    // description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula eu nunc et sollicitudin. Cras pulvinar, nisi at imperdiet pharetra. ",
    // creat an emailjs.com account 
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: "service_id",
    YOUR_TEMPLATE_ID: "template_id",
    YOUR_USER_ID: "user_id",
};

const socialprofils = {
    github: "https://github.com/FarhanFadholy",
    linkedin: "https://www.linkedin.com/in/farhan-fadholy-5bb8ab295/",
};
export {
    meta,
    dataabout,
    dataportfolio,
    // worktimeline,
    skills,
    // services,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
};