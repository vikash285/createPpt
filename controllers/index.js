const fs = require("fs");
const asposeSlidesViaJava = require("aspose.slides.via.java");
const { log } = require("console");

const upload = (req, res) => {
  try {
    let path = req.file.path;
    let fileStream = fs.createReadStream(path);
    let pres;
    let preSize;
    const pptFilePath = "./NewPresentation.pptx";

    fs.access(pptFilePath, fs.constants.F_OK, (err) => {
      if (err) {
        pres = new asposeSlidesViaJava.Presentation();
      } else {
        pres = asposeSlidesViaJava.Presentation("NewPresentation.pptx");
        preSize = pres.getSlides().size();
        pres
          .getSlides()
          .addEmptySlide(pres.getLayoutSlides().get_Item(preSize - 1));
      }
    });

    asposeSlidesViaJava.readBytesFromStream(fileStream, function (imgArray) {
      let img = pres.getImages().addImage(imgArray);

      let imgWidth = pres.getSlideSize().getSize().getWidth();
      let imgHeigth = pres.getSlideSize().getSize().getHeight();
      let postSize = pres.getSlides().size();
      console.log(preSize, postSize);
      pres
        .getSlides()
        .get_Item(postSize - 1)
        .getShapes()
        .addPictureFrame(
          asposeSlidesViaJava.ShapeType.Rectangle,
          0,
          0,
          imgWidth,
          imgHeigth,
          img
        );

      pres.save("NewPresentation.pptx", asposeSlidesViaJava.SaveFormat.Pptx);
    });

    res.status(200).json({ message: "uploaded" });
  } catch (err) {
    res.status(500).json({ message: "could not uploaded" });
  }
};

module.exports = { upload };
