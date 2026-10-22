# Design implementation notes

## Natural aging section

- Figma source: [Ana Cruz, frame 32:11963](https://www.figma.com/design/bXYi1IR8GeRNnRaxsjNnOw/Ana-Cruz?node-id=32-11963&m=dev)
- The section uses the matching Figma portrait asset at `public/assets/aging-portrait-figma.png` (853 × 1346 px).
- At the 1440 px desktop frame, the image slot is 622 × 682.34 px and the text column is separated by a 36 px gap inside 80 px page margins.
- The image uses `object-fit: cover` and top alignment to match the image crop in Figma. It does not stretch to fit the frame.
- On mobile, the section stacks the image above the copy and keeps the same image ratio and top-aligned crop.
