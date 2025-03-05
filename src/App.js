import './App.css';

import { useAppKitProvider, useAppKitAccount, useAppKit, createAppKit } from "@reown/appkit/react";
import { BrowserProvider, Contract, formatUnits } from 'ethers'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { arbitrum, mainnet } from '@reown/appkit/networks'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyCe7tE6jZ7ZzHvIHmKZByduRcnx37hvEAA",
  authDomain: "test-57176.firebaseapp.com",
  projectId: "test-57176",
  storageBucket: "test-57176.firebasestorage.app",
  messagingSenderId: "367875080602",
  appId: "1:367875080602:web:01f87fc8245b775d7dba23",
  measurementId: "G-YPM651KG5L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

// 1. Get projectId
const projectId = 'ca3fafe653ae963bcfe5c31c1fc8795d'

// 2. Set the networks
const networks = [arbitrum, mainnet]

// 3. Create a metadata object - optional
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'http://localhost:3000/', // origin must match your domain & subdomain
  url: 'https://web3-wallet-connect-react.vercel.app/', // origin must match your domain & subdomain
  // icons: ['https://img.icons8.com/?size=100&id=43967&format=png&color=000000']
}

// 4. Create a AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

const App = () => {

  const { open } = useAppKit()
  const { address, isConnected, caipAddress, status, embeddedWalletInfo } = useAppKitAccount()

  const save = async(address) =>{
    await addDoc(collection(firestore, "addresses"), {
      address: address
    });

    // alert(`Data saved successfully! Document ID: ${address}`);
  }

  useEffect(()=>{
    const run = async() =>{
      save(address);
    }

    if(isConnected){
      run()
    }
  }, [isConnected])

  return (
    <div className="App">
      <div style={{marginTop:"150px"}}>
        <button onClick={() => open('Connect')}>{isConnected ? "Show wallet":"Connect"}</button>
      </div>
    </div>
  )
}

export default App;
