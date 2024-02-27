var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/file/index.ts
var file_exports = {};
__export(file_exports, {
  base642file: () => base642file,
  blob2file: () => blob2file,
  canvas2file: () => canvas2file,
  compressionFile: () => compressionFile,
  downloadAtLinkByHref: () => downloadAtLinkByHref,
  downloadFile: () => downloadFile,
  generateCanvas2D: () => generateCanvas2D,
  getBase64File: () => getBase64File,
  getImgCanvasCtx: () => getImgCanvasCtx,
  getImgFile: () => getImgFile
});
module.exports = __toCommonJS(file_exports);
var import__ = require("../index");
var getBase64File = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (ev) => {
      var _a;
      resolve((_a = ev.target) == null ? void 0 : _a.result);
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });
};
var getImgFile = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = file;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
};
var generateCanvas2D = (width, height) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, width, height);
  canvas.ctx = ctx;
  return canvas;
};
var downloadAtLinkByHref = (href, filename) => {
  const aDom = document.createElement("a");
  aDom.href = href;
  aDom.download = filename;
  document.body.appendChild(aDom);
  aDom.click();
  document.body.removeChild(aDom);
  window.URL.revokeObjectURL(href);
};
var downloadFile = (filename, file, fileType = "image/png") => {
  if (!window || !Blob) {
    throw "此方法不支持当前运行环境";
  }
  try {
    const blob = (0, import__.isBlob)(file) ? file : new File([file], filename, { type: fileType });
    const href = window.URL.createObjectURL(blob);
    downloadAtLinkByHref(href, filename);
  } catch (error) {
    console.log(error, "下载出错");
  }
};
var getSize = (size) => {
  if (size.changeWidth) {
    size.width = size.changeWidth;
  }
  if (size.changeHeight) {
    size.height = size.changeHeight;
  }
  if (size.scale && size.scale < 1 && size.scale > 0) {
    size.width *= size.scale;
    size.height *= size.scale;
  }
  const originWidth = size.width;
  const originHeight = size.height;
  const maxWidth = 1400;
  const maxHeight = 1400;
  if (originWidth > maxWidth || originHeight > maxHeight) {
    if (originWidth / originHeight > maxWidth / maxHeight) {
      size.width = maxWidth;
      size.height = Math.round(maxWidth * (originHeight / originWidth));
    } else {
      size.width = Math.round(maxHeight * (originWidth / originHeight));
      size.height = maxHeight;
    }
  }
  return { width: size.width, height: size.height };
};
var getImgCanvasCtx = async (base64File, options) => {
  const img = await getImgFile(base64File);
  const { width, height } = getSize({
    width: img.width,
    height: img.height,
    scale: 1,
    ...options
  });
  const canvas = generateCanvas2D(width, height);
  canvas.ctx.drawImage(img, 0, 0, img.width, img.height);
  return canvas;
};
var canvas2file = (canvasCtx, type = "image/jpeg", quality = 0.5) => {
  return new Promise((resolve) => {
    canvasCtx.toBlob((blob) => resolve(blob), type, quality);
  });
};
var compressionFile = async (file, type = "image/jpeg", options = { quality: 0.5 }) => {
  const {
    quality,
    width: changeWidth,
    height: changeHeight,
    compressionSize = 300,
    ...other
  } = options;
  if (Math.round(file.size / 1024) <= compressionSize) {
    return file;
  }
  const base64File = await getBase64File(file);
  const canvasCtx = await getImgCanvasCtx(base64File, {
    changeWidth,
    changeHeight,
    ...other
  });
  const blob = await canvas2file(canvasCtx, type, quality);
  if (blob == void 0) {
    return null;
  }
  return new File([blob], file.name, { type });
};
var blob2file = (blob, filename) => {
  if (!(0, import__.isBlob)(blob) || !(0, import__.isString)(blob) || !(0, import__.isArrayBuffer)(blob))
    return null;
  return new File([blob], filename, {
    type: "application/json",
    lastModified: Date.now()
  });
};
var base642file = (base, filename) => {
  const arr = base.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const suffix = mime.split("/")[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  base642file,
  blob2file,
  canvas2file,
  compressionFile,
  downloadAtLinkByHref,
  downloadFile,
  generateCanvas2D,
  getBase64File,
  getImgCanvasCtx,
  getImgFile
});
