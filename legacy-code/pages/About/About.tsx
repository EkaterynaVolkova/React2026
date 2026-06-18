import './About.css';

export const About = () => {
  return (
    <div className="about__container">
      <h1 className="title">About</h1>
      <h2 className="subtitle">Author Info</h2>
      <div className="info">
        <p>
          <strong>Developer:</strong> Ekaterina Volkova
        </p>
        <p>
          <strong>Role:</strong> Frontend Developer
        </p>
        <p>
          <strong>GitHub:</strong>
          <a
            href="https://github.com/EkaterynaVolkova"
            target="_blank"
            rel="noopener noreferrer"
            className="button about-link"
          >
            @EkaterynaVolkova
          </a>
        </p>
      </div>

      <div className="course-info">
        <p className="desc">Built as part of the education program:</p>
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className="button about-link"
        >
          RS School React Course
        </a>
      </div>
    </div>
  );
};
