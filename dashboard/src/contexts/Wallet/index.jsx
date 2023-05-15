/* eslint-disable */
import React, { useEffect, useState } from 'react';

import { BLOCKSPACERACE_PARAMS } from '../../config/networks';

const defaultWalletContext = {
  ready: false,
  installed: false,
  connected: false,
  wallet: null,
};

export const WalletContext = React.createContext(defaultWalletContext);

export const useWallet = () => React.useContext(WalletContext);

const isWalletInstalled = () => !!window.keplr;

const MAX_RETRY = 10;

const config = {
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'celestia',
    bech32PrefixAccPub: 'celestia' + 'pub',
    bech32PrefixValAddr: 'celestia' + 'valoper',
    bech32PrefixValPub: 'celestia' + 'valoperpub',
    bech32PrefixConsAddr: 'celestia' + 'valcons',
    bech32PrefixConsPub: 'celestia' + 'valconspub',
  },
  currencies: [ 
    { 
      coinDenom: 'TIA', 
      coinMinimalDenom: 'utia', 
      coinDecimals: 6, 
      coinGeckoId: 'celestia', 
    }, 
  ],
  feeCurrencies: [
    {
      coinDenom: 'TIA',
      coinMinimalDenom: 'utia',
      coinDecimals: 6,
      coinGeckoId: 'celestia',
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: 'TIA',
    coinMinimalDenom: 'utia',
    coinDecimals: 6,
    coinGeckoId: 'celestia',
  },
};

const connect = async (network) => {
  const chainId = network.chainId;
  try {
    await window.keplr.experimentalSuggestChain({
      chainId, 
      chainName: network.chainName,
      rpc: network.rpc,
      rest: network.rest,
      ...config
    }) 
  } catch {
    console.log('Fail to suggest the chain.');
  }
  await window.keplr.enable(chainId);
}

export const WalletProvider = ({ children }) => { 
  const [ready, setReady] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [network, setNetwork] = useState(BLOCKSPACERACE_PARAMS);

  let interval;
  let counter = 0;

  useEffect(() => {
    interval = setInterval(() => {
      if (isWalletInstalled()) {
        setReady(true);
        setInstalled(true);
        clearInterval(interval);
      }
      if (++counter === MAX_RETRY) {
        setReady(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const connectWallet = async () => {
    connect(network);
    const offlineSigner = window.getOfflineSigner(network.chainId);
    const accounts = await offlineSigner.getAccounts();

    setWallet({
      offlineSigner,
      accounts,
    });
    setConnected(true);
  };

  const changeNetwork = async (network) => {
    await connect(network);
    const offlineSigner = window.getOfflineSigner(network.chainId);
    const accounts = await offlineSigner.getAccounts();

    setWallet({
      offlineSigner,
      accounts,
    });
    setConnected(true);

    setNetwork(network);
  };

  return <WalletContext.Provider value={{
    ready,
    installed,
    connected,
    wallet,
    network,
    connectWallet,
    changeNetwork,
  }}>
    { children }
  </WalletContext.Provider>
};