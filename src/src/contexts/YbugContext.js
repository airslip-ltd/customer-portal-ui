import PropTypes from 'prop-types';
import { createContext } from 'react';
import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

const initialState = {};

const YbugContext = createContext({
  ...initialState
});

YbugProvider.propTypes = {
  children: PropTypes.node
};

function YbugProvider({ children }) {
  window.ybug_settings = { id: process.env.REACT_APP_YBUG_ID };

  return (
    <YbugContext.Provider value={{}}>
      <Helmet
        script={[
          {
            type: 'text/javascript',
            async: true,
            src: `https://widget.ybug.io/button/${window.ybug_settings.id}.js`
          }
        ]}
      />
      {children}
    </YbugContext.Provider>
  );
}

export { YbugProvider, YbugContext };
