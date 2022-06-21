import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { sumBy, sortBy } from 'lodash';
import client from '../api/client';
import { StateEconomyResult } from '../types';
export default function StateEconomySearch() {
  const [qname, setQName] = useState<string>('');
  const [employment, setEmployment] = useState(false);
  const [production, setProduction] = useState(false);
  const [trade, setTrade] = useState(false);

  const [states, setStates] = useState<StateEconomyResult[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQName(event.target.value);
  };

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await client.query<{
      states: StateEconomyResult[];
    }>({
      query: gql`
        query Query {
          states(name: null) {
            name
            ${
              production
                ? `      productionSummary {
                productionTypeByDollars {
                  name
                  amount
                }
                productionTypeByTons {
                  amount
                  name
                }
              }`
                : ''
            }
      
            ${
              employment
                ? `         employmentSummary {
                    topIndustryByAverageSalary {
                      averageSalary
                      industry
                    }
                    topIndustryByEmployee {
                      employedCount
                      industry
                    }
                  }`
                : ''
            }
   ${
     trade
       ? `
   tradeSummary {
     totalDollarAmount
     totalTons
     statesByDollars {
       amount
       name
     }
     statesByTons {
       amount
       name
     }
   }`
       : ''
   }
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
        <div>
          <input type='checkbox' checked={employment} onChange={() => setEmployment(!employment)} />
          Employment
          <input type='checkbox' checked={production} onChange={() => setProduction(!production)} />
          Production
          <input type='checkbox' checked={trade} onChange={() => setTrade(!trade)} />
          Trade
        </div>
      </div>
      <h4>State List</h4>
      <div className='state-search-table'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Dolar Amount</th>
              <th>Total Tons</th>
              <th>Top 5 State in terms of dollars</th>
              <th>Top 5 State in terms of tons</th>
              <th>Top 5 industries by dollars</th>
              <th>Top 5 industries by tons</th>
              <th>Top Industry</th>
            </tr>
          </thead>
          <tbody>
            {states.map((state, index) => {
              return (
                <tr key={index}>
                  <td>{state.name}</td>
                  <td>{state.tradeSummary?.totalDollarAmount}</td>
                  <td>{state.tradeSummary?.totalTons}</td>
                  <td>
                    {state.tradeSummary &&
                      sortBy(state.tradeSummary.statesByDollars, ['amount'])
                        .slice(0, 5)
                        .map((item, index) => (
                          <div key={index}>
                            {item.name}: {item.amount}
                          </div>
                        ))}
                  </td>
                  <td>
                    {state.tradeSummary &&
                      sortBy(state.tradeSummary.statesByTons, ['amount'])
                        .slice(0, 5)
                        .map((item, index) => (
                          <div key={index}>
                            {item.name}: {item.amount}
                          </div>
                        ))}
                  </td>
                  <td>
                    {state.productionSummary &&
                      sortBy(state.productionSummary.productionTypeByDollars, ['amount'])
                        .slice(0, 5)
                        .map((item, index) => (
                          <div key={index}>
                            {item.name}: {item.amount}
                          </div>
                        ))}
                  </td>
                  <td>
                    {state.productionSummary &&
                      sortBy(state.productionSummary.productionTypeByTons, ['amount'])
                        .slice(0, 5)
                        .map((item, index) => (
                          <div key={index}>
                            {item.name}: {item.amount}
                          </div>
                        ))}
                  </td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
