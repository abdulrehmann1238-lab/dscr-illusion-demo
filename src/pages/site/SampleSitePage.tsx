import React from 'react';
import { DeviceFrame } from '../../components/site/DeviceFrame';
import { RidgelineSite } from '../../components/site/RidgelineSite';

export const SampleSitePage: React.FC = () => {
  return (
    <DeviceFrame siteName="Ridgeline Plumbing & Heating" siteDomain="ridgelineplumbing.ca">
      <RidgelineSite />
    </DeviceFrame>
  );
};
