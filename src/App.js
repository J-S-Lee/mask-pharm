import React from 'react';
import { RenderAfterNavermapsLoaded } from 'react-naver-maps';
import Map from './Map';

const API_KEY = `${process.env.REACT_APP_API_KEY_MAP}`;
function App() {
  return (
    <div>
      <RenderAfterNavermapsLoaded
        ncpClientId={API_KEY}
        error={<p>Maps Load Fail</p>}
        loading={<p>Maps Loading...</p>}
      >
        <Map />
      </RenderAfterNavermapsLoaded>
    </div>
  );
}

export default App;
