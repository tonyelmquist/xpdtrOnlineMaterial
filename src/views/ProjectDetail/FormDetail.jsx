import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Button, Segment, Container, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";
import axios from "axios";
import PSPDFKit from "pspdfkit";
import { compose } from 'redux'
import { withFirebase, isLoaded, isEmpty, firebaseConnect } from "react-redux-firebase";

class FormDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount = () => {
    PSPDFKit.load({
      container: "#pdfTarget",
      pdf: "/static/pdf/l2.pdf",
      licenseKey:
        "rXG9hlOFZQGNFzHRawfA0PvMNuCJYhKtY5OGQ1XXJ3_7gXao4xgFNWsFVj5J9IN66v3BPCiMgvC2uofjkWQMUO5JhV8XXMRBYO9pirl1TBgHYt3VNQR2rkG9bRJzAZAM6FbxOxUNyFBPVG_8sZbNiXida2gCRQ5lJb5nkw7eqUr_GYvFUGlDLsSYkKeJznsAY_ltl19b7f6JRsfiBL6-cWU4oEH6en7M4W6rue4z0W9c8raSIreUKv5RFDOiBDa43U1gAjrvJzEqOjTY7mHa262FK1bRKbtNZEXrm_LuH8ZZGPLTOLgG6B-r5AvU0SeHXzKdHGdX6KTtuoUiVKmv-c7y1PEEv-kfSrlhkE_TRGBD9SO1kmCSEV7oA_UVUqz-v7LDs2Kmn7sPZaxz9on7bIudg5zNpg5dZ3h91E09ZLvE5rkdNX3NyV9OvbAyIox0"
    })
      .then(instance => {
        console.log("PSPDFKit loaded", instance);
        this.instance = instance;

        console.log(this.props)

  
          const updatedFormFieldValues = JSON.parse(this.props.form.formData)

/*         instance.getFormFields().then(function(formFields) {
          // Update the value of all text form fields
          var updatedFormFieldValues = {};
          formFields.forEach(function(formField) {
            console.log(formField.name);
            if (formField instanceof PSPDFKit.FormFields.TextFormField) {
              updatedFormFieldValues[formField.name] = "New Value";
            }
            updatedFormFieldValues["borough"] = "Brooklyn";
          }); */
          instance.setFormFieldValues(updatedFormFieldValues);
        })
 
      .catch(error => {
        console.error(error.message);
      });
  };

  saveForm = () => {
    console.log(PSPDFKit);
    console.log(this.instance.getFormFieldValues());
    this.props.firebase.update("/forms/" + this.props.match.params.formId, {
      formData: JSON.stringify(this.instance.getFormFieldValues())
    });
  };

  render() {
    const w = window.innerWidth - 150;
    const h = window.innerHeight - 60;

    return (
      <React.Fragment>
        <div
          id="pdfTarget"
          className="pdf-target"
          style={{ width: w, height: h, marginTop: "60px" }}
        />
        <Button primary onClick={this.saveForm} className="saveButton">Save form</Button>
        <Button onClick={this.backForm} className="backButton">Back</Button>
      </React.Fragment>
    );
  }
}

FormDetail.propTypes = {
  firebase: PropTypes.shape({
    update: PropTypes.func.isRequired
  })
};


export default compose(
  firebaseConnect((props) => [
 { path: `/forms/${props.match.params.formId}`}
  ]),
  connect((state, props) => ({
    form: state.firebase.data.forms[props.match.params.formId]
  }))
)(FormDetail)
