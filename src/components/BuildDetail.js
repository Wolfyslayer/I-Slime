import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BuildDetail({ builds }) {
  const { id } = useParams();
  const build = builds[id];

  if (!build) {
    return (
      <div>
        <p>Build hittades inte.</p>
        <Link to="/">Tillbaka till listan</Link>
      </div>
    );
  }

  return (
    <div className="build-detail">
      <h2>{build.name}</h2>
      <p><b>Class:</b> {build.class}</p>
      <p><b>Evolution:</b> {build.evolution}</p>
      <p><b>Stats:</b></p>
      <ul>
        {Object.entries(build.stats).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
      <Link to="/">Tillbaka till listan</Link>
    </div>
  );
}
