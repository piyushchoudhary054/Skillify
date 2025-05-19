import React from 'react';

function Learn() {
  return (
    <div style={{ height: '90vh', border: '1px solid #ccc' }}>
      <iframe
        src="https://example.com"
        title="Embedded Project"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />
    </div>
  );
}

export default Learn;