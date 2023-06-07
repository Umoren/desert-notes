// App.js
import Header from './components/Header';
import NoteEditor from './components/NoteEditor';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-2xl mx-auto p-4">
        <NoteEditor />
      </div>
    </div>
  );
}

export default App;
