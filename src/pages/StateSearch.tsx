import React, { useState } from 'react';
import { gql } from '@apollo/client';
import client from '../api/client';
import { State } from '../types';

const getPopulationLink = (key: string) => {
  return `https://datausa.io/api/data?Geography=${key}&Nativity=2&measure=Total%20Population,Total%20Population%20MOE%20Appx&drilldowns=Birthplace&properties=Country%20Code`;
};

export default function StateSearch() {
  const [qname, setQName] = useState('');
  const [states, setStates] = useState<State[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQName(event.target.value);
  };

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await client.query({
      query: gql`
            query Query {
                states(name: "${qname}") {
                    id
                    key
                    slug
                    name
                }
            }
        `,
    });

    setStates(response.data.states);
  };

  const handleClear = () => {
    setStates([]);
    setQName('');
  };

  return (
    <div className='state-search-container'>
      <div className='state-search-filter'>
        <span>Search for a state</span>
        <input type='text' name='qname' value={qname} onChange={handleInputChange} />
        <button type='button' onClick={handleSearch}>
          Search
        </button>
        <button type='button' onClick={handleClear}>
          Clear
        </button>
      </div>
      <h4>State List</h4>
      <div className='state-search-table'>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Key</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Example API Endpoint</th>
            </tr>
          </thead>
          <tbody>
            {states.map((state, index) => {
              return (
                <tr key={index}>
                  <td>{state.id}</td>
                  <td>{state.key}</td>
                  <td>{state.name}</td>
                  <td>{state.slug}</td>
                  <td>
                    <a href={getPopulationLink(state.key)} target='_blank'>
                      Population Example
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
