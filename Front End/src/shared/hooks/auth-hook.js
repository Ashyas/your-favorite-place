import { useState, useEffect, useCallback} from "react";

let logoutTimer;

export const useAuth = () => {
    
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState();
    const [expirationDateState, setExpirationDateState] = useState();
    
    
  
    const login = useCallback((uid, token, expirationDte) => {
      setToken(token);
      setUserId(uid);
      const tokenExpiration = expirationDte || new Date(new Date.getTime() + 1000 * 60 * 60);
      setExpirationDateState(tokenExpiration);
      localStorage.setItem(
        "userData", 
        JSON.stringify({
          userId: uid,
          token: token,
          expiration: tokenExpiration.toISOString()
        })
      );
    }, []);
  
    const logout = useCallback(() => {
      setToken(null);
      setUserId(null);
      setExpirationDateState(null);
      localStorage.removeItem("userData");
    }, []);
  
  
    useEffect(() => {
      if(token && expirationDateState) {
        const timeLeft = expirationDateState.getTime() - new Date().getTime();
        logoutTimer = setTimeout(logout, timeLeft);
      } else {
        clearTimeout(logoutTimer);
      }
      }, [token, logout, expirationDateState]
    );
  
  
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem("userData"));
      if(storedData && storedData.token && new Date(storedData.expiration) > new Date() ) {
        login(storedData.userId, storedData.token, new Date(storedData.expiration));
      }
      }, [login]
    );
    return { token, login, logout, userId};
}