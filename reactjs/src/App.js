import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import ThemeRoutesLogout from "./routes/RouterLogout";

const App = () => {
  // const routing = useRoutes(Themeroutes);

  // return <div className="dark">{routing}</div>;

  const auth = localStorage.getItem('user')
// //   const PrivateComp = () => {
// //     const auth = localStorage.getItem('user');
// //     return auth ? <div className="dark">{routing}</div> : <div className="dark">{routingLogout}</div>;
  
// // }
  const routing = useRoutes(Themeroutes);
  const routingLogout = useRoutes(ThemeRoutesLogout);

 


return auth ? <div className="dark">{routing}</div> : <div className="dark">{routingLogout}</div>;
   
};

export default App;
