import React, { useEffect, useRef } from "react";
import { Save } from "@material-ui/icons";

const PSPDFKIT = (props) => {
  const containerRef = useRef(null);

  const saveTheThings = (content) => {
    props.saveFiling(content, props.formId);
  };

  console.log(Save);

  useEffect(() => {
    const container = containerRef.current;
    let instance, PSPDFKit;
    (async function () {
      PSPDFKit = await import("pspdfkit");
      const downloadButton = {
        type: "custom",
        id: "save",
        icon: "/disk.svg",
        title: "Download",
        onPress: () => {
          instance.exportInstantJSON().then((instantJSON) => {
            const theContent = JSON.stringify(instantJSON);
            saveTheThings(theContent);
          });
        },
      };

      const items = PSPDFKit.defaultToolbarItems;
      // Add the download button to the toolbar.
      items.push(downloadButton);

      console.log(items);

      if (props.content) {
        instance = await PSPDFKit.load({
          // Container where PSPDFKit should be mounted.
          container,
          // The document to open.
          document: props.pdfUrl,
          printMode: PSPDFKit.PrintMode.EXPORT_PDF,
          toolbarItems: items,
          instantJSON: JSON.parse(props.content),
          electronicSignatures: {
            creationModes: [
              PSPDFKit.ElectronicSignatureCreationMode.IMAGE,
              PSPDFKit.ElectronicSignatureCreationMode.DRAW,
              PSPDFKit.ElectronicSignatureCreationMode.TYPE,
            ],
          },
          // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
          baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
        });
      } else {
        instance = await PSPDFKit.load({
          // Container where PSPDFKit should be mounted.
          container,
          // The document to open.
          document: props.pdfUrl,
          printMode: PSPDFKit.PrintMode.EXPORT_PDF,
          toolbarItems: items,
          electronicSignatures: {
            creationModes: [
              PSPDFKit.ElectronicSignatureCreationMode.IMAGE,
              PSPDFKit.ElectronicSignatureCreationMode.DRAW,
              PSPDFKit.ElectronicSignatureCreationMode.TYPE,
            ],
          },

          // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
          baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
        });
      }
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default PSPDFKIT;

/*   async load(props) {
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

/* unload() {
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
      this.props.saveFiling(theContent, this.props.formId);
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
}*/
