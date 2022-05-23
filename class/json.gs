'use strict'

class Json {  // TODO: プロパティを探し当てるやつを作る

  constructor(json) {
    /** @type {string} */
    this.json = json;
  }

  getValueFromProperty(property) {
    const object = this.getAsObject();
    return object[property];
  }

  getValueFromPath(path) {
    const object = this.getAsObject();
    const paths = path.split('.');
    const key = paths[0];
    if (object === null) return null;
    if (paths.length === 1) return object[key];
    return this.getValueFromPath(paths.slice(1).join('.'), object[key]);
  }

  getAsObject() {
    const object = JSON.parse(this.json);
    return object;
  }

  // getAsJson(id) {
  //   const blob = DriveApp.getFileById(id).getBlob();
  //   const json = blob.getDataAsString();
  // }


}