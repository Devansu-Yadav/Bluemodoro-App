import "./LandingPageContent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const LandingPageContent = () => {
  return (
    <main className="main-container">
      {/* Hero Section */}
      <section className="hero flex-row-container">
        <div className="hero-left">
          <div className="hero-info space-S flex-col-container">
            <h1 className="hero-heading-small">STAY FOCUSSED, </h1>
            <h1 className="hero-heading-small">TRACK YOUR TIME, </h1>
            <h1 className="hero-heading-small">ACCOMPLISH YOUR TASKS <span>BETTER</span> </h1>
            <p className="hero-content">
                Bluemodoro helps you manage your tasks with a pomodoro timer
                to ensure you stay focussed & finish your goals like never before! 🚀
            </p>
            <div className="hero-info-btns centered-flex-row-container">
              <Link to="/tasks">
                <button className="btn cta-btn btn-primary rounded-med space-S">
                  CHECKOUT TASKS
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-right centered-flex-row-container">
          <img src="/assets/images/pomodoro-hero.svg" alt="Pomodoro Hero Image" />
        </div>
      </section>
    </main>
  );
};

export { LandingPageContent };
