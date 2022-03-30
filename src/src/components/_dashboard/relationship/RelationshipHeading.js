// material
import { Card } from '@mui/material';
//
import useRelationship from '../../../hooks/useRelationship';
import { RelationshipCover } from '.';

// ----------------------------------------------------------------------

export default function RelationshipHeading() {
  const { relationship } = useRelationship();

  if (!relationship) return <></>;

  return (
    <Card
      sx={{
        mb: 3,
        height: 180,
        position: 'relative'
      }}
    >
      <RelationshipCover relationship={relationship} />
    </Card>
  );
}
