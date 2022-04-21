import React from 'react';
import { Link } from 'react-router-dom';
import "./thoughtList.css";

const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>Start Some Flower Talk</h3>;
  }

  return (
    <div>

      <div className="thoughtlist">

      <h3 className="fl-tlk-title">{title}</h3>
      {thoughts &&
        thoughts.map(thought => (

          
          <div key={thought._id} className="thought-card">

          <div className="thought-date">

          <p className="thought-header">

              <div className="thought-body">
                  <Link to={`/thought/${thought._id}`}>
                    <p className="thought-body">{thought.thoughtText}</p>
                    <p className="reaction-body">
                      Reactions: {thought.reactionCount} || Click to{' '}
                      {thought.reactionCount ? 'see' : 'start'} Flower Talk
                    </p>
                  </Link>
                </div>
                
              <Link className="thought-user"
                to={`/profile/${thought.username}`}
                style={{ fontWeight: 700 }}
                className="thought-user"
              >
                {thought.username}
              
              </Link>
              <div className="thought-date">{' '}
              posted {thought.createdAt}
              </div>
            </p>

            </div>

        
          
          </div>
          
        ))}

      </div>
    </div>
  );
};

export default ThoughtList;