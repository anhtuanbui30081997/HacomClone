"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtension = exports.getNameFromFullname = exports.handleUploadImage = exports.initFolder = void 0;
const fs_1 = __importDefault(require("fs"));
const direction_1 = require("../constants/direction");
const formidable_1 = require("formidable");
const initFolder = () => {
    ;
    [direction_1.UPLOAD_IMAGE_TEMP_DIR].forEach((dir) => {
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, {
                recursive: true // Create folder nested
            });
        }
    });
};
exports.initFolder = initFolder;
const handleUploadImage = async (req) => {
    const form = new formidable_1.IncomingForm({
        multiples: true,
        uploadDir: direction_1.UPLOAD_IMAGE_TEMP_DIR,
        maxFiles: 16,
        keepExtensions: true,
        maxFileSize: 8000 * 1024, //300KB
        maxTotalFileSize: 8000 * 1024 * 16,
        filter: function ({ name, originalFilename, mimetype }) {
            const valid = name === 'image' && Boolean(mimetype?.includes('image/'));
            if (!valid) {
                form.emit('error', new Error('File type is not valid'));
            }
            return valid;
        }
    });
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                return reject(err);
            }
            // eslint-disable-next-line no-extra-boolean-cast
            if (!Boolean(files.image)) {
                return reject(new Error('File is empty'));
            }
            resolve(files.image);
        });
    });
};
exports.handleUploadImage = handleUploadImage;
const getNameFromFullname = (fullname) => {
    const namearr = fullname.split('.');
    namearr.pop();
    return namearr.join('.');
};
exports.getNameFromFullname = getNameFromFullname;
const getExtension = (fullname) => {
    const namearr = fullname.split('.');
    return namearr[namearr.length - 1];
};
exports.getExtension = getExtension;
