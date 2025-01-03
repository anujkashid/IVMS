import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homecomponent from './Components/Homecomponent';
import Login from './Components/Login';
import ForgetPasswordComponent from './Components/ForgotPassword';
import CollgeVisite from './Components/CollgeVisit';
import Feedback from './Components/Feedback';
import Profile from './Components/Profile';
import Notification from './Components/Notiication';
import Update_profile from './Components/Update_profile';
import College_registration from './Components/College_registration';
import TotalVisit from './Components/TotalVisits';
import PendingVisit from './Components/PendingVisits';
import RejectedVisit from './Components/RejectedVisit';
import Agenda from './Components/Agenda';
import PendingFee from './Components/PendingFee';
import CancelledVisit from './Components/CancelledVisit';
import UpdateProfile from './Components/Update_profile';
import Gallery from './Components/Gallery';
import CollegeTotalVisit from './Components/CollegeTotalVisit';
import Updatevisit from './Components/RescheduledVisit';
import RejectResceduled from './Components/RejectRescheduleVisit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/home" element={<Homecomponent/>} />
         <Route path="/" element={<Login/>} />
         <Route path="/forget" element={<ForgetPasswordComponent/>}/>
         <Route path="/addvisit" element={<CollgeVisite/>} />
         <Route path="/feedback" element={<Feedback/>} />
         <Route path="/profile" element={<Profile/>} />
         <Route path='/notifications' element={<Notification></Notification>}/>
         <Route path="/gallery" element={<Gallery></Gallery>}/>
         <Route path="/register" element={<College_registration/>}/>
         <Route path="/pendingfees" element={<PendingFee/>}/>
         <Route path="/agenda" element={<Agenda/>}/>
         <Route path="/totalvisit" element={<TotalVisit/>}/>
         <Route path="/pendingvisit" element={<PendingVisit/>}/>
         <Route path="/rejectedvisit" element={<RejectedVisit/>}/>
         <Route path="/visitcancelled" element={<CancelledVisit/>}/>
         <Route path='/update_profile' element={<UpdateProfile/>}/>
         <Route path='/collegetotalvisit' element={<CollegeTotalVisit/>}/>
         <Route path="/reschedulevisit" element={<Updatevisit/>}/>
         <Route path="/rejectrescedulevisit" element={<RejectResceduled/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
