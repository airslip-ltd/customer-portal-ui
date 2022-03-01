import { useContext } from 'react';
import { MemberContext } from '../contexts/MemberContext';

// ----------------------------------------------------------------------

const useMemberDetails = () => useContext(MemberContext);

export default useMemberDetails;
