/*
 * jQuery File Upload Image Preview & Resize Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, require, window, Blob */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define([
            'jquery',
            'load-image',
            'load-image-meta',
            'load-image-exif',
            'canvas-to-blob',
            './jquery.fileupload-process'
        ], factory);
    } else if (typeof exports === 'object') {
        factory(
            require('jquery'),
            require('blueimp-load-image/js/load-image'),
            require('blueimp-load-image/js/load-image-meta'),
            require('blueimp-load-image/js/load-image-exif'),
            require('blueimp-canvas-to-blob'),
            require('./jquery.fileupload-process')
        );
    } else {
        factory(
            window.jQuery,
            window.loadImage
        );
    }
}(function ($, loadImage) {
    'use strict';

    $.blueimp.fileupload.prototype.options.processQueue.unshift(
        {
            action: 'loadImageMetaData',
            disableImageHead: '@',
            disableExif: '@',
            disableExifThumbnail: '@',
            disableExifSub: '@',
            disableExifGps: '@',
            disabled: '@disableImageMetaDataLoad'
        },
        {
            action: 'loadImage',
            prefix: true,
            fileTypes: '@',
            maxFileSize: '@',
            noRevoke: '@',
            disabled: '@disableImageLoad'
        },
        {
            action: 'resizeImage',
            prefix: 'image',
            maxWidth: '@',
            maxHeight: '@',
            minWidth: '@',
            minHeight: '@',
            crop: '@',
            orientation: '@',
            forceResize: '@',
            disabled: '@disableImageResize'
        },
        {
            action: 'saveImage',
            quality: '@imageQuality',
            type: '@imageType',
            disabled: '@disableImageResize'
        },
        {
            action: 'saveImageMetaData',
            disabled: '@disableImageMetaDataSave'
        },
        {
            action: 'resizeImage',
            prefix: 'preview',
            maxWidth: '@',
            maxHeight: '@',
            minWidth: '@',
            minHeight: '@',
            crop: '@',
            orientation: '@',
            thumbnail: '@',
            canvas: '@',
            disabled: '@disableImagePreview'
        },
        {
            action: 'setImage',
            name: '@imagePreviewName',
            disabled: '@disableImagePreview'
        },
        {
            action: 'deleteImageReferences',
            disabled: '@disableImageReferencesDeletion'
        }
    );

    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            loadImageFileTypes: /^image\/(gif|jpeg|png|svg\+xml)$/,
            loadImageMaxFileSize: 10000000, /* 10MB*/
            imageMaxWidth: 1920,
            imageMaxHeight: 1080,
            imageOrientation: false,
            imageCrop: false,
            disableImageResize: true,
            previewMaxWidth: 80,
            previewMaxHeight: 80,
            previewOrientation: true,
            previewThumbnail: true,
            previewCrop: false,
            previewCanvas: true
        },

        processActions: {

            loadImage: function (data, options) {
                if (options.disabled) {
                    return data;
                }
                var that = this,
                    file = data.files[data.index],
                    dfd = $.Deferred();
                if (($.type(options.maxFileSize) === 'number' &&
                            file.size > options.maxFileSize) ||
                        (options.fileTypes &&
                            !options.fileTypes.test(file.type)) ||
                        !loadImage(
                            file,
                            function (img) {
                                if (img.src) {
                                    data.img = img;
                                }
                                dfd.resolveWith(that, [data]);
                            },
                            options
                        )) {
                    return data;
                }
                return dfd.promise();
            },

            resizeImage: function (data, options) {
                if (options.disabled || !(data.canvas || data.img)) {
                    return data;
                }
                options = $.extend({canvas: true}, options);
                var that = this,
                    dfd = $.Deferred(),
                    img = (options.canvas && data.canvas) || data.img,
                    resolve = function (newImg) {
                        if (newImg && (newImg.width !== img.width ||
                                newImg.height !== img.height ||
                                options.forceResize)) {
                            data[newImg.getContext ? 'canvas' : 'img'] = newImg;
                        }
                        data.preview = newImg;
                        dfd.resolveWith(that, [data]);
                    },
                    thumbnail;
                if (data.exif) {
                    if (options.orientation === true) {
                        options.orientation = data.exif.get('Orientation');
                    }
                    if (options.thumbnail) {
                        thumbnail = data.exif.get('Thumbnail');
                        if (thumbnail) {
                            loadImage(thumbnail, resolve, options);
                            return dfd.promise();
                        }
                    }
                    if (data.orientation) {
                        delete options.orientation;
                    } else {
                        data.orientation = options.orientation;
                    }
                }
                if (img) {
                    resolve(loadImage.scale(img, options));
                    return dfd.promise();
                }
                return data;
            },

            saveImage: function (data, options) {
                if (!data.canvas || options.disabled) {
                    return data;
                }
                var that = this,
                    file = data.files[data.index],
                    dfd = $.Deferred();
                if (data.canvas.toBlob) {
                    data.canvas.toBlob(
                        function (blob) {
                            if (!blob.name) {
                                if (file.type === blob.type) {
                                    blob.name = file.name;
                                } else if (file.name) {
                                    blob.name = file.name.replace(
                                        /\.\w+$/,
                                        '.' + blob.type.substr(6)
                                    );
                                }
                            }
                            if (file.type !== blob.type) {
                                delete data.imageHead;
                            }
                            data.files[data.index] = blob;
                            dfd.resolveWith(that, [data]);
                        },
                        options.type || file.type,
                        options.quality
                    );
                } else {
                    return data;
                }
                return dfd.promise();
            },

            loadImageMetaData: function (data, options) {
                if (options.disabled) {
                    return data;
                }
                var that = this,
                    dfd = $.Deferred();
                loadImage.parseMetaData(data.files[data.index], function (result) {
                    $.extend(data, result);
                    dfd.resolveWith(that, [data]);
                }, options);
                return dfd.promise();
            },

            saveImageMetaData: function (data, options) {
                if (!(data.imageHead && data.canvas &&
                        data.canvas.toBlob && !options.disabled)) {
                    return data;
                }
                var file = data.files[data.index],
                    blob = new Blob([
                        data.imageHead,
                        this._blobSlice.call(file, 20)
                    ], {type: file.type});
                blob.name = file.name;
                data.files[data.index] = blob;
                return data;
            },

            setImage: function (data, options) {
                if (data.preview && !options.disabled) {
                    data.files[data.index][options.name || 'preview'] = data.preview;
                }
                return data;
            },

            deleteImageReferences: function (data, options) {
                if (!options.disabled) {
                    delete data.img;
                    delete data.canvas;
                    delete data.preview;
                    delete data.imageHead;
                }
                return data;
            }

        }

    });

}));
