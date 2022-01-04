function myFunction() {

  const sheet = new Sheet();
  // const dicts = sheet.getAsDicts();
  // Toolkit.logDicts(dicts);

  const headers = sheet.getHeaders();
  console.log(sheet.select(['date', 'class 1']));
  console.log(sheet.select(['date', 'class 1'], true));

}
