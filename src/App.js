import Submit from './components/Submit/Submit';
import ThankYouPage from './components/ThankYouPage';
import Main from './components/Main/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PersonalInfoMain from './components/Form/PersonalInfo/PerosnalInfoMain';
import SkillsMain from './components/Form/Skills/SkillsMain';
import CovidMain from './components/Form/Covid/CovidMain';
import InsightsMain from './components/Form/Insights/InsightsMain';
import { useState, useEffect } from 'react';

function App() {
  const [isMainPath, setIsMainPath] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMainPath(true);
    }, 3000);
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/personal" element={<PersonalInfoMain />}></Route>
          <Route path="/skills" element={<SkillsMain />} />
          <Route path="/covid" element={<CovidMain />} />
          <Route path="/insights" element={<InsightsMain />} />
          <Route path="/submit" element={<Submit />} />

          {!isMainPath ? (
            <Route path="/thank-you" element={<ThankYouPage />}></Route>
          ) : (
            <Route path="/thank-you" element={<Main />} />
          )}

          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>not defined yet</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>{' '}
    </div>
  );
}

export default App;
