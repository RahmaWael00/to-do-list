import React from 'react';


export default function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
) {
  const { label, ...rest } = props;
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && <label style={{ display: 'block', marginBottom: '4px' }}>{label}</label>}
      <input {...rest} style={{ padding: '0.4rem 0.6rem', width: '100%' }} />
    </div>
  );
}
