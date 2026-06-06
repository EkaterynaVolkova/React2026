export const ReactHookForm = () => {
  return (
    <form>
      <div className="form-field">
        <label htmlFor="u-name">Name:</label>
        <input id="u-name" type="text" />
      </div>
      <div className="form-field">
        <label htmlFor="u-age">Age:</label>
        <input type="number" id="u-age" name="age" />
      </div>
      <div className="form-field">
        <label htmlFor="u-email">Email:</label>
        <input type="email" id="u-email" name="email" />
      </div>
      <div className="form-field">
        <p>Gender:</p>
        <div>
          <input type="radio" id="u-gender-man" name="gender" value="man" />
          <label htmlFor="u-gender-man">Man</label>
        </div>
        <div>
          <input type="radio" id="u-gender-woman" name="gender" value="woman" />
          <label htmlFor="u-gender-woman">Woman</label>
        </div>
      </div>
      <div className="form-field">
        <input type="checkbox" id="u-terms" name="terms" />
        <label htmlFor="u-terms">Accept Terms & Conditions</label>
      </div>
      <input type="submit" value="Submit" className="button primary-btn" />
    </form>
  );
};
