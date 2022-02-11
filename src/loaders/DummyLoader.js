import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function DummyLoader() {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
}
