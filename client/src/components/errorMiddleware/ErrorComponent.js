import React from 'react';
import {Alert} from "react-bootstrap";

const ErrorComponent = ({children}) => {
  return (
    <div>
        <Alert variant="danger">
            {children}
        </Alert>
    </div>
  )
}

export default ErrorComponent;
