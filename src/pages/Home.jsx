import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const medalImages = [
  "/images/Padma/padma_vibhushan.png",
  "/images/Padma/padma_bhushan.png",
  "/images/Padma/padma_shri.png",
];

function Home() {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % medalImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-text">
          <h1>Padma Prerna</h1>

          <p>
            Celebrating the inspiring lives of Padma Award winners who have
            contributed greatly to India through art, public service, science,
            literature, medicine, education, sports, and social work.
          </p>

          <button onClick={() => navigate("/awardees")}>
            Explore Awardees
          </button>
        </div>

        {/* Sliding Medal Images */}
        <div className="hero-medal">
          <img
            key={currentImage}
            src={medalImages[currentImage]}
            alt="Padma Award Medal"
            className="sliding-medal"
          />
        </div>
      </section>

      <section className="intro-section">
        <h2>About Padma Awards</h2>
        <p>
          The Padma Awards are among India’s highest civilian honours. They are
          given to people who have made exceptional contributions in different
          fields and inspired society through dedication, service, and
          excellence.
        </p>
      </section>

      <section className="award-section vibhushan">
        <div className="award-image">
          <img src="/images/Padma/padma_vibhushan.png" alt="Padma Vibhushan" />
        </div>

        <div className="award-content">
          <h2>Padma Vibhushan</h2>
          <h3>For exceptional and distinguished service</h3>
          <p>
            Padma Vibhushan is the second-highest civilian award of India. It is
            awarded for extraordinary service in any field, including public
            affairs, art, literature, science, medicine, and social service.
          </p>
        </div>
      </section>

      <section className="award-section bhushan">
        <div className="award-content">
          <h2>Padma Bhushan</h2>
          <h3>For distinguished service of high order</h3>
          <p>
            Padma Bhushan recognizes individuals who have shown outstanding
            contribution and excellence in their respective fields. It honours
            people whose work has made a strong national impact.
          </p>
        </div>

        <div className="award-image">
          <img src="/images/Padma/padma_bhushan.png" alt="Padma Bhushan" />
        </div>
      </section>

      <section className="award-section shri">
        <div className="award-image">
          <img src="/images/Padma/padma_shri.png" alt="Padma Shri" />
        </div>

        <div className="award-content">
          <h2>Padma Shri</h2>
          <h3>For distinguished service</h3>
          <p>
            Padma Shri is awarded to people who have made meaningful
            contributions to society. It honours grassroots heroes, innovators,
            artists, teachers, doctors, social workers, and achievers from all
            parts of India.
          </p>
        </div>
      </section>

      <section className="closing-section">
        <h2>Inspiration Behind Padma Prerna</h2>
        <p>
          Padma Prerna is more than just a website it is a tribute to the
          extraordinary individuals whose dedication, courage, and service have
          shaped the story of India. Every Padma Award recipient represents a
          journey of perseverance, excellence, and selfless contribution to
          society. Through this platform, we aim to preserve and celebrate their
          inspiring stories, making them accessible to students, researchers,
          professionals, and every citizen who seeks motivation from real-life
          heroes. From artists and scientists to social reformers, educators,
          doctors, sports persons, and visionaries, these awardees embody the
          spirit of a nation striving for greatness. As you explore this
          website, we hope you discover not only the achievements of these
          remarkable individuals but also the values they represent hard work,
          humility, innovation, compassion, and an unwavering commitment to the
          betterment of society. The colors of this platform gold, maroon,
          bronze, saffron, and ivory have been carefully chosen to reflect the
          dignity, heritage, and prestige of India's Padma Awards. Each page is
          designed to honor the legacy of those who have inspired generations
          and to encourage future generations to dream, serve, and achieve. May
          these stories remind us that true greatness is not measured by fame or
          recognition, but by the positive impact we leave on the lives of
          others and on the nation we proudly call home.
        </p>
      </section>
    </div>
  );
}

export default Home;
