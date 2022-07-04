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
      <h3>Approve Studies</h3>
      <table>
        <tbody>
          <tr>
            <td>
              <label>Study</label>
            </td>
            <td></td>
            <td></td>
            <td>
              <label>disallow/allow</label>
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
                  <a name={option.ID} key={option.ID} >
                    <div className="form-check form-switch">
                      <input
                        name="switchId"
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={option.ID}
                        defaultValue={values.switchId}
                        defaultChecked={true}
                        
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
