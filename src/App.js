import Submit from './components/Submit/Submit';
import ThankYouPage from './components/ThankYouPage';
import Main from './components/Main/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PersonalInfoMain from './components/Form/PersonalInfo/PerosnalInfoMain';
import SkillsMain from './components/Form/Skills/SkillsMain';
import CovidMain from './components/Form/Covid/CovidMain';
import InsightsMain from './components/Form/Insights/InsightsMain';
import { useContext } from 'react';
import {
  SkillsProvider,
  PersonalInfoProvider,
  CovidPageProvider,
  InsightsProvider,
} from './store/formContext';
import { SwitcherProvider } from './store/switchPageContext';
import { CollectInfoProvider } from './store/collectInfoContext';
import { SubmitContext } from './store/submitContext';

function App() {
  const submitCtx = useContext(SubmitContext);

  return (
    <div className="App">
      <InsightsProvider>
        <CovidPageProvider>
          <SkillsProvider>
            <PersonalInfoProvider>
              <SwitcherProvider>
                <CollectInfoProvider>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Main />}></Route>
                      <Route
                        path="/personal"
                        element={<PersonalInfoMain />}
                      ></Route>
                      <Route path="/skills" element={<SkillsMain />} />
                      <Route path="/covid" element={<CovidMain />} />
                      <Route path="/insights" element={<InsightsMain />} />
                      <Route path="/submit" element={<Submit />} />

                      {!submitCtx.isMainPath ? (
                        <Route
                          path="/thank-you"
                          element={<ThankYouPage />}
                        ></Route>
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
                </CollectInfoProvider>
              </SwitcherProvider>
            </PersonalInfoProvider>
          </SkillsProvider>
        </CovidPageProvider>
      </InsightsProvider>
    </div>
  );
}

export default App;
