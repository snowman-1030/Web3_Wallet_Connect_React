import './App.css';

import { useAppKitProvider, useAppKitAccount, useAppKit, createAppKit } from "@reown/appkit/react";
import { BrowserProvider, Contract, formatUnits } from 'ethers'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { arbitrum, mainnet } from '@reown/appkit/networks'

// 1. Get projectId
const projectId = 'ca3fafe653ae963bcfe5c31c1fc8795d'

// 2. Set the networks
const networks = [arbitrum, mainnet]

// 3. Create a metadata object - optional
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://web3-wallet-connect-react.vercel.app/', // origin must match your domain & subdomain
  icons: ['https://img.icons8.com/?size=100&id=43967&format=png&color=000000']
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

  return (
    <div className="App">
      <div style={{marginTop:"150px"}}>
        <button onClick={() => open()}>Open Connect Modal</button>
        {/* <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button> */}
      </div>
    </div>
  )
}

export default App;
