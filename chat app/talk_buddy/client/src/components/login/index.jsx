import { useState, useEffect } from "react";
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";

const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();

  const handleLogin = () => {
    triggerLogin({ username, password });
  };

  const handleRegister = () => {
    triggerSignUp({ username, password });
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      setUser(username);
      setSecret(password);
    }
  }, [resultLogin.data]); // eslint-disable-line

  return (
    <div className="login-page">
      <div className="login-container">
      <img src="/src/components/login/LOGO_TALK_BUDDY.png" style={
        {borderRadius:"50px",
        border:"2px solid",
        marginLeft:"20px",
        //marginRight:"80px"
      }
      }/>
        <h2 className="title"></h2>
        

        <div>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p
          className="register-change"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "EXISTING USER?" : "NEW USER?"}
        </p>
        <div className="login-actions">
          {isRegister ? (
            <button type="button" onClick={handleRegister} style=
            {{backgroundColor:"transparent", 
            padding:"10px",
            border:"1px solid",
            borderRadius:"10px",
            color:"#fff8e6",
            fontSize:"15px"}}>
              Register
            </button>
          ) : (
            <button type="button" onClick={handleLogin} style=
            {{backgroundColor:"transparent", 
            padding:"10px",
            border:"2px solid",
            borderRadius:"10px",
            color:"#fff8e6",
            fontSize:"15px"}}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
