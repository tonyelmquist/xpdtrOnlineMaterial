import React, { useEffect, useRef } from "react";
import {
  PdfViewerComponent,
  Toolbar,
  Magnification,
  Navigation,
  LinkAnnotation,
  BookmarkView,
  ThumbnailView,
  Print,
  TextSelection,
  Annotation,
  TextSearch,
  FormFields,
  Inject,
} from "@syncfusion/ej2-react-pdfviewer";

const PSPDFKIT = (props) => {
  const containerRef = useRef(null);

  // Import annotation that are exported as object.

  /*   useEffect(() => {
    // fill in form
    if (props.annotations){
      const parsedAnnotations = JSON.parse(props.annotations)
      importAnnotation(parsedAnnotations);
    }    
 
    })([]); */

  const isLoaded = () => {
    console.log("is loaded");
    if (props.annotations) {
      console.log(props.annotations)
      importAnnotation(props.annotations);
    }
    if (props.content) {
      console.log(props.content);
      importFormFields(props.content);
    }
  };

  function importAnnotation(exportObject) {
    var viewer = document.getElementById("container").ej2_instances[0];
    viewer.importAnnotation(JSON.parse(exportObject));
  }

  function importFormFields(exportObject) {
    var viewer = document.getElementById("container").ej2_instances[0];
    viewer.importFormFields(JSON.parse(exportObject));
  }

  console.log(props);

  return (
    <PdfViewerComponent
      id="container"
      documentPath={props.pdfUrl}
      serviceUrl="https://xpdtr.azurewebsites.net/api/pdfviewer"
      style={{ height: "100vh" }}
      toolbarSettings={{
        toolbarItems: [
          "PageNavigationTool",
          "MagnificationTool",
          "PanTool",
          "SelectionTool",
          "SearchOption",
          "PrintOption",
          "DownloadOption",
          "UndoRedoTool",
          "AnnotationEditTool",
        ],
      }}
      documentLoad={isLoaded}
    >
      <Inject
        services={[
          Toolbar,
          Magnification,
          Navigation,
          Annotation,
          LinkAnnotation,
          BookmarkView,
          ThumbnailView,
          Print,
          TextSelection,
          TextSearch,
          FormFields,
        ]}
      />
    </PdfViewerComponent>
  );
};

export default PSPDFKIT;
