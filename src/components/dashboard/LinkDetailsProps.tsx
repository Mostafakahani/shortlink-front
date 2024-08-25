'use client';
import React from 'react';

type BrowserData = { name: string; count: number };
type IPData = { ip: string; count: number };

interface LinkDetailsProps {
  originalUrl: string;
  shortCode: string;
  totalVisits: number;
  browsers: BrowserData[];
  topIPs: IPData[];
}

export default function LinkDetails({
  originalUrl,
  shortCode,
  totalVisits,
  browsers,
  topIPs,
}: LinkDetailsProps) {
  return (
    <div>
      <h1>Link Details</h1>
      <p>
        <strong>Original URL:</strong>{' '}
        <a href={originalUrl}>{originalUrl}</a>
      </p>
      <p>
        <strong>Short Code:</strong> {shortCode}
      </p>
      <p>
        <strong>Total Visits:</strong> {totalVisits}
      </p>

      {totalVisits === 0 ? (
        <p>No visits have been recorded yet.</p>
      ) : (
        <>
          <h2>Browsers Used</h2>
          {browsers.length > 0 ? (
            <ul>
              {browsers.map((browser) => (
                <li key={browser.name}>
                  {browser.name}: {browser.count} visits
                </li>
              ))}
            </ul>
          ) : (
            <p>No browser data available.</p>
          )}

          <h2>Top IP Addresses</h2>
          {topIPs.length > 0 ? (
            <ul>
              {topIPs.map((ip) => (
                <li key={ip.ip}>
                  {ip.ip}: {ip.count} visits
                </li>
              ))}
            </ul>
          ) : (
            <p>No IP data available.</p>
          )}
        </>
      )}
    </div>
  );
}
