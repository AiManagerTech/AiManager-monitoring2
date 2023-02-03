// Dependence
import React, { Fragment } from 'react';

// Main function
const FormAppsIframe = ({ FormAppLink }) => {
  // JSX
  return (
    <Fragment>
      <iframe
        id=""
        allowtransparency="true"
        allowfullscreen="true"
        allow="geolocation; microphone; camera"
        src={`https://my.forms.app/form/${FormAppLink}?localData=true`}
        frameborder="0"
        style="width: 1px; min-width:100%; height:formHeight; border:none;"
        className="w-full h-full"
        width="100%"
        height="100%"
      >
        Cargando formulario…
      </iframe>
    </Fragment>
  );
};

export default FormAppsIframe;
