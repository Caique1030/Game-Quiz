import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Settings extends Component {
  render() {
    return (
      <div className="game-page">
        <h1 data-testid="settings-title">
          Settings:
        </h1>
        <label htmlFor="set-input-1">
          More difficult:
          <input type="checkbox" name="More difficult" id="set-input-1" />
        </label>
        <label htmlFor="set-input-2">
          Complex questions:
          <input type="checkbox" name="Complex questions: " id="set-input-2" />
        </label>
        <label htmlFor="set-input-3">
          I like mud puddles:
          <input type="checkbox" name="I like mud puddles" id="set-input-3" />
        </label>
        <div>
          <Link to="/">
            <button
              type="button"
            >
              Back
            </button>
          </Link>

        </div>
      </div>
    );
  }
}

export default Settings;
