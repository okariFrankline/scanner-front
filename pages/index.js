import Head from 'next/head'
import { useState } from 'react'
import { performGet } from './api/performGet';

export default function Home() {
  const [txHash, setTxHash] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getStatus = async () => {
    setLoading(true);
    
    setError('');
    setStatus('');

    const { success, errors, data } = await performGet('/transactions/status', { tx_hash: txHash });

    if (!success) {
      setError(errors);
      return setLoading(false);
    }
 
    setStatus(data.status);
    return setLoading(false);
  }


  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2 className="title">
          Enter ethereum transaction hash to find out it's status
        </h2>

        <div className='input-div'>
          <input
            value={txHash}
            readOnly={loading}
            onChange={(e) => setTxHash(e.target.value)}
          />

          <button 
            disabled={!txHash || loading}
            onClick={getStatus}
          >
            {
              loading ? 'Getting status ...' : 'Get status'
            }
          </button>
        </div>

        {
          !loading && status &&
          <div className='status-div'>
            <h2 className="status-text">
              The transaction is {status}
            </h2>
          </div>
          
        }

        {
          error &&
          <div className='status-div'>
            <h2 className="error-text">
              Error: { error }
            </h2>
          </div>
          
        }

        
        


      </main>

      <style jsx>{`
        .container {
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          margin-top: 15vh;
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .input-div {
          margin-top: 3rem;
          display: flex;
          flex-direction: column;
        }

        input {
          padding: 1rem 1rem;
          border-radius: 0.5rem;
          min-width: 31rem;
          border-width: thin;
          border-color: gray;
        }


        button {
          margin-top: 2.5rem;
          padding: .8rem; 0rem;
          border: none;
          border-radius: 0.5rem;
          background-color: #365289;
          font-weight: bold;
          color: white;
        }

        button:hover {
          cursor: pointer;
        }

        button:disabled {
          cursor: not-allowed;
        }

        .status-div {
          margin-top: 2.5rem;
          align-self: start;
        }

        .status-text {
          margin: 0;
          font-weight: bolder;
          line-height: 1.15;
          font-size: 1rem;
          color: #F9B47A;
        }

        .error-text {
          margin: 0;
          font-weight: bolder;
          line-height: 1.15;
          font-size: 1rem;
          color: red;
        }


        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 1rem;
          align-self: start;
          color: #365289;
        }


        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
