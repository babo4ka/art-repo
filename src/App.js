import Example from './components/Example'
import Minter from './components/Minter'
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="container-fluid app-holder">

        <div className="row justify-content-center">

          <Example num={1} className="item col-xl-3 col-lg-4 col-sm-12"></Example>

          <Minter className="item col-xl-6 col-lg-4 col-sm-12"></Minter>

          <Example num={2} className="item col-xl-3 col-lg-4 col-sm-12"></Example>

        </div>

        </div>
    </div>
  );
}

export default App;
