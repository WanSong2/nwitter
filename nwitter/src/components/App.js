import React, {useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import { authService } from "fbase";

function App() {

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // 이게 중요한 부분!!
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName : user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
      refreshUser();
    });
  }, [])


  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName : user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }


  return (
    <>
      {init ? <AppRouter 
                refreshUser={refreshUser} 
                isLoggedIn={isLoggedIn} 
                userObj={userObj} 
      /> : "초기화중..."}
    </>
  );
}

export default App;
