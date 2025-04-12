import './App.css';
import PortfolioGrid from './components/PortfolioGrid';
import AboutCard from './components/AboutCard';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div className="App">
      <header className="hero">
        <div className="overlay">
          <h1>Filipp Ruskih</h1>
          <p>Model | Creative | Visionary</p>
          <a href="#portfolio" className="cta-button">View Portfolio</a>
        </div>
      </header>

      <main>
        <PortfolioGrid />
        <AboutCard />
        <ContactForm />
      </main>
    </div>
  );
}

export default App;
