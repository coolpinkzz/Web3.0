import './App.css'
import { Footer, Navbar, Service, Transaction, Welcome } from './components'
import { TransactionProvider } from './context/TransactionContract';

function App() {
  
  return (
    <TransactionProvider>
      <div className="App">
        <div className="gradient-bg-welcome">
          <div className="container">
            <Navbar />
            <Welcome />
          </div>
        </div>

        {/* <Service /> */}
        <Transaction />
        {/* <Footer /> */}
      </div>
    </TransactionProvider>
  );
}

export default App
