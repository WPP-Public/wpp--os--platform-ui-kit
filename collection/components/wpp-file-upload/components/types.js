export var sizeFormat;
(function (sizeFormat) {
  sizeFormat["Bytes"] = "Bytes";
  sizeFormat["KB"] = "KB";
  sizeFormat["MB"] = "MB";
  sizeFormat["GB"] = "GB";
})(sizeFormat || (sizeFormat = {}));
export var maxSize;
(function (maxSize) {
  maxSize[maxSize["Bytes"] = 10000] = "Bytes";
  maxSize[maxSize["KB"] = 1000000] = "KB";
  maxSize[maxSize["MB"] = 1000000000] = "MB";
})(maxSize || (maxSize = {}));
