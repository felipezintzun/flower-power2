import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/mutations.js';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries.js';
import "./thoughtForm.css";

const ThoughtForm = () => {

const [thoughtText, setText] = useState('');
const [characterCount, setCharacterCount] = useState(0);

const handleChange = event => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
  
    try {
      // add thought to database
      await addThought({
        variables: { thoughtText }
      });
  
      // clear form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      try {
        // could potentially not exist yet, so wrap in a try...catch
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [addThought, ...thoughts] }
        });
      } catch (e) {
        console.error(e);
      }
  
      // update me object's cache, appending new thought to the end of the array
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, thoughts: [...me.thoughts, addThought] } }
      });
    }
  });

  return (
    
    <div className="thought-box">

    
        <form
            className="thought-form"
            onSubmit={handleFormSubmit}
        >

      <textarea
        className="thought-text"
        placeholder="Here's a new thought..."
        value={thoughtText}
        onChange={handleChange}
        ></textarea>

        <div className="reaction-submit">

        <button className="submit-btn" type="submit">
          Submit
        </button>
     

        <p className={`character-text ${characterCount === 280 || error ? 'text-error' : ''}`}>
            Character Count: {characterCount}/280
            {error && <span className="ml-2">Something went wrong...</span>}
        </p>

        </div>
        
      </form>

    </div>
  );
};

export default ThoughtForm;