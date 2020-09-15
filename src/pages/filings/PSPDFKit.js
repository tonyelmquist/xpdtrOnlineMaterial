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

    const downloadButton = {
      type: "custom",
      id: "download-pdf",
      icon: "/download.svg",
      title: "Download",
      onPress: () => {
        this._instance.exportPDF().then((buffer) => {
          const blob = new Blob([buffer], { type: "application/pdf" });
          const fileName = "document.pdf";
          if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, fileName);
          } else {
            const objectUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = objectUrl;
            a.style = "display: none";
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(objectUrl);
            document.body.removeChild(a);
          }
        });
      },
    };

    const items = PSPDFKitWeb.defaultToolbarItems;
    // Add the download button to the toolbar.
    items.push(downloadButton);


    console.log(props.id)

    if (props.content) {
      this._instance = await PSPDFKitWeb.load({
        pdf: props.pdfUrl,
        instantJSON: JSON.parse(props.content),
        container: this._container,
        licenseKey: props.licenseKey,
        baseUrl: props.baseUrl,
        printMode: PSPDFKitWeb.PrintMode.EXPORT_PDF,
        toolbarItems: items,
      });
    } else {
      this._instance = await PSPDFKitWeb.load({
        pdf: props.pdfUrl,
        container: this._container,
        licenseKey: props.licenseKey,
        baseUrl: props.baseUrl,
        printMode: PSPDFKitWeb.PrintMode.EXPORT_PDF,
        toolbarItems: items,
      });
    }

    /*     instance.getFormFields().then(function (formFields) {
      const updates = props.content;
      // Update the value of all text form fields.
      var updatedFormFieldValues = {};
      formFields.forEach(function (formField) {
        updatedFormFieldValues[formField.name] = updates[formField.name];
      });
      instance.setFormFieldValues(updatedFormFieldValues);
    }); */
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
    this._instance.exportInstantJSON().then((instantJSON) => {
      const theContent = JSON.stringify(instantJSON);
      this.props.saveFiling(theContent, this.props.id);
    });
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