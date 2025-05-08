import React from 'react';
import PatientInfoModal from './modals/PatientInfoModal';

const App: React.FC = () => {
  return (
    <div>
      <PatientInfoModal isOpen={true} />
    </div>
  );
};

export default App;
