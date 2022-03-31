import { useContext } from 'react';
import { SetupContext } from '../contexts/SetupContext';

// ----------------------------------------------------------------------

const useSetup = () => useContext(SetupContext);

export default useSetup;
