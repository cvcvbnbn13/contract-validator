import { MainPage } from './pages';
import { useValidator } from './context/validatorProvider';

function App() {
  const { inputValue } = useValidator();

  if (
    inputValue.NFTAddress !== '' ||
    inputValue.TokenID !== '' ||
    inputValue.Network !== ''
  )
    window.onbeforeunload = function (e) {
      const dialogText = '等一下啦';
      e.returnValue = dialogText;
      return dialogText;
    };

  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
