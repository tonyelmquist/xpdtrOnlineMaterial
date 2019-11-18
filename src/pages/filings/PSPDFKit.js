import React, { Component } from "react";
import PSPDFKitWeb from "pspdfkit";

export default class PSPDFKit extends Component {
  constructor(props, context) {
    super(props, context);
    this._instance = null;
    this._container = null;

    this.onRef = this.onRef.bind(this);
    this.load = this.load.bind(this);
    this.unload = this.unload.bind(this);
    this.saveTheThings = this.saveTheThings.bind(this);
  }

  onRef(container) {
    this._container = container;
  }

  async load(props) {
    console.log(`Loading ${props.pdfUrl}`);

    this._instance = await PSPDFKitWeb.load({
      pdf: props.pdfUrl,
      container: this._container,
      licenseKey: props.licenseKey,
      baseUrl: props.baseUrl,
      printMode: PSPDFKitWeb.PrintMode.EXPORT_PDF
    });

    var instance = this._instance;

    console.log("Successfully mounted PSPDFKit", this._instance);
    instance.getFormFields().then(function(formFields) {
      const updates = props.content;
      // Update the value of all text form fields.
      var updatedFormFieldValues = {};
      formFields.forEach(function(formField) {
        updatedFormFieldValues[formField.name] = updates[formField.name];
      });
      instance.setFormFieldValues(updatedFormFieldValues);
    });
  }

  unload() {
    PSPDFKitWeb.unload(this._instance || this._container);
    this._instance = null;
  }

  componentDidMount() {
    this.load(this.props);
  }

  componentDidUpdate(prevProps) {
    const nextProps = this.props;
    // We only want to reload the document when the pdfUrl prop changes.
    if (nextProps.pdfUrl !== prevProps.pdfUrl) {
      this.unload();
      this.load(nextProps);
    }
    if (nextProps.saveForm === true) {
      this.saveTheThings();
    }
  }

  componentWillUnmount() {
    this.unload();
  }

  saveTheThings = () => {
    const theThings = this._instance.getFormFieldValues();
    const theSignatures = this._instance.getInkSignatures();

JSON.stringify(
  theSignatures
    .map(signature => PSPDFKit.Annotations.toSerializableObject(signature))
    .toJS(),
);
    // Update the value of all text form fields.
    console.log("saving")
    this.props.saveFiling(theThings);
  };

  render() {
    return (
      <>
        <div
          ref={this.onRef}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            marginTop: "67px",
          }}
        />
      </>
    );
  }
}
