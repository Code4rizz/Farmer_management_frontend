import './App.css';
import Header from './shared/header';
import ViewFarmer from "./farmer/viewFarmer";
import Login from "./auth/login";
import Signup from "./auth/signup";
import Home from "./shared/Home";
import CreateApplication from './farmer/create_application';
import PrivateRoute from './util/privateroute';
import MyApplications from './farmer/myapplication';
import UpdatePlace from './farmer/updateplace';
import ViewApplication from './inspector/viewapplication';
import InspectApplication from './inspector/inspectapplication';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckApplication from './inspector/checkapplication';
import ViewInspectedApplication from './certifier/viewinspectedapplication';
import CertifyApplication from './certifier/certifyapplication';
import ViewApplications from './farmer/viewplaces';
function App() {
  console.log("API URL:", process.env.REACT_APP_API_URL);
  return(
    <Router>

   <Header/>
   <Routes>
    <Route path="/home" element={<Home/>}/>
    <Route path="/farmers" element={<ViewFarmer/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/create_application" element={<PrivateRoute allowedrole={["Farmer"]}><CreateApplication/></PrivateRoute>}/>
    <Route path="/my_application" element={<PrivateRoute allowedrole={["Farmer"]}><MyApplications/></PrivateRoute>}/>
    <Route path="edit_application/:id" element={<PrivateRoute allowedrole={["Farmer"]}><UpdatePlace/></PrivateRoute>}/>
    <Route path="View_pending_application" element={<PrivateRoute allowedrole={["Inspector"]}><ViewApplication/></PrivateRoute>}/>
    <Route path="inspectorcheck/:id" element={<PrivateRoute allowedrole={["Inspector"]}><InspectApplication/></PrivateRoute>}/>
    <Route path="inspector_search" element={<PrivateRoute allowedrole={["Inspector"]}><CheckApplication/></PrivateRoute>}/>
    <Route path='View_inspected_application' element={<PrivateRoute allowedrole={["Certifier"]}><ViewInspectedApplication/></PrivateRoute>}/>
    <Route path='certifiercheck/:id' element={<PrivateRoute allowedrole={["Certifier"]}><CertifyApplication/></PrivateRoute>}/>
    <Route path='/farmer_places/:farmeremail' element={<ViewApplications/>}/>
   </Routes>
    </Router>
  );
}

export default App;
