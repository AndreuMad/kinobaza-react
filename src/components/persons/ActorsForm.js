import React from 'react';
import { func } from 'prop-types';

import RenderInputField from 'Components/formComponents/InputField';

const ActorsForm = ({ handleQueryChange }) => (
  <div className="actors-filter-wrap">
    <form>
      <div className="filter-item">
        <RenderInputField
          type="text"
          name="name"
          placeholder="Ім'я"
          onFieldChange={handleQueryChange}
        />
      </div>
    </form>
  </div>
);

ActorsForm.propTypes = {
  handleQueryChange: func.isRequired
};

export default ActorsForm;
