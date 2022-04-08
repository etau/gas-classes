/**
 * マイドライブに学習用サンプルデータをコピー
 */
function copyAllData() {
  // フォルダ名作成
  const strDate = Utilities.formatDate(new Date(), 'JST', 'yyyyMMdd');
  const name = `コピーフォルダ${strDate}`;
  const folder = DriveApp.getFolderById('フォルダID');
  const copyTo = DriveApp.createFolder(name);
  folderCopy_(folder, copyTo);
}

/**
 * フォルダ内のファイルを全コピー
 * @param {DriveApp.Folder} folder - コピー元のFolderオブジェクト 
 * @param {DriveApp.Folder} destination - コピー先のFolderオブジェクト
 */
function folderCopy_(folder, destination) {
  const folders = folder.getFolders();
  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    const newFile = file.makeCopy(destination);
    newFile.setName(file.getName());
    newFile.moveTo(destination);
  }
  while (folders.hasNext()) {
    const subFolder = folders.next();
    const folderName = subFolder.getName();
    const copyFolder = destination.createFolder(folderName);
    folderCopy_(subFolder, copyFolder);
  }
}