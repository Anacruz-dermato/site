# Design implementation notes

## Natural aging section

- Figma source: [Ana Cruz, frame 32:11963](https://www.figma.com/design/bXYi1IR8GeRNnRaxsjNnOw/Ana-Cruz?node-id=32-11963&m=dev)
- The section uses the matching Figma portrait asset at `public/assets/aging-portrait-figma.png`.
- At the 1440 px desktop frame, the image slot is 622 × 682.34 px and the text column is separated by a 36 px gap inside 80 px page margins.
- The image uses `object-fit: cover` and bottom alignment to preserve its proportions while matching the intended crop. It does not stretch to fit the frame.
- On mobile, the section stacks the image above the copy and keeps the same image ratio, with the crop anchored to the bottom.
