import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {endpoint} from '@config/api';
import {UserContextType} from './ContextTypes';

export const UserContext = createContext<Partial<UserContextType>>({});
export default function Context(props: PropsWithChildren<any>) {
  const [user, setUser] = useState<any>(undefined);
  const [databaseFetchError, setDatabaseFetchError] = useState(false);
  // helpful for when we dont want to get the user until a process is finished, like in the register screen.
  const [overrideGet, setOverrideGet] = useState(false);

  const getUser = (authUser: FirebaseAuthTypes.User) => {
    const uid = authUser.uid;
    authUser.getIdToken().then((token: string) => {
      axios
        .get(`${endpoint}/user/${uid}`, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(res => {
          // check for response if its empty by finding id ?
          if (res.data.id) {
            setUser(res.data);
            setDatabaseFetchError(false);
          } else {
            console.error('No response from database getting user');
            setUser(null);
            setDatabaseFetchError(true);
          }
        })
        .catch(error => {
          console.log('ERROR: ', JSON.stringify(error));
          setUser(null);
          setDatabaseFetchError(true);
          // maybe get some state for the specific error being returned from server
        });
    });
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authUser => {
      if (authUser && !overrideGet) {
        console.log('Getting user');
        getUser(authUser);
      } else {
        setUser(null);
      }
    });

    return subscriber; // unsubscribe on unmount
  }, [overrideGet]);

  return (
    <UserContext.Provider
      value={{user, setOverrideGet, databaseFetchError, getUser}}>
      {props.children}
    </UserContext.Provider>
  );
}

export const useGetUser = () => useContext(UserContext);
