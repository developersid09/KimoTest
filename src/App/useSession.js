import {useContext} from 'react';
import {AppContext} from './AppContext';

const useSession = () => {
  const {session, setSession} = useContext(AppContext);
  return {session, setSession};
};

export default useSession;
