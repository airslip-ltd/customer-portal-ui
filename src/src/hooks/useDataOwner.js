import { useContext } from 'react';
import { OwnedViewContext } from '../contexts/OwnedViewContext';

// ----------------------------------------------------------------------

const useDataOwner = () => useContext(OwnedViewContext);

export default useDataOwner;
