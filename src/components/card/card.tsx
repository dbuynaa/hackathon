import React, { FC } from 'react';

interface CardProps {
  title: string;
  content: string;
}

const Card: FC<CardProps> = ({ title, content }) => (
  <div className="card">
    <section>
      <header>
        <h3>{title}</h3>
      </header>
      <p>{content}</p>
      <footer>
        <ul className="buttons">
          <li><a href="#" className="button small">Learn More</a></li>
        </ul>
      </footer>
    </section>
  </div>
);

export default Card;
