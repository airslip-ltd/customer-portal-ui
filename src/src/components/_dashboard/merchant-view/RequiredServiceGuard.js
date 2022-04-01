import PropTypes from 'prop-types';
import UnlinkedCard from '../../_common/UnlinkedCard';
// hooks
import useDataOwner from '../../../hooks/useDataOwner';

// ----------------------------------------------------------------------

RequiredServiceGuard.propTypes = {
  requiredService: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default function RequiredServiceGuard({ requiredService, children, title }) {
  const { linkedServices } = useDataOwner();

  const enabled = linkedServices[requiredService] || false;

  if (!enabled) return <UnlinkedCard title={title} requiredService={requiredService} />;

  return <>{children}</>;
}
