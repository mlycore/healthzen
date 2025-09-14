
import React from 'react';

const iconProps = {
  className: "h-6 w-6",
  fill: "currentColor",
};

export const DashboardIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  </svg>
);

export const VitalsIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const MedicationIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v3m0 0v3m0-3h3m-3 0H3.75M6.75 21v-3m0 0v-3m0 3h3m-3 0H3.75m12.75-3h3m-3 0h-3m3 0v-3m0 3v3M3.75 12h16.5M12 3.75h3.75v3h-3.75z" />
    </svg>
);

export const SymptomCheckerIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

export const HealthTipsIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.34 0 .68-.02 1.01-.07C13.02 21.98 13 22 13 22h-2v-2.03c-3.26-.75-5.63-3.6-5.96-6.97H3.01v-2h2.03c.32-3.37 2.7-6.22 5.96-6.97V4h2v2.03c.53.11 1.04.28 1.53.51l-1.63 1.63C12.44 8.02 12.22 8 12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4c.22 0 .44-.02.66-.05l1.63 1.63c-.49.23-1,.4-1.53.51V20h2v-2.03c.53-.11 1.04-.28 1.53-.51L12.07 16H12c-2.21 0-4-1.79-4-4s1.79-4 4-4c.99 0 1.88.36 2.6.95L16.05 7.5A7.94 7.94 0 0 0 12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8c.34 0 .67-.02 1-.05v.05c0 .69.1 1.36.29 2H12z"/>
  </svg>
);

export const PlusIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);
