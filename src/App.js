import { Provider } from 'react-redux';
import Body from './components/Body';
import appStore from './utils/appStore';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={appStore}>
      <Body />
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        pauseOnHover
        theme="dark" 
      />
    </Provider>
  );
}

export default App;

