import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { sumBy, sortBy } from 'lodash';
import axios from 'axios';
import client from '../api/client';
import { InterstateTrade as InterstateTradeType, State } from '../types';

const loadInterstateTrade = async (state: State): Promise<InterstateTradeType> => {
  const trade: Partial<InterstateTradeType> = {};
  const response: any = await axios.get(`https://datausa.io/api/data?Origin%20State=${state.key}&measure=Millions%20Of%20Dollars,Thousands%20Of%20Tons&drilldowns=Destination%20State&year=latest`);

  trade.state = state;
  trade.totalDollars = sumBy(response.data.data, (item: any) => item['Millions Of Dollars']);
  trade.totalTons = sumBy(response.data.data, (item: any) => item['Thousands Of Tons']);
  trade.top5InTermsOfDollars = sortBy(response.data.data, ['Millions Of Dollars']).slice(0, 5);
  trade.top5InTermsOfTons = sortBy(response.data.data, ['Thousands Of Tons']).slice(0, 5);

  return trade as InterstateTradeType;
};

export default function InterstateTrade() {
  const [qname, setQName] = useState('');
  const [trades, setTrades] = useState<InterstateTradeType[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQName(event.target.value);
  };

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const {
      data: { states },
    } = await client.query({
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

    Promise.all(states.map((state: State) => loadInterstateTrade(state))).then((trades) => setTrades(trades));
  };

  const handleClear = () => {
    setTrades([]);
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
              <th>Name</th>
              <th>Total Dollar Amount</th>
              <th>Toal Tons</th>
              <th>Top 5 States in terms of dollars</th>
              <th>Top 5 States in terms of tons</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade, index) => {
              return (
                <tr key={index}>
                  <td>{trade.state.name}</td>
                  <td>{trade.totalDollars}</td>
                  <td>{trade.totalTons}</td>
                  <td>
                    {trade.top5InTermsOfDollars.map((item, index) => (
                      <div key={index}>
                        {item['Destination State']}: {item['Millions Of Dollars']}
                      </div>
                    ))}
                  </td>
                  <td>
                    {trade.top5InTermsOfTons.map((item, index) => (
                      <div key={index}>
                        {item['Destination State']}: {item['Thousands Of Tons']}
                      </div>
                    ))}
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
