// Dependencies
import React, { Fragment, useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GolbalContext';

// Components
import FormAppsIframe from '../components/FormAppsIframe';

const MonitoringList = ({ data, brand, subsidiary }) => {
  // Context
  const { editTitle } = useContext(GlobalContext);

  const [hasLoaded, setHasLoaded] = useState();
  const [showMonitoring, setShowMonitoring] = useState(true); // Show list of monitoring to select (true) or show selected monitoring (false)
  const [listOfMonitorings, setListOfMonitorings] = useState();
  const [selectedMonitoring, setSelectedMonitoring] = useState();

  // Funtion to filter monitorings by subsidiary and brand
  useEffect(() => {
    filterSubsidiaries(data, brand, subsidiary);
    setHasLoaded(true);
  }, [subsidiary]);

  // Show selected MonitoringList
  function showSelectedMonitoring(monitoring) {
    // console.log('monitoring: ', monitoring);
    setSelectedMonitoring(monitoring);
    monitoring ? setShowMonitoring(false) : setShowMonitoring(true);
    // Edit Title
    monitoring
      ? editTitle(monitoring.monitoring.title)
      : editTitle('Sucursales');
  }

  // Filter data by brand and subsidiary
  function filterSubsidiaries(data, brand, subsidiary) {
    let result = [];
    data.map((monitoring) => {
      if (
        monitoring.brand.name === brand &&
        monitoring.subsidiary === subsidiary
      ) {
        result.push(monitoring);
      }
    });
    setListOfMonitorings(result);
  }
  // console.log('listOfMonitorings: ', listOfMonitorings);

  return hasLoaded ? (
    <Fragment>
      {/* Show list of monitoring to select */}
      {showMonitoring &&
        listOfMonitorings.map(
          (monitoring, key) =>
            monitoring && (
              <div
                className="w-full btn-outlet"
                key={key}
                onClick={() => showSelectedMonitoring(monitoring)}
              >
                {monitoring.monitoring.title}
              </div>
            )
        )}
      {/* Show Selected Monitoring */}
      {!showMonitoring && (
        <div
          className="w-full btn-selected"
          onClick={() => showSelectedMonitoring()}
        >
          {selectedMonitoring.monitoring.title}
        </div>
      )}

      {/* Flow 4: Load form app iframe. */}
      {!showMonitoring && (
        <div className="h-full min-h-full w-full p-2 border border-gray-300 shadow-lg bg-white rounded-2xl">
          <FormAppsIframe
            FormAppLink={selectedMonitoring.monitoring.FormAppLink}
          />
        </div>
      )}
    </Fragment>
  ) : (
    <Fragment>
      <p className="text-white">Loading...</p>
    </Fragment>
  );
};

export default MonitoringList;
