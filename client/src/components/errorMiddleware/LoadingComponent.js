import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingComponent = () => {
    return(
        <div className="Loading text-center">
            <Spinner animation="border" variant="primary" />
        </div>
    );
}

export default LoadingComponent;