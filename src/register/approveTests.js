import React from "react";

const ApproveTests = ({ prevStep, handleChange, handleSubmit, values }) => {
  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  let studiesList = values.studiesList;
  //########################################################
  /*  */

  //############################################################
  return (
    <div>
      <p>Ich nehme an folgenden Testungen teil (Zutreffendes bitte ankreuzen):</p>
      <table>
        <tbody>
          <tr>
            <td>
              <label>Kategorie</label>
            </td>
            <td></td>
            <td></td>
            <td>
              <label>Nein/Ja</label>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                {studiesList.map((option) => (
                  <a name={option.ID} key={option.ID}>
                    {option.title} <br></br>
                  </a>
                ))}
              </div>
            </td>
            <td></td>
            <td></td>
            <td>
              <div>
                {studiesList.map((option) => (
                  <a name={option.ID} key={option.ID}>
                    <div className="form-check form-switch">
                      <input
                        name="switchId"
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={option.ID}
                        defaultValue={values.switchId}
                        defaultChecked={values.isToggleOn}
                        onChange={handleChange("switchId")}
                      />
                      <label className="form-check-label"> </label>
                    </div>
                  </a>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p></p>
<div>
      <p>Weitere Daten (bitte angeben): </p>

      <div className="form-group">
          <label>Gewicht (in kg)</label>
          <input
            type="number"
            className="form-control"
            placeholder="weight"
            name="weight"
            defaultValue={values.weight}
            onChange={handleChange('weight')}
          />
        </div>
      <div className="form-group">
          <label>Körpergröße (in cm)</label>
          <input
            type="number"
            className="form-control"
            placeholder="height"
            name="height"
            defaultValue={values.height}
            onChange={handleChange('height')}
          />
        </div>
      <div className="form-group">
          <label>Armspannweite (in cm)</label>
          <input
            type="number"
            className="form-control"
            placeholder="armSpan"
            name="armSpan"
            defaultValue={values.armSpan}
            onChange={handleChange('armSpan')}
          />
        </div>
      <div className="form-group">
          <label>Reichhöhe im Stehen (in cm)</label>
          <input
            type="number"
            className="heightSpanStand"
            placeholder="heightSpanStand"
            name="heightSpanStand"
            defaultValue={values.heightSpanStand}
            onChange={handleChange('heightSpanStand')}
          />
        </div>
      <div className="form-group">
          <label>Reichhöhe im Sitzen (in cm)</label>
          <input
            type="number"
            className="heightSpanSit"
            placeholder="heightSpanSit"
            name="heightSpanSit"
            defaultValue={values.heightSpanSit}
            onChange={handleChange('heightSpanSit')}
          />
        </div>
      <div className="form-group">
          <label>Kniehöhe (in cm)</label>
          <input
            type="number"
            className="heightKnee"
            placeholder="heightKnee"
            name="heightKnee"
            defaultValue={values.heightKnee}
            onChange={handleChange('heightKnee')}
          />
        </div>
      <div className="form-group">
          <label>Sitzhöhe (in cm)</label>
          <input
            type="number"
            className="heightSit"
            placeholder="heightSit"
            name="heightSit"
            defaultValue={values.heightSit}
            onChange={handleChange('heightSit')}
          />
        </div>
        </div>

      <p></p>
      <div className="form-group">
        <label htmlFor="checkid">
          <input
            name="readTerms"
            type="checkbox"
            defaultValue={values.readTerms}
            onChange={handleChange('readTerms')}
          />{" "}
          I have read and accept the privacy policy and the terms of data
          storage and usage
        </label>
      </div>
      <div className="form-group" hidden={!values.showParentAccept}>
        <label htmlFor="checkid">
          <input
            name="parentAccept"
            type="checkbox"
            defaultValue={values.parentAccept}
            onChange={handleChange('parentAccept')}
          />{" "}
          I confirm to have parental consent to register in this web page
        </label>
      </div>
     
      <button
        type="button"
        className="btn btn-primary btn-block m-2"
        onClick={Previous}
      >
        Back
      </button>
      <button
        type="button"
        className="btn btn-primary btn-block m-2"
        onClick={handleSubmit}
      >
        Sign Up
      </button>
    </div>
  );
};

export default ApproveTests;
