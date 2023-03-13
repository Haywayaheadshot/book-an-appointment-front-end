// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { getDoctors } from '../redux/landingPage/LandingPage';
// import '../styles/landing-page.css';
// import Details from './Details';

// function LandingPage() {
//   const doctor = useSelector((state) => state.doctors);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const username = searchParams.get('username');
//   const [showModal, setShowModal] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const body = document.getElementById('body');

//   useEffect(() => {
//     dispatch(getDoctors());
//   }, [dispatch]);

//   if (!username) {
//     navigate('/');
//   }

//   const handleShowDetails = (doctor) => {
//     setSelectedDoctor(doctor);
//     setShowModal(true);
//     body.classList.add('open');
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     body.classList.remove('open');
//   };

//   return (
//     <div className="doctors-container flex flex-col md:mx-28 md:gap-10 gap-5 md:pl-48 px-5">
//       <h1 className="mt-20">
//         Welcome,
//         <span className="lg:text-2xl text-lg">
//           {username}
//         </span>
//       </h1>
//       <div className="w-full grid gap-4 xl:grid-cols-2">
//         {doctor && doctor.map((doctor) => (
//           <button type="button" onClick={() => handleShowDetails(doctor)} key={doctor.name}>
//             <section className="doctor-section flex flex-col items-center gap-5 lg:flex-row bg-[#CBE4DE] p-10 lg:p-14 rounded-xl overflow-auto">
//               <div className="flex-col justify-center items-center">
//                 <img src={doctor.photo} alt="Portrait Of Doc" className="h-40 w-25 rounded-xl mb-5" />
//                 <h1 className="lg:text-2xl text-lg font-bold">
//                   {doctor.name}
//                 </h1>
//               </div>
//               <div>
//                 <h2 className="lg:text-3xl text-xl pb-16">
//                   {doctor.specialty}
//                 </h2>
//                 <div className="doctor-age-xperience-div lg:text-2xl text-lg">
//                   <h4>
//                     Age:
//                     <span className="age-xperience-span mr-16">{doctor.age}</span>
//                     years
//                   </h4>
//                   <h4>
//                     Experience:
//                     <span className="age-xperience-span mr-16">{doctor.years_of_experience}</span>
//                     years
//                   </h4>
//                 </div>
//               </div>
//             </section>
//           </button>
//         ))}
//       </div>
//       { showModal && (
//         <div className="fixed inset-0 flex justify-center items-center backdrop-blur">
//           <div className="modal-content flex bg-[#CBE4DE] mx-8 md:mx-12 lg:mx-20 my-12 border rounded-lg px-10 py-12 overflow-auto h-[80%] border-black">
//             <Details doctor={selectedDoctor} closeModal={handleCloseModal} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LandingPage;
