import React, { useEffect } from 'react';
import useStore from './Store';
import { StoreState } from './Store';

const IndexPage = () => {
  const nekoData = useStore((state: StoreState) => state.nekoData);
  const fetchNeko = useStore((state: StoreState) => state.fetchNeko);

  useEffect(() => {
    fetchNeko();
  }, [fetchNeko]);

  return (
    <div className="container"> 
      <h1>Neko Data</h1>
      <table className="table">
        <thead>
          <tr>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {nekoData.map((neko: any, index: number) => ( 
            <tr key={index}>
              <td className="imageContainer">
                <div className="image">
                  <img src={neko.url} alt={`Neko ${index}`} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndexPage;
