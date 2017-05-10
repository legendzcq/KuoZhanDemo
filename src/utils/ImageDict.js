


//增加图片后，要再此处配置
export const GetImageDictValue = (name) => {
    var imagedict = new Array();
    imagedict['FormTitleImage'] = require('./../../Image/Group2.png');

    return imagedict[name];
};