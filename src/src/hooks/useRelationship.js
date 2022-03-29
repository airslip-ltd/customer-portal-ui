import { useContext } from 'react';
import { RelationshipContext } from '../contexts/RelationshipContext';

// ----------------------------------------------------------------------

const useRelationship = () => useContext(RelationshipContext);

export default useRelationship;
