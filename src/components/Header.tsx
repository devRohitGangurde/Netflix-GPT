import { signOut } from "firebase/auth";
import { LOGO } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";


const Header: React.FC = () => {
  const navigate = useNavigate();

  const user = useSelector((store) => store);
  const data: any = user;

  // alert(JSON.stringify(user))
  console.log(data?.user?.email)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {data?.user?.email && (
        <div className="flex p-2 justify-between">
           <img
            className="hidden md:block w-12 h-12"
            alt="usericon"
            src={data?.user?.photoURL}
          />
          <button onClick={handleSignOut} className="font-bol`₹d text-white ">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  )
}

export default Header;
