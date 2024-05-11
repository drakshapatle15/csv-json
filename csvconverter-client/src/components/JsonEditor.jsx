// JsonEditor.js
import React from 'react';

const JsonEditor = ({ jsonData }) => {
  return (
    <div className="my-4 border border-gray-400 p-4">
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
}

export default JsonEditor;
