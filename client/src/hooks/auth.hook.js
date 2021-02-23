import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userMail, setUserMail] = useState(null);
  const [isUserAdmin, setIsUserAdmin] = useState(null);

  const login = useCallback((jwtToken, id, name, email, isAdmin) => {
    setToken(jwtToken);
    setUserId(id);
    setUserName(name);
    setUserMail(email);
    setIsUserAdmin(isAdmin);

    localStorage.setItem(storageName, JSON.stringify({
      userId: id,
      token: jwtToken,
      userName: name,
      userMail: email,
      isUserAdmin: isAdmin,
    }));
  }, []);


  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserName(null);
    setUserMail(null);
    setIsUserAdmin(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(
          data.token,
          data.userId,
          data.userName,
          data.userMail,
          data.isUserAdmin,
      );
    }
    setReady(true);
  }, [login]);


  return {login, logout, token, userId, userName, userMail, isUserAdmin, ready};
};
